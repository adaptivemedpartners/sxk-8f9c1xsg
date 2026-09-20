#!/usr/bin/env python3
"""soft-aging-payout-execpdf-20260920 — Playwright verify Production aging + payout gate + Exec invoice PDFs"""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
FILE = HERE / "AMP-Mess-Soft.html"
EXPECT = "soft-aging-payout-execpdf-20260920"
REPORT = HERE / "_report_soft-aging-payout-execpdf-20260920.json"

JS = r"""(EXPECT) => {
  const api = window.__softAgingPayoutExecPdf || {};
  const chip = (typeof window.__softCHIP === 'function') ? window.__softCHIP() : null;
  const ver = (document.getElementById('soft-ver-chip') || {}).textContent || '';
  function go(view) {
    const b = document.querySelector('[data-view="'+view+'"]');
    if (b) { b.click(); return true; }
    if (typeof window.__softFlowGoToView === 'function') { window.__softFlowGoToView(view); return true; }
    return false;
  }
  const out = { chip, ver, expect: EXPECT, chipOk: chip === EXPECT && ver.includes(EXPECT) };
  out.wentProd = go('production');
  try { api.paintProdAgingStrip && api.paintProdAgingStrip(); } catch (e) { out.agingErr = String(e); }
  out.agingStrip = !!document.getElementById('prod-aging-strip');
  out.agingHasBuckets = /data-aging-bucket/.test((document.getElementById('prod-aging-buckets') || {}).innerHTML || '');
  out.faces = api.softCollectInvoiceCashFaces ? api.softCollectInvoiceCashFaces({}).length : -1;
  out.unpaid = api.softCollectInvoiceCashFaces ? api.softCollectInvoiceCashFaces({}).filter(f => f.cash === 'unpaid').length : -1;
  out.wentRec = go('recgm');
  out.recNote = !!document.getElementById('recgm-payout-collected-note');
  out.payoutFn = typeof api.softPayoutIsCollected;
  out.wentExec = go('execgm');
  out.execPdfCard = !!document.getElementById('exec-inv-pdf-card');
  try { api.paintExecInvPdfChrome && api.paintExecInvPdfChrome(); } catch (e) { out.execErr = String(e); }
  try { api.softRenderExecInvPdfPreview && api.softRenderExecInvPdfPreview(); } catch (e) { out.previewErr = String(e); }
  const prev = (document.getElementById('eip-preview') || {}).innerHTML || '';
  out.previewLen = prev.length;
  out.previewHasTable = /<table/i.test(prev);
  out.ok = !!(out.chipOk && out.agingStrip && out.agingHasBuckets && out.recNote && out.execPdfCard && out.payoutFn === 'function' && out.unpaid > 0 && out.previewHasTable);
  return out;
}"""

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        errs = []
        page.on("pageerror", lambda e: errs.append(str(e)))
        page.goto(FILE.as_uri(), wait_until="domcontentloaded", timeout=120000)
        page.wait_for_timeout(3500)
        result = page.evaluate(JS, EXPECT)
        result["pageErrors"] = errs
        browser.close()
    REPORT.write_text(json.dumps(result, indent=2), encoding="utf-8")
    print(json.dumps(result, indent=2))
    print("VERIFY_OK" if result.get("ok") and not errs else "VERIFY_FAIL")
    return 0 if result.get("ok") and not errs else 1

if __name__ == "__main__":
    raise SystemExit(main())
