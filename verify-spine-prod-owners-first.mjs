/* soft-spine-prod-owners-first-20260920 — verify Production-first spine GM buckets */
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(__dirname, 'AMP-Mess-Soft.html');
const EXPECT_CHIP = 'soft-spine-prod-owners-first-20260920';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto('file://' + file, { waitUntil: 'domcontentloaded', timeout: 180000 });
await page.waitForFunction(() => typeof window.__softCHIP === 'function', { timeout: 120000 });
await page.evaluate(() => {
  Object.keys(localStorage).forEach((k) => {
    if (/amp_soft|soft_mess|mess_book|ampExec/i.test(k)) localStorage.removeItem(k);
  });
});
await page.reload({ waitUntil: 'domcontentloaded', timeout: 180000 });
await page.waitForFunction(
  () => typeof window.__softSpineBucketLines === 'function' && typeof window.__softCHIP === 'function',
  { timeout: 120000 }
);

const out = await page.evaluate(() => {
  const chip = window.__softCHIP();
  const get = window.__softGetSpineInvoice;
  const list = window.__softListSpineInvoices();
  const buckets = window.__softSpineBucketLines;
  const findRow = window.__softFindRowForSpineInvoice;
  const state = window.__softGetState();

  function sumOwners(o) {
    if (!o) return null;
    if (o.mode === 'Whole') return { mode: 'Whole', primary: o.primary };
    const x = { mode: o.mode || 'Split' };
    if (o.bdA) x.bdA = { name: o.bdA.name, pct: o.bdA.pct };
    if (o.recruiter) x.recruiter = { name: o.recruiter.name, pct: o.recruiter.pct };
    if (o.housePct != null) x.housePct = o.housePct;
    return x;
  }
  function lineSum(lines) {
    return (lines || []).map((l) => ({ owner: l.owner, pct: l.pct, amount: l.amount }));
  }
  function pick(idHint) {
    let inv = get(idHint);
    if (!inv) {
      inv = list.find((i) => {
        if (!i) return false;
        const blob = [i.id, i.sampleId, i.qbNumber, i.searchRefs].join(' ');
        if (idHint === '17082') return String(i.qbNumber) === '17082' || String(i.id).includes('17082');
        if (idHint === 'EM8446') return /EM-?8446/i.test(blob);
        return i.id === idHint || i.sampleId === idHint || String(i.qbNumber) === idHint;
      }) || null;
    }
    if (!inv) return { missing: true, idHint };
    const row = findRow(inv);
    const lines = buckets(inv);
    return {
      id: inv.id,
      sampleId: inv.sampleId,
      qb: inv.qbNumber,
      linkRowId: inv.linkRowId,
      invOwners: sumOwners(inv.owners),
      prodRowId: row && row.id,
      prodOwners: sumOwners(row && row.owners),
      prodRep: row && row.rep,
      softGmSplitOverride: !!(row && row.softGmSplitOverride),
      softBib: row && row.softBib17082Lock,
      softOrs: row && row.softOrs8432NateLock,
      softRepeat: row && row.softRepeatGm601030,
      lines: lineSum(lines),
    };
  }

  // Marketing housePct sanity: pick a Marketing spine if any
  const mkt = list.find((i) => i && /marketing/i.test(String(i.agreement || '')));
  let mktCheck = null;
  if (mkt) {
    const lines = buckets(mkt);
    mktCheck = { id: mkt.id, invOwners: sumOwners(mkt.owners), lines: lineSum(lines) };
  }

  return {
    chip,
    catchup: state.softSpineOwnersFromProduction,
    cases: {
      ors8432: pick('17040'),
      hendrick17071: pick('17071'),
      bib17082: pick('17082'),
      em8446: pick('EM8446'),
    },
    mktCheck,
  };
});

fs.writeFileSync(
  path.resolve(__dirname, '_report_soft-spine-prod-owners-first-20260920.json'),
  JSON.stringify({ expectChip: EXPECT_CHIP, out, pageErrors: errors.slice(0, 20) }, null, 2)
);
console.log(JSON.stringify({ expectChip: EXPECT_CHIP, out, pageErrors: errors }, null, 2));

const c = out.cases;
const orsOk = c.ors8432.lines && c.ors8432.lines.length === 1 && c.ors8432.lines[0].owner === 'Nate' && c.ors8432.lines[0].pct === 100;
const bibMap = Object.fromEntries((c.bib17082.lines || []).map((l) => [l.owner, l.pct]));
const bibOk = bibMap.Brenton === 60 && bibMap.Nate === 30 && bibMap.House === 10;
console.log('\nASSERT CHIP', out.chip === EXPECT_CHIP, out.chip);
console.log('ASSERT ORS', orsOk, c.ors8432.lines);
console.log('ASSERT BIB', bibOk, bibMap);
console.log('HENDRICK', c.hendrick17071);
console.log('EM8446', c.em8446);

await browser.close();
if (out.chip !== EXPECT_CHIP || !orsOk || !bibOk) process.exit(1);
