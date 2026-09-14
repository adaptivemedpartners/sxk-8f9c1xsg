/**
 * AmpStorage — in-memory cache over DBManager so the four AMP HTML apps
 * can keep sync getItem-style reads. Device jump-pill keys stay in localStorage.
 */
import { DBManager } from './DBManager.js';

const DEVICE_KEYS = new Set([
  'amp_packet_url',
  'amp_packet_picked_name',
  'amp_tracker_url',
  'amp_tracker_picked_name',
  'amp_mi_url',
  'amp_mi_picked_name',
  'amp_teamhub_url',
  'amp_teamhub_picked_name'
]);

const USER_KEYS = new Set([
  'ampTrackerLook',
  'ampTrackerFinish',
  'ampHubColor',
  'ampPacketLook',
  'ampPacketFinish',
  'amp_packet_color',
  'ampMITheme',
  'amp_mi_narr_aud',
  'amp_mi_narr_len',
  'amp_mi_narr_on',
  'amp_mi_report_type',
  'amp_mi_camp_pkg',
  'amp_mi_report_from',
  'ampProdShowEmpty_v1',
  'ampTeamHubIdentity'
]);

const TEAM_KEYS = new Set([
  'ampTeamHubLocal',
  'ampTeamHubWeekendAnim',
  'ampBoardColsHoriz_v1',
  'ampWeeklyEdits_v1',
  'ampProdEdits_v1',
  'ampProdReveal_v1',
  'ampExecEdits_v1',
  'ampExecMktFeed',
  'ampRollsLock_v1',
  'ampOnboardCols_v1',
  'ampAcNotes_v1',
  'amp_loi_v1',
  'amp_cred_v1',
  'amp_itinerary_v3',
  'amp_clientfile_v2',
  'amp_bg_v1',
  'amp_packet_stories_v1',
  'amp_packet_markets_v1',
  'ampAmplApproval',
  'ampTrackerMktRequest',
  'ampTrackerPostcardRequest',
  'ampTrackerBulletinRequest',
  'ampPlacementBound_v1',
  'stateCallTracker_multi_v2',
  'amp_mi_clients_v1'
]);

const USER_HINT = /Look|Finish|Theme|Color|ShowEmpty|narr_|report_|camp_pkg|Identity/i;
const TEAM_HINT = /Edits|Store|board|Board|exec|Exec|Prod|tracker|Tracker|loi|itinerary|clientfile|community|markets|mkt|Mkt|placement|Placement|Approval|Feed|clients|Onboard|Rolls|AcNotes|Weekend|stories|cred|_bg_v/i;

/**
 * Route an AMP localStorage key to user, team, or device (never DB).
 * Device also covers opts.nameKey / opts.urlKey jump-pill paths.
 * @param {string} key
 * @returns {'user' | 'team' | 'device'}
 */

/** SOFT PARALLEL: DB/cache key namespace via window.AMP_SOFT_STORAGE_PREFIX.
 *  localStorage is namespaced by the soft HTML Storage.prototype patch (do NOT
 *  also prefix here or keys double-prefix). Soft never collides with live.
 *  TODO(persist): accounting-grade persistence later — soft is stress-only.
 */
function softPrefix() {
  try {
    if (typeof window !== 'undefined' && window.AMP_SOFT_STORAGE_PREFIX) {
      return String(window.AMP_SOFT_STORAGE_PREFIX);
    }
  } catch (_) {}
  return '';
}
function withSoftPrefix(key) {
  if (typeof key !== 'string' || !key) return key;
  var p = softPrefix();
  if (!p) return key;
  if (key.indexOf(p) === 0) return key;
  return p + key;
}
function logicalKey(key) {
  if (typeof key !== 'string' || !key) return key;
  var p = softPrefix();
  if (p && key.indexOf(p) === 0) return key.slice(p.length);
  return key;
}

export function classifyKey(key) {
  key = logicalKey(key);
  if (typeof key !== 'string' || !key) return 'user';
  if (DEVICE_KEYS.has(key)) return 'device';
  if (/^amp_.+_(url|picked_name)$/.test(key)) return 'device';
  if (USER_KEYS.has(key)) return 'user';
  if (TEAM_KEYS.has(key)) return 'team';
  if (USER_HINT.test(key) && !TEAM_HINT.test(key)) return 'user';
  if (TEAM_HINT.test(key)) return 'team';
  return 'user';
}

function cacheSlot(scope, key) {
  return scope + '\0' + key;
}

function readLocal(key) {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(key);
  } catch (_) {
    return null;
  }
}

function writeLocal(key, value) {
  if (typeof localStorage === 'undefined') {
    throw new Error('AMP storage: localStorage is not available for device key "' + key + '".');
  }
  if (value == null) {
    localStorage.removeItem(key);
    return;
  }
  localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
}

function resolveScope(key, opts) {
  const classified = classifyKey(key);
  if (classified === 'device') return 'device';
  if (opts && opts.scope) return opts.scope;
  return classified;
}

const AmpStorage = {
  db: null,
  cache: new Map(),
  hydrated: false,
  classifyKey: classifyKey,

  bind: function (db) {
    this.db = db || null;
    return this;
  },

  /**
   * Load user keys + team keys into memory. Device jump-pill keys come from localStorage.
   * Call after auth. Creates a DBManager from config when one is not bound.
   */
  hydrate: async function (dbManager) {
    if (dbManager) this.db = dbManager;
    if (!this.db) {
      const created = await DBManager.createFromConfig();
      if (!created) {
        throw new Error(
          'AMP storage: Supabase is not configured. Paste the project URL and anon key into amp-supabase-config.js.'
        );
      }
      this.db = created;
    }

    const next = new Map();

    // SOFT NOTE: hydrate still lists live scopes; soft writes use prefixed keys. TODO(persist).
    const [userMap, teamMap] = await Promise.all([
      this.db.list({ scope: 'user' }),
      this.db.list({ scope: 'team' })
    ]);

    Object.keys(userMap || {}).forEach(function (key) {
      next.set(cacheSlot('user', key), userMap[key]);
    });
    Object.keys(teamMap || {}).forEach(function (key) {
      next.set(cacheSlot('team', key), teamMap[key]);
    });

    DEVICE_KEYS.forEach(function (key) {
      next.set(cacheSlot('device', key), readLocal(key));
    });

    this.cache = next;
    this.hydrated = true;
    return this;
  },

  /**
   * Sync read from the hydrated cache. null if missing.
   */
  get: function (key) {
    if (typeof key !== 'string' || !key) return null;
    const logical = logicalKey(key);
    const stored = withSoftPrefix(logical);
    const scope = classifyKey(logical);
    // Device: logical key — soft HTML Storage patch adds prefix once.
    // User/team: soft-prefixed key so soft never collides with live DB rows.
    const slotKey = scope === 'device' ? logical : stored;
    const slot = cacheSlot(scope, slotKey);
    if (this.cache.has(slot)) {
      const cached = this.cache.get(slot);
      return cached === undefined ? null : cached;
    }
    if (scope === 'device') {
      const local = readLocal(logical);
      this.cache.set(slot, local);
      return local;
    }
    return null;
  },

  /**
   * Update cache immediately and write-through to DB (or localStorage for device keys).
   * Device keys never go to the database, even if a scope override is passed.
   */
  set: async function (key, value, opts) {
    if (typeof key !== 'string' || !key) {
      throw new Error('AMP storage: storage key is required.');
    }
    const logical = logicalKey(key);
    const stored = withSoftPrefix(logical);
    const scope = resolveScope(logical, opts);
    const slotKey = scope === 'device' ? logical : stored;
    const slot = cacheSlot(scope, slotKey);
    const previous = this.cache.has(slot) ? this.cache.get(slot) : undefined;
    const had = this.cache.has(slot);
    this.cache.set(slot, value);

    try {
      if (scope === 'device') {
        writeLocal(logical, value); // Storage patch namespaces once
        return;
      }
      if (!this.db) {
        throw new Error(
          'AMP storage: Supabase client is not initialized. Call AmpStorage.hydrate() after sign-in.'
        );
      }
      await this.db.set(stored, value, { scope: scope });
    } catch (err) {
      if (had) this.cache.set(slot, previous);
      else this.cache.delete(slot);
      throw err;
    }
  },

  remove: async function (key, opts) {
    if (typeof key !== 'string' || !key) {
      throw new Error('AMP storage: storage key is required.');
    }
    const logical = logicalKey(key);
    const stored = withSoftPrefix(logical);
    const scope = resolveScope(logical, opts);
    const slotKey = scope === 'device' ? logical : stored;
    const slot = cacheSlot(scope, slotKey);
    const previous = this.cache.has(slot) ? this.cache.get(slot) : undefined;
    const had = this.cache.has(slot);
    this.cache.delete(slot);

    try {
      if (scope === 'device') {
        writeLocal(logical, null);
        return;
      }
      if (!this.db) {
        throw new Error(
          'AMP storage: Supabase client is not initialized. Call AmpStorage.hydrate() after sign-in.'
        );
      }
      await this.db.remove(stored, { scope: scope });
    } catch (err) {
      if (had) this.cache.set(slot, previous);
      throw err;
    }
  },

  /**
   * Keys currently in the cache, optionally filtered by prefix.
   */
  getAllKeys: function (prefix) {
    const out = [];
    const seen = new Set();
    this.cache.forEach(function (_, slot) {
      const sep = slot.indexOf('\0');
      const key = sep >= 0 ? slot.slice(sep + 1) : slot;
      if (seen.has(key)) return;
      if (prefix && !key.startsWith(prefix)) return;
      seen.add(key);
      out.push(key);
    });
    return out;
  }
};

const root = typeof globalThis !== 'undefined' ? globalThis : null;
if (root) {
  root.AmpStorage = AmpStorage;
  root.classifyKey = classifyKey;
}

export { AmpStorage, DEVICE_KEYS, USER_KEYS, TEAM_KEYS };
export default AmpStorage;
