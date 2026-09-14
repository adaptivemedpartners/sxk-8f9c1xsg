/**
 * DBManager — production Supabase wrapper for Adaptive Medical Partners.
 * ES module; also assigned to window.DBManager for script-tag / type=module use.
 *
 * Never accepts or sends a service-role key.
 */
const TABLE = 'app_storage';
const SCOPES = new Set(['user', 'team']);

function configLooksPlaceholder(value) {
  if (value == null) return true;
  const text = String(value).trim();
  if (!text) return true;
  return text.startsWith('__AMP_') && text.endsWith('__');
}

function readBrowserConfig() {
  const root = typeof globalThis !== 'undefined' ? globalThis : null;
  if (!root) return null;
  const bag = root.AMP_SUPABASE && typeof root.AMP_SUPABASE === 'object'
    ? root.AMP_SUPABASE
    : {};
  const url = root.AMP_SUPABASE_URL || bag.url || bag.URL || '';
  const anonKey = root.AMP_SUPABASE_ANON_KEY || bag.anonKey || bag.anon_key || '';
  if (configLooksPlaceholder(url) || configLooksPlaceholder(anonKey)) return null;
  return { url: String(url).trim(), anonKey: String(anonKey).trim() };
}

function normalizeScope(opts) {
  const scope = opts && opts.scope ? opts.scope : 'user';
  if (!SCOPES.has(scope)) {
    throw new Error('AMP storage: invalid scope "' + scope + '". Use "user" or "team".');
  }
  return scope;
}

function requireKey(key) {
  if (typeof key !== 'string' || !key) {
    throw new Error('AMP storage: storage key is required.');
  }
  return key;
}

function encodeValue(value) {
  if (value === undefined) return null;
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  const first = trimmed[0];
  if (
    first !== '{' &&
    first !== '[' &&
    first !== '"' &&
    trimmed !== 'true' &&
    trimmed !== 'false' &&
    trimmed !== 'null' &&
    !/^-?\d/.test(trimmed)
  ) {
    return value;
  }
  try {
    return JSON.parse(trimmed);
  } catch (_) {
    return value;
  }
}

function decodeValue(value) {
  if (value == null) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return value;
    const first = trimmed[0];
    if (first === '{' || first === '[') {
      try {
        return JSON.parse(trimmed);
      } catch (_) {
        return value;
      }
    }
    return value;
  }
  return value;
}

function wrapError(action, error) {
  const message = error && error.message ? error.message : String(error || 'unknown error');
  return new Error('AMP storage: ' + action + ' failed. ' + message);
}


async function loadCreateClient() {
  const root = typeof globalThis !== 'undefined' ? globalThis : {};
  if (root.supabase && typeof root.supabase.createClient === 'function') {
    return root.supabase.createClient.bind(root.supabase);
  }
  const spec = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
  const mod = await import(spec);
  if (!mod || typeof mod.createClient !== 'function') {
    throw new Error('AMP storage: official supabase-js createClient is unavailable.');
  }
  return mod.createClient;
}


class DBManager {
  constructor(client) {
    this.client = client || null;
  }

  _assertClient() {
    if (!this.client) {
      throw new Error(
        'AMP storage: Supabase client is not initialized. Paste the project URL and anon key into amp-supabase-config.js.'
      );
    }
    return this.client;
  }

  async getSession() {
    const client = this._assertClient();
    const { data, error } = await client.auth.getSession();
    if (error) throw wrapError('getSession', error);
    return data && data.session ? data.session : null;
  }

  async requireUser() {
    const session = await this.getSession();
    const user = session && session.user;
    if (!user || !user.id) {
      throw new Error('Not signed in');
    }
    return user;
  }

  async get(key, opts) {
    const storageKey = requireKey(key);
    const scope = normalizeScope(opts);
    const client = this._assertClient();
    const user = await this.requireUser();

    let query = client
      .from(TABLE)
      .select('storage_value')
      .eq('storage_key', storageKey)
      .eq('scope', scope);

    if (scope === 'user') {
      query = query.eq('user_id', user.id);
    }

    const { data, error } = await query.maybeSingle();
    if (error) throw wrapError('get', error);
    if (!data) return null;
    return decodeValue(data.storage_value);
  }

  async set(key, value, opts) {
    const storageKey = requireKey(key);
    const scope = normalizeScope(opts);
    const client = this._assertClient();
    const user = await this.requireUser();

    const row = {
      user_id: user.id,
      storage_key: storageKey,
      storage_value: encodeValue(value),
      scope: scope,
      updated_at: new Date().toISOString()
    };

    const onConflict = scope === 'team' ? 'storage_key' : 'user_id,storage_key';
    const { error } = await client.from(TABLE).upsert(row, { onConflict: onConflict });
    if (error) {
      await this._mergeRow(client, row, scope, user.id, error);
    }
  }

  async _mergeRow(client, row, scope, userId, firstError) {
    let lookup = client.from(TABLE).select('id').eq('storage_key', row.storage_key).eq('scope', scope);
    if (scope === 'user') lookup = lookup.eq('user_id', userId);
    const found = await lookup.maybeSingle();
    if (found.error) throw wrapError('set', firstError);
    if (found.data && found.data.id) {
      const patched = await client.from(TABLE).update({
        storage_value: row.storage_value,
        user_id: row.user_id,
        updated_at: row.updated_at
      }).eq('id', found.data.id);
      if (patched.error) throw wrapError('set', patched.error);
      return;
    }
    const inserted = await client.from(TABLE).insert(row);
    if (inserted.error) throw wrapError('set', firstError);
  }

  async remove(key, opts) {
    const storageKey = requireKey(key);
    const scope = normalizeScope(opts);
    const client = this._assertClient();
    const user = await this.requireUser();

    let query = client
      .from(TABLE)
      .delete()
      .eq('storage_key', storageKey)
      .eq('scope', scope);

    if (scope === 'user') {
      query = query.eq('user_id', user.id);
    }

    const { error } = await query;
    if (error) throw wrapError('remove', error);
  }

  async list(opts) {
    const scope = normalizeScope(opts);
    const client = this._assertClient();
    const user = await this.requireUser();

    let query = client.from(TABLE).select('storage_key, storage_value').eq('scope', scope);
    if (scope === 'user') {
      query = query.eq('user_id', user.id);
    }

    const { data, error } = await query;
    if (error) throw wrapError('list', error);
    const out = {};
    (data || []).forEach(function (row) {
      if (row && row.storage_key) out[row.storage_key] = decodeValue(row.storage_value);
    });
    return out;
  }

  async getAllKeys(opts) {
    const scope = normalizeScope(opts);
    const prefix = opts && typeof opts.prefix === 'string' ? opts.prefix : '';
    const client = this._assertClient();
    const user = await this.requireUser();

    let query = client.from(TABLE).select('storage_key').eq('scope', scope);
    if (scope === 'user') {
      query = query.eq('user_id', user.id);
    }
    if (prefix) {
      const escaped = prefix.replace(/[%_]/g, '\\$&');
      query = query.like('storage_key', escaped + '%');
    }

    const { data, error } = await query;
    if (error) throw wrapError('getAllKeys', error);
    const keys = (data || []).map(function (row) { return row.storage_key; }).filter(Boolean);
    if (!prefix) return keys;
    return keys.filter(function (k) { return k.startsWith(prefix); });
  }

  static async createFromConfig() {
    const cfg = readBrowserConfig();
    if (!cfg) return null;

    let createClient;
    try {
      createClient = await loadCreateClient();
    } catch (err) {
      throw wrapError('createFromConfig', err);
    }

    const client = createClient(cfg.url, cfg.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    return new DBManager(client);
  }
}

const root = typeof globalThis !== 'undefined' ? globalThis : null;
if (root) {
  root.DBManager = DBManager;
}

export { DBManager, readBrowserConfig, configLooksPlaceholder };
export default DBManager;
