# Soft Soft — April 2026 open marketing % (write-up only)

**Date:** 2026-09-21 (CT)  
**Status:** write-up done · **locks pending Mike**  
**Rule:** do **not** invent splits. Soft Soft today defaulted recruiter 50 / House 25 (25% open) where marketer share was not locked.

Source: Excel sheet `April 2026` + Soft Soft excelSeeds in `AMP-Mess-Soft.html` / `mess.html` (post soft-april-fixes-20260921 QB stamps; owner % unchanged).

Rep map: AW=Aaron, AM=Amy, RK=Randy, HH=Hadley, ZH=Zach, BM=Brenton, MF=Mike, NS=Nate, SY=Stephanie.

---

## Incomplete marketing lines (25% open)

| Soft Soft id | Client | Excel RECR | Excel MRKT | Soft Soft owners (current) | qbInvoice (after 20260921 stamp) | Gap |
|---|---|---|---|---|---|---|
| `xl_mkt_2026-04_33` | Concord Hospital · MO | Mike (MF) | ZH/AW/BM | Mike **50** / House **25** (25% open) | **16942** (already stamped pre-walk) | Marketer share + 25% open; Carrie-pending / `SOFT_UNMAPPED_2026_FACES` for 16942 — do not invent faces |
| `xl_mkt_2026-04_34` | Concord Hospital · MO | Hadley (HH) | ZH/AW/BM | Hadley **50** / House **25** (25% open) | **16942** (already stamped) | Same 16942 compound; 25% open |
| `xl_mkt_2026-04_35` | Morongo Basin · FP · Standard Package | Amy (AM) | Randy (RK) | Amy **50** / House **25** (25% open); seed `marketer: "Randy"` | **16941** (stamped this pass) | Marketer Randy present on seed but **not** in owners.reps — incomplete |
| `xl_mkt_2026-04_37` | Woodland Heights Med Center · GE · Standard Package | Stephanie (SY) | Randy (RK) | Stephanie **50** / House **25** (25% open); seed `marketer: "Randy"` | **16944** (stamped this pass) | Marketer Randy on seed, not in owners.reps |
| `xl_mkt_2026-04_38` | Indian Health of Santa Clara · FP | Mike (MF) | *(none in Excel)* | Mike **50** / House **25** (25% open); seed `marketer: ""` | **16971** (stamped this pass) | Excel has no MRKT col; Carri spine owners House+Mike — % still open pending Mike lock |

### Owner JSON evidence (unchanged by this pass)

```
xl_mkt_2026-04_33 owners: {"mode":"Marketing","housePct":25,"reps":[{"name":"Mike","pct":50}]}
xl_mkt_2026-04_34 owners: {"mode":"Marketing","housePct":25,"reps":[{"name":"Hadley","pct":50}]}
xl_mkt_2026-04_35 owners: {"mode":"Marketing","housePct":25,"reps":[{"name":"Amy","pct":50}]}
xl_mkt_2026-04_37 owners: {"mode":"Marketing","housePct":25,"reps":[{"name":"Stephanie","pct":50}]}
xl_mkt_2026-04_38 owners: {"mode":"Marketing","housePct":25,"reps":[{"name":"Mike","pct":50}]}
```

---

## Already locked April mkt (reference — not open)

| id | Client | Soft Soft lock | qb |
|---|---|---|---|
| CHDI Apr mkt | Community Health Development | Mike30/Amy30/Aaron20/House20 · `soft-chdi-apr-mkt-30302020-20260920` | 16943 |
| Helen Newberry Apr mkt | Helen Newberry Joy Hospital | Mike30/Nate30/Randy20/House20 | 16945 |

---

## Blocking / next

1. Mike decides Concord 16942 faces (Carrie-pending — skip inventing).
2. Mike decides Morongo Amy/Randy/House %.
3. Mike decides Woodland Stephanie/Randy/House %.
4. Mike decides IHC Santa Clara mkt Mike/House % (no Excel marketer).
5. After decisions: apply `softGmSplitOverride` + durable lock stamps (pattern: CHDI/Helen/IHC BD). **Not applied this pass.**

**Status = write-up done, locks pending Mike.**
