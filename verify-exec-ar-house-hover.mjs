/* soft-exec-ar-house-hover-20260920 — Playwright: five billed + Total; hover contrast */
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(__dirname, 'AMP-Mess-Soft.html');
const EXPECT_CHIP = 'soft-exec-ar-house-hover-20260920';
const outDir = path.resolve(__dirname, 'pw-out');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto('file://' + file, { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForFunction(() => typeof window.__softGetState === 'function', { timeout: 90000 });
await page.evaluate(() => {
  Object.keys(localStorage).forEach((k) => {
    if (/amp_soft|soft_mess|mess_book|ampExec/i.test(k)) localStorage.removeItem(k);
  });
});
await page.reload({ waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForFunction(
  () => typeof window.__softGetState === 'function' && typeof window.__softCHIP === 'function',
  { timeout: 90000 }
);

await page.evaluate(() => {
  if (typeof window.__softFlowGoToView === 'function') window.__softFlowGoToView('execgm');
  else if (typeof window.goToView === 'function') window.goToView('execgm');
});
await page.waitForTimeout(500);

const arBtn = await page.$('[data-exec="ar"]');
if (arBtn) {
  await arBtn.click();
  await page.waitForTimeout(600);
} else {
  await page.evaluate(() => {
    const b = document.querySelector('[data-exec="ar"]');
    if (b) b.click();
    if (typeof window.renderExecAr === 'function') window.renderExecAr();
  });
  await page.waitForTimeout(600);
}

// Ensure Q3 visible (Marketing July)
await page.evaluate(() => {
  const b = document.querySelector('#exec-ar-quarter-seg button[data-ar-q="3"]');
  if (b) b.click();
});
await page.waitForTimeout(400);

const probe = await page.evaluate((EXPECT_CHIP) => {
  const chip = window.__softCHIP();
  const ver = (document.getElementById('soft-ver-chip') || {}).textContent || null;
  const tbody = document.getElementById('exec-ar-tbody');
  const rows = tbody ? Array.from(tbody.querySelectorAll('tr')).map((tr) => (tr.cells[0] && tr.cells[0].textContent || '').trim()) : [];
  const billedExpected = [
    'Business Development',
    'Recruiting',
    'Marketing',
    'Recurring',
    'House',
    'Total Billed Revenue'
  ];
  const firstSix = rows.slice(0, 6);
  const okRows = billedExpected.every((lab, i) => firstSix[i] && firstSix[i].indexOf(lab) === 0);

  // Find Marketing July cell (Q3: Jul=col1, Aug=col2, Sep=col3 → July is index 1)
  let mktJuly = null;
  Array.from(tbody ? tbody.querySelectorAll('tr') : []).forEach((tr) => {
    const lab = (tr.cells[0] && tr.cells[0].textContent || '').trim();
    if (lab === 'Marketing' && tr.cells[1]) mktJuly = tr.cells[1];
  });
  let houseJuly = null;
  Array.from(tbody ? tbody.querySelectorAll('tr') : []).forEach((tr) => {
    const lab = (tr.cells[0] && tr.cells[0].textContent || '').trim();
    if (lab === 'House' && tr.cells[1]) houseJuly = tr.cells[1];
  });

  function contrastInfo(el) {
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      text: (el.textContent || '').trim()
    };
  }

  // House live sum sanity via helpers if exposed, else via DOM
  let houseSumQ3 = null;
  if (typeof window.execArSum === 'function') {
    houseSumQ3 = ['2026-07', '2026-08', '2026-09'].map((m) => window.execArSum('house', m));
  }

  return {
    chip,
    ver,
    chipOk: chip === EXPECT_CHIP,
    rows: firstSix,
    okRows,
    mktJuly: contrastInfo(mktJuly),
    houseJuly: contrastInfo(houseJuly),
    houseCellHtml: houseJuly ? houseJuly.outerHTML.slice(0, 200) : null,
    arHintHasHouse: !!(document.querySelector('.exec-ar-hint') && /House/.test(document.querySelector('.exec-ar-hint').textContent || '')),
    houseSumQ3
  };
}, EXPECT_CHIP);

// Hover Marketing July and read contrast in light + dark
async function hoverContrast(look) {
  await page.evaluate((look) => {
    document.documentElement.setAttribute('data-look', look);
  }, look);
  await page.waitForTimeout(150);
  const cell = await page.locator('#exec-ar-tbody tr').filter({ hasText: /^Marketing$/ }).locator('td.ar-click').first();
  await cell.hover();
  await page.waitForTimeout(120);
  const styles = await cell.evaluate((el) => {
    const cs = getComputedStyle(el);
    function parseRgb(s) {
      const m = String(s).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
    }
    function lum([r, g, b]) {
      const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }
    const fg = parseRgb(cs.color);
    const bg = parseRgb(cs.backgroundColor);
    let ratio = null;
    if (fg && bg) {
      const L1 = lum(fg);
      const L2 = lum(bg);
      const hi = Math.max(L1, L2);
      const lo = Math.min(L1, L2);
      ratio = (hi + 0.05) / (lo + 0.05);
    }
    return {
      look,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      ratio,
      text: (el.textContent || '').trim()
    };
  });
  return styles;
}

const lightHover = await hoverContrast('light');
const darkHover = await hoverContrast('dark');

await page.screenshot({ path: path.join(outDir, 'soft-exec-ar-house-hover-20260920-q3.png'), fullPage: false });

const report = {
  chip: EXPECT_CHIP,
  probe,
  lightHover,
  darkHover,
  pageErrors: errors.slice(0, 8),
  pass: !!(
    probe.chipOk &&
    probe.okRows &&
    probe.arHintHasHouse &&
    lightHover.ratio != null && lightHover.ratio >= 3 &&
    darkHover.ratio != null && darkHover.ratio >= 3
  )
};

fs.writeFileSync(path.join(outDir, 'soft-exec-ar-house-hover-20260920.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
process.exit(report.pass ? 0 : 1);
