# Soft Production QB inventory — 2026-09-17

For Mike Freeman. Soft CHIP `soft-prod-qb-stamp-20260917k`. Seed-state after `ensureCarriQbInvoiceSeed` + `ensureSoftProdQbFromCarriSeeds`.

Rules: copy a **known** Carri Rec/BD seed or spine QB onto a matching Production-visible row. Never invent. Never overwrite a different existing QB. Skip unbilled `n:""` and deferred Booked Carri seeds. Carri-seed matches require same bookType + client + amount (month first, then same-year unique). Spine matches require client + month + amount, or a non-empty spine `qbNumber` linked by sampleId / linkRowId.

## Counts for Mike

| Bucket | Production board (excel + spine bridge) | Tracker backfill | All Production-visible |
|---|---:|---:|---:|
| Stamped this pass | 38 | 2 | 40 |
| Already had QB | 0 | 0 | 0 |
| Truly blank (label **QB number blank**) | 338 | 86 | 424 |
| — of which 2026 board blanks | 72 | — | — |
| Total visible | 376 | 88 | 464 |

Fresh Excel seed had **0** Production rows with `qbInvoice` / `qbNumber` before this pass (that is why View Details was amber empty while Carri already knew 16943 / 17078 / etc.).

## HIGH Community Health (16943 / 17078)

| QB | Carri / spine | Production outcome |
|---|---|---|
| **17078** | Carri Amy/Aaron Aug marketing + spine row 17078 (board $19,800) | **Stamped** on `xl_mkt_2026-08_35` and `ex_spine_17078` |
| **16943** | Carri Mike/Amy/Aaron Apr marketing components ($5,940 / $3,960) + spine $15,840 | **Left blank** on `xl_mkt_2026-04_32` CHDI $19,800 — amount does not match; do not invent |
| 16859 | Byrd placement $25,000 | **Stamped** on `xl_pl_2026-02_2` |
| 17042 | Ellis placement $16,000 | **Stamped** on `xl_pl_2026-07_4` |
| 17076 | Gentile placement $18,000 | **Stamped** on `xl_pl_2026-08_4` |

## Stamped

### Production board

| Production row id | Client | Month | bookType | Amount | QB # | Match how | Carri/spine seed id |
|---|---|---|---|---:|---|---|---|
| ex_spine_16333 | Ballad Health | 2025-03 | Marketing | $29,800 | 16333 | spine-client+month+amt | 16333 |
| xl_mkt_2025-03_32 | Ballad Health | 2025-03 | Marketing | $29,800 | 16333 | spine-client+month+amt | 16333 |
| xl_bd_2026-01_2 | Community Health Development | 2026-01 | Deal | $4,000 | 16821 | spine-client+month+amt | carri_qb_16821 |
| xl_pl_2026-01_4 | Riverview Regional Medical Center | 2026-01 | Placement | $19,000 | 16857 | spine-client+month+amt | carri_qb_16857 |
| xl_pl_2026-01_3 | Winn Community Health Center | 2026-01 | Placement | $20,000 | 16820 | spine-client+month+amt | carri_qb_16820 |
| xl_bd_2026-02_2 | Community Health | 2026-02 | Deal | $4,000 | 16856 | client+month+amt | carri_bd_aaron_r9_new_search_community_health_dev_dds8419_m02 |
| xl_pl_2026-02_2 | Community Health and Dental Care | 2026-02 | Placement | $25,000 | 16859 | spine-client+month+amt | carri_qb_16859 |
| xl_pl_2026-02_5 | South Plains Rural Health Services, Inc | 2026-02 | Placement | $20,000 | 16893 | spine-client+month+amt | carri_qb_16893 |
| xl_bd_2026-03_4 | Blue Sky MD | 2026-03 | Deal | $6,000 | 16899 | spine-client+month+amt | carri_qb_16899 |
| xl_bd_2026-03_5 | Family Health Center | 2026-03 | Deal | $4,000 | 16933 | spine-client+month+amt | carri_qb_16933 |
| xl_bd_2026-03_6 | Helen Newberry Joy Hospital & Healthcare Center | 2026-03 | Deal | $5,000 | 16934 | spine-client+month+amt | carri_qb_16934 |
| xl_pl_2026-03_4 | Midland | 2026-03 | Placement | $8,000 | 16901 | client+month+amt | carri_gm_stephanie_r12_placement_midland_rono_split_billi_m03 |
| xl_pl_2026-03_5 | W.J. Mangold Memorial Hospital | 2026-03 | Placement | $19,000 | 16935 | spine-client+month+amt | carri_qb_16935 |
| xl_bd_2026-04_6 | Concord Hospital | 2026-04 | Deal | $9,000 | 16974 | client+amt | carri_bd_zach_r10_new_search_concord_cd8439_m05 |
| xl_bd_2026-04_7 | Concord Hospital | 2026-04 | Deal | $9,000 | 16974 | client+amt | carri_bd_zach_r10_new_search_concord_cd8439_m05 |
| xl_pl_2026-04_2 | Midland | 2026-04 | Placement | $8,000 | 16902 | client+month+amt | carri_gm_stephanie_r12_placement_midland_rono_split_billi_m04 |
| xl_bd_2026-05_3 | Concord Hospital | 2026-05 | Deal | $9,000 | 16974 | client+month+amt | carri_bd_zach_r10_new_search_concord_cd8439_m05 |
| xl_bd_2026-05_4 | Concord Hospital | 2026-05 | Deal | $9,000 | 16974 | client+month+amt | carri_bd_zach_r10_new_search_concord_cd8439_m05 |
| xl_bd_2026-05_2 | Riverview Regional Medical Center | 2026-05 | Deal | $2,000 | 16962 | spine-client+month+amt | carri_qb_16962 |
| xl_bd_2026-06_2 | Bibb Medical Center | 2026-06 | Deal | $4,990 | 17010 | spine-client+month+amt | carri_qb_17010 |
| xl_pl_2026-06_3 | Family Health Centers  (NH) | 2026-06 | Placement | $20,000 | 17006 | spine-client+month+amt | carri_qb_17006 |
| xl_pl_2026-06_2 | South Central Medical & Resource Center | 2026-06 | Placement | $20,000 | 17005 | spine-client+month+amt | carri_qb_17005 |
| xl_pl_2026-07_4 | Community Health Development Inc | 2026-07 | Placement | $16,000 | 17042 | client+month+amt | carri_gm_amy_r8_placement_community_health_development_el_m07 |
| xl_bd_2026-07_2 | Copper Queen Commmunity | 2026-07 | Deal | $5,000 | 17037 | spine-client+month+amt | carri_qb_17037 |
| ex_spine_17021 | Kittitas Valley Community Hospital | 2026-07 | Deal | $790 | 17021 | spine-client+month+amt | 17021 |
| ex_spine_17040 | NMC Health | 2026-07 | Placement | $28,000 | 17040 | spine-client+month+amt | carri_qb_17040 |
| xl_pl_2026-07_3 | NMC Health | 2026-07 | Placement | $28,000 | 17040 | spine-client+month+amt | carri_qb_17040 |
| xl_pl_2026-07_2 | South Central Medical & Resource Center | 2026-07 | Placement | $20,000 | 17039 | spine-client+month+amt | carri_qb_17039 |
| xl_bd_2026-07_3 | Winn Community Health Center | 2026-07 | Deal | $2,000 | 17033 | spine-client+month+amt | carri_qb_17033 |
| xl_pl_2026-08_4 | Community Health Development Inc | 2026-08 | Placement | $18,000 | 17076 | client+month+amt | carri_gm_amy_r11_placement_community_health_development_g_m08 |
| xl_mkt_2026-08_35 | Community Health Development INC | 2026-08 | Marketing | $19,800 | 17078 | spine-client+month+amt | 17078 |
| ex_spine_17078 | Community Health Development, INC | 2026-08 | Marketing | $19,800 | 17078 | spine-client+month+amt | 17078 |
| xl_bd_2026-08_11 | Family Health Center of Southern Oklahoma | 2026-08 | Deal | $4,790 | 17079 | spine-client+month+amt | carri_qb_17079 |
| xl_bd_2026-08_5 | Hendrick Medical Center | 2026-08 | Deal | $5,000 | 17071 | spine-client+month+amt | carri_qb_17071 |
| ex_spine_17070 | NMC Health | 2026-08 | Deal | $20,000 | 17070 | spine-client+month+amt | 17070 |
| xl_bd_2026-08_10 | Rogue Community Health | 2026-08 | Deal | $4,990 | 17077 | spine-client+month+amt | carri_qb_17077 |
| ex_spine_17089 | Hendrick Medical Center | 2026-09 | Deal | $2,000 | 17089 | spine-client+month+amt | carri_qb_17089 |
| ex_spine_17074 | Missouri Highlands Health Care | 2026-09 | Deal | $9,250 | 17074 | spine-client+month+amt | 17074 |

### Tracker backfill (also Production-visible)

| Production row id | Client | Month | bookType | Amount | QB # | Match how | Carri/spine seed id |
|---|---|---|---|---:|---|---|---|
| carri_DDS8418 | Community Health Development, Inc. | 2026-01 | Deal | $4,000 | 16821 | spine-client+month+amt | carri_qb_16821 |
| carri_MO8434 | Concord Hospital | 2026-04 | Deal | $9,000 | 16974 | client+amt | carri_bd_zach_r10_new_search_concord_cd8439_m05 |

## Already had QB

None on fresh seed. Live localStorage rows that already carry a QB are left untouched (never overwritten with a different number).

## Truly blank — Production board 2026 (View Details: “QB number blank”)

| Production row id | Client | Month | bookType | Amount | Label |
|---|---|---|---|---:|---|
| xl_bd_2026-01_3 | Cullman Regional | 2026-01 | Deal | $5,000 | QB number blank |
| xl_bd_2026-01_4 | Midland Health | 2026-01 | Deal | $5,000 | QB number blank |
| xl_pl_2026-01_2 | Midland Health (1st half) | 2026-01 | Placement | $9,500 | QB number blank |
| xl_mkt_2026-02_33 | Community Health Development | 2026-02 | Marketing | $19,800 | QB number blank |
| xl_mkt_2026-02_32 | Cullman Regional | 2026-02 | Marketing | $25,000 | QB number blank |
| xl_pl_2026-02_4 | SCMRC, Oklahoma (2nd 1/2 billing) | 2026-02 | Placement | $13,500 | QB number blank |
| xl_pl_2026-02_3 | South Central Resource & Medical Center | 2026-02 | Placement | $21,000 | QB number blank |
| xl_bd_2026-03_2 | Cullman | 2026-03 | Deal | $5,000 | QB number blank |
| xl_bd_2026-03_3 | Cullman | 2026-03 | Deal | $5,000 | QB number blank |
| xl_mkt_2026-03_32 | Cullman | 2026-03 | Marketing | $19,800 | QB number blank |
| xl_pl_2026-03_2 | Cullman | 2026-03 | Placement | $22,000 | QB number blank |
| xl_pl_2026-03_3 | Cullman | 2026-03 | Placement | $22,000 | QB number blank |
| xl_pl_2026-03_6 | South Georgia Medical Center | 2026-03 | Placement | $0 | QB number blank |
| xl_mkt_2026-04_32 | CHDI | 2026-04 | Marketing | $19,800 | QB number blank |
| xl_bd_2026-04_2 | Community Health Development Inc. | 2026-04 | Deal | $5,000 | QB number blank |
| xl_mkt_2026-04_33 | Concord Hospital | 2026-04 | Marketing | $13,000 | QB number blank |
| xl_mkt_2026-04_34 | Concord Hospital | 2026-04 | Marketing | $13,000 | QB number blank |
| xl_mkt_2026-04_36 | Helen Newberry Joy Hospital | 2026-04 | Marketing | $19,800 | QB number blank |
| xl_mkt_2026-04_38 | Indian Health of Santa Clara | 2026-04 | Marketing | $13,000 | QB number blank |
| xl_bd_2026-04_8 | Indian Health of Santa Clara Valley | 2026-04 | Deal | $10,000 | QB number blank |
| xl_mkt_2026-04_35 | Morongo Basin | 2026-04 | Marketing | $19,800 | QB number blank |
| xl_bd_2026-04_4 | NMC Health | 2026-04 | Deal | $5,000 | QB number blank |
| xl_bd_2026-04_5 | NMC Health | 2026-04 | Deal | $5,000 | QB number blank |
| xl_bd_2026-04_3 | South Central Medical and Resource Center | 2026-04 | Deal | $4,000 | QB number blank |
| xl_mkt_2026-04_37 | Woodland Heights Med Center | 2026-04 | Marketing | $15,000 | QB number blank |
| xl_pl_2026-05_2 | Arnold/ NP/ Advanced Heart & Vascular | 2026-05 | Placement | $16,000 | QB number blank |
| xl_mkt_2026-05_32 | Concord Hospital | 2026-05 | Marketing | $13,000 | QB number blank |
| xl_mkt_2026-05_33 | Concord Hospital | 2026-05 | Marketing | $13,000 | QB number blank |
| xl_bd_2026-05_5 | South Central Medical & Resource Center | 2026-05 | Deal | $5 | QB number blank |
| xl_bd_2026-05_6 | South Central Medical & Resource Center | 2026-05 | Deal | $0 | QB number blank |
| xl_mkt_2026-05_35 | South Central Medical & Resource Center | 2026-05 | Marketing | $5,000 | QB number blank |
| xl_mkt_2026-05_34 | Winn Community | 2026-05 | Marketing | $15,000 | QB number blank |
| xl_mkt_2026-06_32 | Midland Health | 2026-06 | Marketing | $19,800 | QB number blank |
| xl_mkt_2026-06_33 | Midland Health | 2026-06 | Marketing | $17,800 | QB number blank |
| xl_mkt_2026-06_34 | South Central Medical & Resource Center | 2026-06 | Marketing | $5,000 | QB number blank |
| xl_mkt_2026-07_34 | Missouri Highlands Health Care (10k/4) | 2026-07 | Marketing | $2,500 | QB number blank |
| xl_mkt_2026-07_33 | Missouri Highlands Health Care (14k/4) | 2026-07 | Marketing | $3,500 | QB number blank |
| xl_bd_2026-07_6 | Missouri Highlands Health Care (3k/4) | 2026-07 | Deal | $750 | QB number blank |
| xl_bd_2026-07_4 | Missouri Highlands Health Care (5k/4) | 2026-07 | Deal | $1,250 | QB number blank |
| xl_bd_2026-07_5 | Missouri Highlands Health Care (5k/4) | 2026-07 | Deal | $1,250 | QB number blank |
| xl_bd_2026-07_7 | NMC Health | 2026-07 | Deal | $5,000 | QB number blank |
| xl_bd_2026-07_8 | NMC Health | 2026-07 | Deal | $5,000 | QB number blank |
| xl_mkt_2026-07_36 | NMC Health | 2026-07 | Marketing | $5,000 | QB number blank |
| xl_mkt_2026-07_37 | NMC Health | 2026-07 | Marketing | $5,000 | QB number blank |
| xl_mkt_2026-07_32 | South Central Medical & Resource Center | 2026-07 | Marketing | $5,000 | QB number blank |
| xl_mkt_2026-07_35 | Winn Community | 2026-07 | Marketing | $19,800 | QB number blank |
| xl_bd_2026-08_12 | Cullman Regional | 2026-08 | Deal | $5,000 | QB number blank |
| xl_bd_2026-08_13 | Cullman Regional | 2026-08 | Deal | $5,000 | QB number blank |
| xl_mkt_2026-08_37 | Cullman Regional Medical Center | 2026-08 | Marketing | $29,800 | QB number blank |
| xl_mkt_2026-08_36 | Cullman REgional Medical Center | 2026-08 | Marketing | $29,800 | QB number blank |
| xl_bd_2026-08_6 | Hendrick Medical Center | 2026-08 | Deal | $0 | QB number blank |
| xl_bd_2026-08_7 | Hendrick Medical Center | 2026-08 | Deal | $0 | QB number blank |
| xl_bd_2026-08_8 | Hendrick Medical Center | 2026-08 | Deal | $0 | QB number blank |
| xl_bd_2026-08_9 | Hendrick Medical Center | 2026-08 | Deal | $0 | QB number blank |
| xl_mkt_2026-08_34 | Missouri Highlands Health Care (10k/4) | 2026-08 | Marketing | $2,500 | QB number blank |
| xl_mkt_2026-08_33 | Missouri Highlands Health Care (14k/4) | 2026-08 | Marketing | $3,500 | QB number blank |
| xl_bd_2026-08_4 | Missouri Highlands Health Care (3k/4) | 2026-08 | Deal | $750 | QB number blank |
| xl_bd_2026-08_2 | Missouri Highlands Health Care (5k/4) | 2026-08 | Deal | $1,250 | QB number blank |
| xl_bd_2026-08_3 | Missouri Highlands Health Care (5k/4) | 2026-08 | Deal | $1,250 | QB number blank |
| xl_mkt_2026-08_32 | South Central Medical & Resource Center | 2026-08 | Marketing | $5,000 | QB number blank |
| xl_pl_2026-08_2 | South Central Medical & Resource Center | 2026-08 | Placement | $19,000 | QB number blank |
| xl_pl_2026-08_3 | South Central Medical & Resource Center | 2026-08 | Placement | $5,000 | QB number blank |
| xl_mkt_2026-09_33 | Missouri Highlands Health Care (10k/4) | 2026-09 | Marketing | $2,500 | QB number blank |
| xl_mkt_2026-09_32 | Missouri Highlands Health Care (14k/4) | 2026-09 | Marketing | $3,500 | QB number blank |
| xl_bd_2026-09_4 | Missouri Highlands Health Care (3k/4) | 2026-09 | Deal | $750 | QB number blank |
| xl_bd_2026-09_2 | Missouri Highlands Health Care (5k/4) | 2026-09 | Deal | $1,250 | QB number blank |
| xl_bd_2026-09_3 | Missouri Highlands Health Care (5k/4) | 2026-09 | Deal | $1,250 | QB number blank |
| xl_mkt_2026-10_33 | Missouri Highlands Health Care (10k/4) | 2026-10 | Marketing | $2,500 | QB number blank |
| xl_mkt_2026-10_32 | Missouri Highlands Health Care (14k/4) | 2026-10 | Marketing | $3,500 | QB number blank |
| xl_bd_2026-10_4 | Missouri Highlands Health Care (3k/4) | 2026-10 | Deal | $750 | QB number blank |
| xl_bd_2026-10_2 | Missouri Highlands Health Care (5k/4) | 2026-10 | Deal | $1,250 | QB number blank |
| xl_bd_2026-10_3 | Missouri Highlands Health Care (5k/4) | 2026-10 | Deal | $1,250 | QB number blank |

## Truly blank — Production board 2024–2025

Carri/spine SoT in Soft is 2026 invoices (plus Ballad 16333). Prior-year Excel rows stay blank unless a same-month spine amount hits.

| Production row id | Client | Month | bookType | Amount | Label |
|---|---|---|---|---:|---|
| xl_pl_2024-01_9 | Bibb Medical Center - Centreville, AL | 2024-01 | Placement | $17,000 | QB number blank |
| xl_pl_2024-01_7 | Community Health & Dental Care - Pottstown, PA | 2024-01 | Placement | $0 | QB number blank |
| xl_mkt_2024-01_33 | CSVS | 2024-01 | Marketing | $19,800 | QB number blank |
| xl_mkt_2024-01_34 | CSVS | 2024-01 | Marketing | $19,800 | QB number blank |
| xl_mkt_2024-01_32 | DaySpring Health | 2024-01 | Marketing | $15,000 | QB number blank |
| xl_pl_2024-01_3 | Hays Medical Center - Hays, Kansas | 2024-01 | Placement | $0 | QB number blank |
| xl_bd_2024-01_6 | Hope Family Health Services - Westmoreland, TN | 2024-01 | Deal | $4,500 | QB number blank |
| xl_bd_2024-01_3 | Kern Radiology - Bakersfield, CA | 2024-01 | Deal | $4,000 | QB number blank |
| xl_pl_2024-01_4 | Kern Radiology - Bakersfield, CA | 2024-01 | Placement | $17,000 | QB number blank |
| xl_pl_2024-01_5 | Kittitas Valley - Ellensburg, WA | 2024-01 | Placement | $17,000 | QB number blank |
| xl_bd_2024-01_4 | Murray Calloway - Murray KY | 2024-01 | Deal | $4,400 | QB number blank |
| xl_bd_2024-01_5 | One Cross Medical-  Campbellsville Kentucky | 2024-01 | Deal | $4,000 | QB number blank |
| xl_pl_2024-01_8 | Person Family Medical Center - Roxboro, NC | 2024-01 | Placement | $17,600 | QB number blank |
| xl_pl_2024-01_2 | Southern Oregon Orthopedics | 2024-01 | Placement | $11,250 | QB number blank |
| xl_bd_2024-01_2 | Southern Oregon Orthopedics - Medford, OR | 2024-01 | Deal | $5,000 | QB number blank |
| xl_pl_2024-01_11 | Southern Oregon Orthopedics - Medford, OR | 2024-01 | Placement | $11,250 | QB number blank |
| xl_pl_2024-01_10 | Valley Wide Health System - Alamosa, CO | 2024-01 | Placement | $0 | QB number blank |
| xl_pl_2024-01_6 | Valley Wide Health System - Canon City, CO | 2024-01 | Placement | $0 | QB number blank |
| xl_pl_2024-02_3 | Cass County Health Department - Virginia, IL | 2024-02 | Placement | $0 | QB number blank |
| xl_bd_2024-02_7 | Community Health Center of Northeast Oklahoma | 2024-02 | Deal | $4,725 | QB number blank |
| xl_bd_2024-02_2 | Endless Mountain Health System | 2024-02 | Deal | $5,000 | QB number blank |
| xl_pl_2024-02_2 | healthfirst Bluegrass - Louisville, KY | 2024-02 | Placement | $0 | QB number blank |
| xl_pl_2024-02_4 | Indian Health Center of Santa Clara Valley | 2024-02 | Placement | $17,000 | QB number blank |
| xl_mkt_2024-02_32 | Once Cross | 2024-02 | Marketing | $19,800 | QB number blank |
| xl_pl_2024-02_11 | Sanford Medmiji DR. Westreich | 2024-02 | Placement | $2,400 | QB number blank |
| xl_pl_2024-02_12 | Sanford Medmiji DR. Westreich | 2024-02 | Placement | $3,200 | QB number blank |
| xl_bd_2024-02_3 | Southern Oregon Orthopedics - Medford, OR | 2024-02 | Deal | $5,000 | QB number blank |
| xl_bd_2024-02_4 | VCU Health - South Hill, VA | 2024-02 | Deal | $2,800 | QB number blank |
| xl_bd_2024-02_5 | VCU Health - South Hill, VA | 2024-02 | Deal | $2,800 | QB number blank |
| xl_bd_2024-02_6 | VCU Health - South Hill, VA | 2024-02 | Deal | $2,800 | QB number blank |
| xl_mkt_2024-02_33 | VCU Health - South Hill, VA | 2024-02 | Marketing | $19,800 | QB number blank |
| xl_mkt_2024-02_34 | VCU Health - South Hill, VA | 2024-02 | Marketing | $19,800 | QB number blank |
| xl_mkt_2024-02_35 | VCU Health - South Hill, VA | 2024-02 | Marketing | $19,800 | QB number blank |
| xl_bd_2024-02_8 | Women's Health New England | 2024-02 | Deal | $5,000 | QB number blank |
| xl_bd_2024-03_2 | Centennial Pain & Spine/Las Vegas, NV | 2024-03 | Deal | $5,000 | QB number blank |
| xl_mkt_2024-03_34 | Clinica De Salud Del Valle De Salinas | 2024-03 | Marketing | $19,800 | QB number blank |
| xl_mkt_2024-03_35 | Clinica De Salud Del Valle De Salinas | 2024-03 | Marketing | $19,800 | QB number blank |
| xl_mkt_2024-03_36 | Indian Health of Santa Clara Valley | 2024-03 | Marketing | $10,000 | QB number blank |
| xl_bd_2024-03_3 | Indian Health of Santa Clara Valley/San Jose, CA | 2024-03 | Deal | $3,500 | QB number blank |
| xl_pl_2024-03_2 | Kittitas Valley Healthcare | 2024-03 | Placement | $17,000 | QB number blank |
| xl_pl_2024-03_3 | Kittitas Valley Healthcare | 2024-03 | Placement | $17,000 | QB number blank |
| xl_pl_2024-03_4 | Person Family Medical Center | 2024-03 | Placement | $18,300 | QB number blank |
| xl_mkt_2024-03_32 | UC Health Colorado | 2024-03 | Marketing | $10,000 | QB number blank |
| xl_mkt_2024-03_33 | Women's Health New England | 2024-03 | Marketing | $19,800 | QB number blank |
| xl_bd_2024-04_5 | Hill Regional Hospital | 2024-04 | Deal | $5,000 | QB number blank |
| xl_pl_2024-04_3 | Medical Associates Plus Augusta, GA | 2024-04 | Placement | $15,300 | QB number blank |
| xl_bd_2024-04_4 | Morongo Basin Healthcare District | 2024-04 | Deal | $4,000 | QB number blank |
| xl_bd_2024-04_3 | Northwest Medical Homes - Springfield, OR | 2024-04 | Deal | $4,000 | QB number blank |
| xl_pl_2024-04_13 | Sanford Bedminji | 2024-04 | Placement | $2,600 | QB number blank |
| xl_pl_2024-04_6 | Serenity TMS / Atlanta, GA | 2024-04 | Placement | $15,000 | QB number blank |
| xl_pl_2024-04_5 | Southern Humboldt Community Healthcare District | 2024-04 | Placement | $13,000 | QB number blank |
| xl_pl_2024-04_4 | Southern Oregon Orthopedics | 2024-04 | Placement | $11,250 | QB number blank |
| xl_pl_2024-04_2 | Whiteside County Health Department | 2024-04 | Placement | $19,000 | QB number blank |
| xl_bd_2024-04_2 | Winkler County Memorial Hospital- Kermit, TX | 2024-04 | Deal | $6,000 | QB number blank |
| xl_pl_2024-05_6 | Clinica de Salud del Valle de Salinas | 2024-05 | Placement | $14,000 | QB number blank |
| xl_pl_2024-05_3 | Community Health Center of NE OK | 2024-05 | Placement | $20,000 | QB number blank |
| xl_bd_2024-05_6 | Hays Medical Center | 2024-05 | Deal | $5,990 | QB number blank |
| xl_pl_2024-05_5 | Hays Medical Center | 2024-05 | Placement | $0 | QB number blank |
| xl_mkt_2024-05_33 | Highland Rivers Health | 2024-05 | Marketing | $10,000 | QB number blank |
| xl_mkt_2024-05_32 | Lawrence Medical Center | 2024-05 | Marketing | $5,000 | QB number blank |
| xl_bd_2024-05_2 | Lawrence Medical Group | 2024-05 | Deal | $5,500 | QB number blank |
| xl_pl_2024-05_2 | Legacy Chiropractic Clinic - Midwest Disc Clinic | 2024-05 | Placement | $16,000 | QB number blank |
| xl_mkt_2024-05_34 | Morongo Basin | 2024-05 | Marketing | $19,800 | QB number blank |
| xl_bd_2024-05_4 | Olympia Multy Specialty | 2024-05 | Deal | $3,500 | QB number blank |
| xl_bd_2024-05_5 | Olympia Multy Specialty | 2024-05 | Deal | $3,500 | QB number blank |
| xl_bd_2024-05_3 | Project Patch | 2024-05 | Deal | $4,500 | QB number blank |
| xl_pl_2024-05_4 | WHITESIDE COUNTY HEALTH DEPT | 2024-05 | Placement | $15,000 | QB number blank |
| xl_bd_2024-06_6 | Baptist Health South Florida | 2024-06 | Deal | $2,750 | QB number blank |
| xl_bd_2024-06_7 | Baptist Health South Florida | 2024-06 | Deal | $2,750 | QB number blank |
| xl_bd_2024-06_4 | Bibb Medical Center | 2024-06 | Deal | $2,995 | QB number blank |
| xl_mkt_2024-06_36 | Clinica de Salud del Valle de Salinas | 2024-06 | Marketing | $19,800 | QB number blank |
| xl_mkt_2024-06_37 | Clinica de Salud del Valle de Salinas | 2024-06 | Marketing | $19,800 | QB number blank |
| xl_bd_2024-06_5 | Cumberland River Comprehensive | 2024-06 | Deal | $5,000 | QB number blank |
| xl_bd_2024-06_2 | Full Circle Health / Boise ID | 2024-06 | Deal | $5,000 | QB number blank |
| xl_mkt_2024-06_34 | Hays Medical Center | 2024-06 | Marketing | $15,000 | QB number blank |
| xl_mkt_2024-06_35 | Hays Medical Center | 2024-06 | Marketing | $15,000 | QB number blank |
| xl_mkt_2024-06_33 | Kern Radiology | 2024-06 | Marketing | $6,600 | QB number blank |
| xl_pl_2024-06_4 | Lake Granbury Medical Center | 2024-06 | Placement | $19,000 | QB number blank |
| xl_mkt_2024-06_32 | Lawrence Medical Center | 2024-06 | Marketing | $5,000 | QB number blank |
| xl_bd_2024-06_3 | Legacy Medical Care | 2024-06 | Deal | $2,500 | QB number blank |
| xl_pl_2024-06_3 | Medical Associates Plus | 2024-06 | Placement | $18,750 | QB number blank |
| xl_pl_2024-06_5 | Morongo Basin Healthcare | 2024-06 | Placement | $22,000 | QB number blank |
| xl_pl_2024-06_6 | Serenity Mental Health Centers | 2024-06 | Placement | $19,000 | QB number blank |
| xl_pl_2024-06_2 | Southern Humboldt Community Healthcare District | 2024-06 | Placement | $17,000 | QB number blank |
| xl_mkt_2024-07_37 | Baptist Health South Florida | 2024-07 | Marketing | $19,800 | QB number blank |
| xl_mkt_2024-07_38 | Baptist Health South Florida | 2024-07 | Marketing | $19,800 | QB number blank |
| xl_pl_2024-07_4 | Clinica de Salud del Valle de Salinas | 2024-07 | Placement | $14,000 | QB number blank |
| xl_bd_2024-07_10 | Columbia County Health System | 2024-07 | Deal | $3,500 | QB number blank |
| xl_bd_2024-07_9 | Columbia County Health System | 2024-07 | Deal | $3,500 | QB number blank |
| xl_bd_2024-07_6 | Community Health Assoication of Spokane | 2024-07 | Deal | $3,500 | QB number blank |
| xl_bd_2024-07_7 | Community Health Assoication of Spokane | 2024-07 | Deal | $3,500 | QB number blank |
| xl_bd_2024-07_2 | Cullman Regional | 2024-07 | Deal | $4,000 | QB number blank |
| xl_mkt_2024-07_34 | Cullman Regional | 2024-07 | Marketing | $19,800 | QB number blank |
| xl_mkt_2024-07_35 | Cullman Regional | 2024-07 | Marketing | $19,800 | QB number blank |
| xl_bd_2024-07_14 | Indian Health Center of Santa Clara Valley | 2024-07 | Deal | $3,500 | QB number blank |
| xl_mkt_2024-07_36 | Indian Health Center of Santa Clara Valley | 2024-07 | Marketing | $10,000 | QB number blank |
| xl_pl_2024-07_2 | Indian Health Center of Santa Clara Valley | 2024-07 | Placement | $22,000 | QB number blank |
| xl_mkt_2024-07_33 | Kern Radiology | 2024-07 | Marketing | $6,600 | QB number blank |
| xl_bd_2024-07_5 | Knox County Health Dept | 2024-07 | Deal | $5,000 | QB number blank |
| xl_mkt_2024-07_40 | Knox County Public Health | 2024-07 | Marketing | $5,000 | QB number blank |
| xl_mkt_2024-07_32 | Lawrence Medical Center | 2024-07 | Marketing | $5,000 | QB number blank |
| xl_mkt_2024-07_39 | Lutheran Health Kosciusko | 2024-07 | Marketing | $12,500 | QB number blank |
| xl_bd_2024-07_8 | Medical Associates Plus | 2024-07 | Deal | $3,600 | QB number blank |
| xl_bd_2024-07_11 | Nacogdoches County Hospital District | 2024-07 | Deal | $5,000 | QB number blank |
| xl_bd_2024-07_12 | Nacogdoches County Hospital District | 2024-07 | Deal | $4,000 | QB number blank |
| xl_bd_2024-07_13 | Nacogdoches County Hospital District | 2024-07 | Deal | $4,000 | QB number blank |
| xl_pl_2024-07_3 | One Cross Health | 2024-07 | Placement | $12,000 | QB number blank |
| xl_bd_2024-07_3 | Union Community Care | 2024-07 | Deal | $3,000 | QB number blank |
| xl_bd_2024-07_4 | Union Community Care | 2024-07 | Deal | $3,000 | QB number blank |
| xl_pl_2024-08_2 | Covenant House | 2024-08 | Placement | $0 | QB number blank |
| xl_bd_2024-08_7 | Indian Health Center of Santa Clara Valley | 2024-08 | Deal | $3,500 | QB number blank |
| xl_bd_2024-08_2 | Innovative Healing Systems - Hinesville, GA | 2024-08 | Deal | $2,900 | QB number blank |
| xl_mkt_2024-08_32 | Kern Radiology | 2024-08 | Marketing | $6,600 | QB number blank |
| xl_bd_2024-08_3 | Kittitas Valley Healthcare - Ellensburg, WA | 2024-08 | Deal | $3,000 | QB number blank |
| xl_bd_2024-08_4 | Kittitas Valley Healthcare - Ellensburg, WA | 2024-08 | Deal | $3,000 | QB number blank |
| xl_bd_2024-08_5 | Kittitas Valley Healthcare - Ellensburg, WA | 2024-08 | Deal | $3,000 | QB number blank |
| xl_mkt_2024-08_34 | Knox County Public Health | 2024-08 | Marketing | $5,000 | QB number blank |
| xl_mkt_2024-08_33 | Lutheran Health Kosciusko | 2024-08 | Marketing | $12,500 | QB number blank |
| xl_bd_2024-08_8 | Medical Associates Plus | 2024-08 | Deal | $3,600 | QB number blank |
| xl_mkt_2024-08_36 | Minneapolis Neurology Clinic | 2024-08 | Marketing | $29,800 | QB number blank |
| xl_bd_2024-08_6 | Morongo Basin Healthcare District | 2024-08 | Deal | $3,000 | QB number blank |
| xl_mkt_2024-08_35 | Nacogdoches County Hospital Disctrict | 2024-08 | Marketing | $3,333.33 | QB number blank |
| xl_pl_2024-08_3 | Winkler County Memorial Hospital | 2024-08 | Placement | $10,000 | QB number blank |
| xl_mkt_2024-09_35 | Columbia County Health | 2024-09 | Marketing | $9,900 | QB number blank |
| xl_bd_2024-09_4 | Community Health Center of NE OK | 2024-09 | Deal | $4,725 | QB number blank |
| xl_bd_2024-09_2 | Cullman Regional | 2024-09 | Deal | $4,000 | QB number blank |
| xl_pl_2024-09_2 | Cullman Regional | 2024-09 | Placement | $17,000 | QB number blank |
| xl_pl_2024-09_4 | Hays Med | 2024-09 | Placement | $25,000 | QB number blank |
| xl_bd_2024-09_3 | Lawton Community Health Center | 2024-09 | Deal | $4,500 | QB number blank |
| xl_mkt_2024-09_33 | Nacogdoches County Hospital Disctrict | 2024-09 | Marketing | $3,333.33 | QB number blank |
| xl_mkt_2024-09_32 | Olympia Multi-Specialty Clinic | 2024-09 | Marketing | $10,000 | QB number blank |
| xl_mkt_2024-09_34 | Rural Medical Services | 2024-09 | Marketing | $6,599.93 | QB number blank |
| xl_pl_2024-09_3 | Saint Francis | 2024-09 | Placement | $17,000 | QB number blank |
| xl_mkt_2024-09_36 | Southern Humboldt | 2024-09 | Marketing | $14,000 | QB number blank |
| xl_pl_2024-10_3 | Baptist South Miami | 2024-10 | Placement | $22,000 | QB number blank |
| xl_mkt_2024-10_33 | Columbia County Health | 2024-10 | Marketing | $9,900 | QB number blank |
| xl_mkt_2024-10_32 | CSVS | 2024-10 | Marketing | $19,800 | QB number blank |
| xl_bd_2024-10_2 | CSVS - Salinas, CA | 2024-10 | Deal | $3,000 | QB number blank |
| xl_mkt_2024-10_37 | Cullman Regional | 2024-10 | Marketing | $19,800 | QB number blank |
| xl_mkt_2024-10_38 | Indian Health Center of Santa Clara Valley | 2024-10 | Marketing | $29,800 | QB number blank |
| xl_mkt_2024-10_39 | Indian Health Center of Santa Clara Valley | 2024-10 | Marketing | $7,500 | QB number blank |
| xl_bd_2024-10_6 | Indian Helath Center of Santa Clara Valley | 2024-10 | Deal | $3,500 | QB number blank |
| xl_pl_2024-10_2 | Kittitas Valley Healthcare | 2024-10 | Placement | $22,000 | QB number blank |
| xl_bd_2024-10_4 | LifeSpan | 2024-10 | Deal | $5,000 | QB number blank |
| xl_bd_2024-10_5 | Morris County Hospital | 2024-10 | Deal | $5,000 | QB number blank |
| xl_mkt_2024-10_35 | Nacogdoches County Hospital Disctrict | 2024-10 | Marketing | $3,333.34 | QB number blank |
| xl_bd_2024-10_3 | NeoHealth | 2024-10 | Deal | $4,000 | QB number blank |
| xl_mkt_2024-10_34 | Rural Medical Services | 2024-10 | Marketing | $6,600.04 | QB number blank |
| xl_mkt_2024-10_36 | VCU | 2024-10 | Marketing | $14,000 | QB number blank |
| xl_bd_2024-11_4 | Cross Trails Medical Center | 2024-11 | Deal | $1,500 | QB number blank |
| xl_bd_2024-11_2 | Cullman Regional | 2024-11 | Deal | $4,000 | QB number blank |
| xl_mkt_2024-11_32 | Cullman Regional | 2024-11 | Marketing | $19,800 | QB number blank |
| xl_pl_2024-11_2 | Cullman Regional | 2024-11 | Placement | $22,000 | QB number blank |
| xl_pl_2024-11_3 | Inovative Healing Solutions | 2024-11 | Placement | $18,000 | QB number blank |
| xl_pl_2024-11_4 | Kittitas Valley Healthcare | 2024-11 | Placement | $22,000 | QB number blank |
| xl_bd_2024-11_5 | Lake Granbury Medical Center | 2024-11 | Deal | $3,500 | QB number blank |
| xl_mkt_2024-11_35 | Lake Granbury Medical Center | 2024-11 | Marketing | $15,000 | QB number blank |
| xl_bd_2024-11_8 | Rural Medical | 2024-11 | Deal | $2,800 | QB number blank |
| xl_mkt_2024-11_33 | Rural Medical Services | 2024-11 | Marketing | $6,600.03 | QB number blank |
| xl_mkt_2024-11_34 | Rural Medical Services | 2024-11 | Marketing | $10,000 | QB number blank |
| xl_bd_2024-11_3 | Texas Health Resources | 2024-11 | Deal | $3,000 | QB number blank |
| xl_bd_2024-11_7 | Woodland Heights Medial Center | 2024-11 | Deal | $3,000 | QB number blank |
| xl_mkt_2024-11_37 | Woodland Heights Medial Center | 2024-11 | Marketing | $15,000 | QB number blank |
| xl_bd_2024-11_6 | Woodland Heights Medical Center | 2024-11 | Deal | $3,000 | QB number blank |
| xl_mkt_2024-11_36 | Woodland Heights Medical Center | 2024-11 | Marketing | $15,000 | QB number blank |
| xl_bd_2024-12_5 | Asian Americans for Community Involvement | 2024-12 | Deal | $5,000 | QB number blank |
| xl_pl_2024-12_4 | Clinica de Salud del Valle de Salinas | 2024-12 | Placement | $22,000 | QB number blank |
| xl_pl_2024-12_3 | Community Health of Northeast Oklahoma | 2024-12 | Placement | $20,000 | QB number blank |
| xl_bd_2024-12_3 | Indian Health Centers of Santa Clara Valley | 2024-12 | Deal | $3,300 | QB number blank |
| xl_bd_2024-12_4 | Indian Health Centers of Santa Clara Valley | 2024-12 | Deal | $3,300 | QB number blank |
| xl_mkt_2024-12_33 | Indian Health Centers of Santa Clara Valley | 2024-12 | Marketing | $10,000 | QB number blank |
| xl_pl_2024-12_2 | Indian Health Centers of Santa Clara Valley | 2024-12 | Placement | $22,000 | QB number blank |
| xl_bd_2024-12_2 | Southern Oregon Orthopedics | 2024-12 | Deal | $2,500 | QB number blank |
| xl_mkt_2024-12_32 | Texas Health Resources - Ft. Worth, TX | 2024-12 | Marketing | $15,000 | QB number blank |
| xl_bd_2025-01_3 | Barbour Community Health Asscoiation | 2025-01 | Deal | $2,000 | QB number blank |
| xl_bd_2025-01_2 | Clinica de Salud del Valle de Salinas - Salinas, CA | 2025-01 | Deal | $3,000 | QB number blank |
| xl_pl_2025-01_3 | NeoHealth Fall off | 2025-01 | Placement | $0 | QB number blank |
| xl_pl_2025-01_4 | Olympia Multi-Specality Clinic | 2025-01 | Placement | $15,000 | QB number blank |
| xl_pl_2025-01_2 | Serenity Mental Health Partners | 2025-01 | Placement | $19,000 | QB number blank |
| xl_mkt_2025-02_32 | AACI | 2025-02 | Marketing | $9,500 | QB number blank |
| xl_mkt_2025-02_33 | AACI | 2025-02 | Marketing | $18,810 | QB number blank |
| xl_bd_2025-02_2 | Ballad Health TN | 2025-02 | Deal | $5,000 | QB number blank |
| xl_pl_2025-02_4 | Baptist Health South | 2025-02 | Placement | $17,000 | QB number blank |
| xl_mkt_2025-02_34 | Clinica de Salud del Valle de Salinas | 2025-02 | Marketing | $19,800 | QB number blank |
| xl_bd_2025-02_3 | Current Clinic Inc. | 2025-02 | Deal | $10,000 | QB number blank |
| xl_pl_2025-02_3 | Lifespan Health | 2025-02 | Placement | $16,000 | QB number blank |
| xl_pl_2025-02_2 | Lighthouse Behavioral Health | 2025-02 | Placement | $21,000 | QB number blank |
| xl_pl_2025-02_6 | Rural Medical Services | 2025-02 | Placement | $15,300 | QB number blank |
| xl_pl_2025-02_5 | Serenity Mental Health Centers | 2025-02 | Placement | $17,000 | QB number blank |
| xl_pl_2025-03_2 | Baptist Health Soouth Florida - Off Contract | 2025-03 | Placement | $22,500 | QB number blank |
| xl_bd_2025-03_2 | Baptist Health South Florida - Off Contract Placement | 2025-03 | Deal | $7,500 | QB number blank |
| xl_mkt_2025-03_33 | Barbour Health | 2025-03 | Marketing | $5,000 | QB number blank |
| xl_mkt_2025-03_34 | Clinica de Salud del Valle de Salinas | 2025-03 | Marketing | $19,800 | QB number blank |
| xl_mkt_2025-03_35 | Cullman Regional | 2025-03 | Marketing | $19,800 | QB number blank |
| xl_pl_2025-03_3 | Nacogdoches County Hospital District | 2025-03 | Placement | $19,000 | QB number blank |
| xl_bd_2025-03_6 | North Side Christian Health Center | 2025-03 | Deal | $3,500 | QB number blank |
| xl_bd_2025-03_7 | Plains Memorial Hospital | 2025-03 | Deal | $5,000 | QB number blank |
| xl_bd_2025-03_3 | Reeves County Hospital District | 2025-03 | Deal | $5,000 | QB number blank |
| xl_bd_2025-03_5 | RiverView Regional | 2025-03 | Deal | $5,000 | QB number blank |
| xl_bd_2025-03_8 | South Georgia Medical Center | 2025-03 | Deal | $5,000 | QB number blank |
| xl_bd_2025-03_4 | Thrive Medical | 2025-03 | Deal | $4,500 | QB number blank |
| xl_mkt_2025-04_32 | Barbour Health | 2025-04 | Marketing | $5,000 | QB number blank |
| xl_mkt_2025-04_33 | Clinica de Salud del Valle de Salinas | 2025-04 | Marketing | $19,800 | QB number blank |
| xl_pl_2025-04_2 | Valley Wide Health System | 2025-04 | Placement | $14,000 | QB number blank |
| xl_bd_2025-04_2 | Walla Wall Clinic - Walla Walla, Washington | 2025-04 | Deal | $2,800 | QB number blank |
| xl_pl_2025-05_2 | Baptist Health | 2025-05 | Placement | $22,500 | QB number blank |
| xl_bd_2025-05_2 | Baptist Health - Keys, Florida | 2025-05 | Deal | $7,500 | QB number blank |
| xl_mkt_2025-05_32 | Kern Radiology | 2025-05 | Marketing | $19,800 | QB number blank |
| xl_pl_2025-05_3 | Valley Wide Health System | 2025-05 | Placement | $17,000 | QB number blank |
| xl_mkt_2025-05_33 | Walla Walla Clinic | 2025-05 | Marketing | $10,000 | QB number blank |
| xl_bd_2025-06_3 | Hope Community Services | 2025-06 | Deal | $5,000 | QB number blank |
| xl_bd_2025-06_2 | Union Community Care | 2025-06 | Deal | $5,000 | QB number blank |
| xl_bd_2025-06_4 | Winn Community | 2025-06 | Deal | $5,000 | QB number blank |
| xl_bd_2025-07_4 | Advanced Heart and Vascular Center of NM | 2025-07 | Deal | $5,000 | QB number blank |
| xl_bd_2025-07_7 | Blue Mountian Hospital | 2025-07 | Deal | $3,000 | QB number blank |
| xl_mkt_2025-07_34 | Clinica de Salud del Valle de Salinas | 2025-07 | Marketing | $19,800 | QB number blank |
| xl_pl_2025-07_2 | Clinica de Salud del Valle de Salinas | 2025-07 | Placement | $20,000 | QB number blank |
| xl_bd_2025-07_8 | Fairfax Medical Facilities | 2025-07 | Deal | $2,000 | QB number blank |
| xl_bd_2025-07_2 | Kings Daughter | 2025-07 | Deal | $5,000 | QB number blank |
| xl_pl_2025-07_3 | Kittitas Valley Healthccare | 2025-07 | Placement | $17,000 | QB number blank |
| xl_bd_2025-07_5 | Lifespan | 2025-07 | Deal | $4,500 | QB number blank |
| xl_bd_2025-07_3 | Pascua Yaqui Tribe | 2025-07 | Deal | $4,990 | QB number blank |
| xl_mkt_2025-07_33 | Riverview Regional Medical Center | 2025-07 | Marketing | $19,800 | QB number blank |
| xl_mkt_2025-07_32 | South Georgia Medical Center | 2025-07 | Marketing | $15,000 | QB number blank |
| xl_bd_2025-07_6 | Texas Health Resources | 2025-07 | Deal | $3,000 | QB number blank |
| xl_pl_2025-08_2 | Advanced Heart & Vascular of NM | 2025-08 | Placement | $16,000 | QB number blank |
| xl_bd_2025-08_3 | Community Health and Dental | 2025-08 | Deal | $1,795 | QB number blank |
| xl_bd_2025-08_2 | W.J. Mangold Memorial | 2025-08 | Deal | $5,000 | QB number blank |
| xl_mkt_2025-08_32 | Winn Community | 2025-08 | Marketing | $15 | QB number blank |
| xl_mkt_2025-08_33 | Winn Community | 2025-08 | Marketing | $15 | QB number blank |
| xl_pl_2025-09_2 | Barbour Health | 2025-09 | Placement | $0 | QB number blank |
| xl_bd_2025-09_5 | Current Clinic | 2025-09 | Deal | $4,000 | QB number blank |
| xl_bd_2025-09_4 | Morongo Basin Healthcare District | 2025-09 | Deal | $3,000 | QB number blank |
| xl_bd_2025-09_3 | Ortho Plus | 2025-09 | Deal | $5,000 | QB number blank |
| xl_bd_2025-09_2 | South Central Medical and Resource Center | 2025-09 | Deal | $4,000 | QB number blank |
| xl_mkt_2025-09_32 | W.J. Mangold Memorial | 2025-09 | Marketing | $6,600 | QB number blank |
| xl_mkt_2025-09_33 | Winn Community | 2025-09 | Marketing | $15 | QB number blank |
| xl_mkt_2025-09_34 | Winn Community | 2025-09 | Marketing | $15 | QB number blank |
| xl_bd_2025-10_4 | Community Health Center of NE OK | 2025-10 | Deal | $6,450 | QB number blank |
| xl_bd_2025-10_5 | Genesis PrimeCare | 2025-10 | Deal | $2,000 | QB number blank |
| xl_mkt_2025-10_38 | King's Daughters Medical Center | 2025-10 | Marketing | $12,500 | QB number blank |
| xl_mkt_2025-10_35 | Kittitas Valley Healthcare | 2025-10 | Marketing | $19,800 | QB number blank |
| xl_bd_2025-10_3 | South Plains Rural Health | 2025-10 | Deal | $5,000 | QB number blank |
| xl_pl_2025-10_2 | Southern Georgia Medical Center | 2025-10 | Placement | $19,000 | QB number blank |
| xl_bd_2025-10_2 | Texas Health Resources | 2025-10 | Deal | $6,000 | QB number blank |
| xl_mkt_2025-10_36 | Texas Health Resources | 2025-10 | Marketing | $15,000 | QB number blank |
| xl_mkt_2025-10_37 | Texas Health Resources | 2025-10 | Marketing | $15,000 | QB number blank |
| xl_mkt_2025-10_32 | W.J. Mangold Memorial | 2025-10 | Marketing | $6,600 | QB number blank |
| xl_mkt_2025-10_33 | Winn Community | 2025-10 | Marketing | $5,000 | QB number blank |
| xl_mkt_2025-10_34 | Winn Community | 2025-10 | Marketing | $5,000 | QB number blank |
| xl_pl_2025-11_2 | Advanced Heart & Vascular of NM | 2025-11 | Placement | $0 | QB number blank |
| xl_pl_2025-11_3 | Covenant House, INC | 2025-11 | Placement | $0 | QB number blank |
| xl_mkt_2025-11_34 | Kern Radiology | 2025-11 | Marketing | $10,000 | QB number blank |
| xl_bd_2025-11_4 | Midland Health | 2025-11 | Deal | $5,000 | QB number blank |
| xl_bd_2025-11_3 | Novant Health | 2025-11 | Deal | $5,000 | QB number blank |
| xl_pl_2025-11_4 | SCMRC, Oklahoma (1st 1/2 billing) | 2025-11 | Placement | $13,500 | QB number blank |
| xl_bd_2025-11_5 | South Central Medical and Resource Center | 2025-11 | Deal | $4,000 | QB number blank |
| xl_mkt_2025-11_32 | W.J. Mangold Memorial | 2025-11 | Marketing | $6,600 | QB number blank |
| xl_mkt_2025-11_33 | Woodland Heights / CHS | 2025-11 | Marketing | $15,000 | QB number blank |
| xl_bd_2025-11_2 | Woodland Heights Medical Center | 2025-11 | Deal | $3,000 | QB number blank |
| xl_bd_2025-12_2 | Genesis PrimeCare,  Marshall TX | 2025-12 | Deal | $2,000 | QB number blank |
| xl_mkt_2025-12_32 | Midland Health | 2025-12 | Marketing | $19,800 | QB number blank |
| xl_mkt_2025-12_33 | Midland Health | 2025-12 | Marketing | $19,800 | QB number blank |
| xl_pl_2025-12_3 | Nacogdoches County Hospital District | 2025-12 | Placement | $15,000 | QB number blank |
| xl_bd_2025-12_3 | Plains Memorial Hospital | 2025-12 | Deal | $5,000 | QB number blank |
| xl_pl_2025-12_2 | Plains Memorial Hospital | 2025-12 | Placement | $16,000 | QB number blank |

## Truly blank — tracker backfill

| Production row id | Client | Month | bookType | Amount | Label |
|---|---|---|---|---:|---|
| carri_CCM8412 | Midland Health | 1/26/26 | Deal | $14,000 | QB number blank |
| carri_FP8416 | Genesis PrimeCare Clinic/East Texas Border Health Clinic | 2012-12 | Deal | $6,000 | QB number blank |
| carri_GE6081 | Saint Francis Medical Center - Cape Girardeau | 2021-03 | Deal | $0 | QB number blank |
| carri_PNP7036 | CODAC Health, Recovery & Wellness, Inc. | 2021-06 | Deal | $0 | QB number blank |
| carri_FP8110 | Clinica De Salud Del Valle De Salinas | 2022-06 | Deal | $395 | QB number blank |
| carri_P5896 | Clinica De Salud Del Valle De Salinas | 2022-07 | Deal | $395 | QB number blank |
| carri_DDS8144 | Clinica De Salud Del Valle De Salinas | 2022-09 | Deal | $395 | QB number blank |
| carri_FP8146 | WWC Physicians PC | 2022-09 | Deal | $0 | QB number blank |
| carri_OBG8180 | Lutheran Health Network | 2023-02 | Deal | $0 | QB number blank |
| carri_P8191 | CODAC Health, Recovery & Wellness, Inc. | 2023-04 | Deal | $395 | QB number blank |
| carri_NP8224 | Clinica De Salud Del Valle De Salinas | 2023-09 | Deal | $395 | QB number blank |
| carri_NP8227 | Clinica De Salud Del Valle De Salinas | 2023-09 | Deal | $395 | QB number blank |
| carri_PA8226 | Clinica De Salud Del Valle De Salinas | 2023-09 | Deal | $395 | QB number blank |
| carri_NP8229 | Kittitas Valley Healthcare | 2023-09 | Deal | $395 | QB number blank |
| carri_D8244 | WWC Physicians PC | 2023-10 | Deal | $0 | QB number blank |
| carri_NP8250 | AmCare Medical Group | 2023-11 | Deal | $0 | QB number blank |
| carri_PNP7004 | CODAC Health, Recovery & Wellness, Inc. | 2023-12 | Deal | $395 | QB number blank |
| carri_RAD8256 | Kern Radiology Medical Group | 2024-01 | Deal | $395 | QB number blank |
| carri_APM8271 | Centennial Pain and Spine (Centennial Medical Group) | 2024-03 | Deal | $0 | QB number blank |
| carri_PA8228 | Clinica De Salud Del Valle De Salinas | 2024-05 | Deal | $395 | QB number blank |
| carri_GE8108 | Columbus Regional Health | 2024-08 | Deal | $0 | QB number blank |
| carri_HO8194 | Columbus Regional Health | 2024-08 | Deal | $0 | QB number blank |
| carri_FP8309 | Morongo Basin Healthcare District | 2024-08 | Deal | $395 | QB number blank |
| carri_ST8313 | Lawton Community Health Center | 2024-09 | Deal | $395 | QB number blank |
| carri_FP8205 | Southern Humboldt Community Healthcare District | 2024-09 | Deal | $395 | QB number blank |
| carri_OBG8316 | NeoHealth Business Office | 2024-10 | Deal | $2,395 | QB number blank |
| carri_GE8325 | Woodland Heights Medical Center | 2024-11 | Deal | $6,000 | QB number blank |
| carri_RTECH8343 | Reeves County Hospital District | 2025-03 | Deal | $5,000 | QB number blank |
| carri_IVC8349 | Riverview Regional Medical Center - AL | 2025-03 | Deal | $12,395 | QB number blank |
| carri_END8359 | WWC Physicians PC | 2025-04 | Deal | $11,200 | QB number blank |
| carri_OD8333 | Clinica De Salud Del Valle De Salinas | 2025-07 | Deal | $6,395 | QB number blank |
| carri_FP8306 | Kittitas Valley Healthcare | 2025-07 | Deal | $395 | QB number blank |
| carri_IVC8397 | Advanced Heart and Vascular Center of New Mexico | 2025-09 | Deal | $8,395 | QB number blank |
| carri_PA8395 | Ortho Plus | 2025-09 | Deal | $12,000 | QB number blank |
| carri_PT8396 | Ortho Plus | 2025-09 | Deal | $0 | QB number blank |
| carri_PD8403 | Genesis PrimeCare Clinic/East Texas Border Health Clinic | 2025-10 | Deal | $6,000 | QB number blank |
| carri_IVC8404 | Woodland Heights Medical Center | 2025-11 | Deal | $12,000 | QB number blank |
| carri_GE8339 | Ballad Health - Corporate | 2026-01 | Deal | $0 | QB number blank |
| carri_MO8338 | Ballad Health - Corporate | 2026-01 | Deal | $0 | QB number blank |
| carri_OBG8340 | Ballad Health - Corporate | 2026-01 | Deal | $0 | QB number blank |
| carri_FPOB8385 | Blue Mountain Hospital | 2026-01 | Deal | $12,395 | QB number blank |
| carri_OT8388 | Blue Mountain Hospital | 2026-01 | Deal | $0 | QB number blank |
| carri_PT8387 | Blue Mountain Hospital | 2026-01 | Deal | $395 | QB number blank |
| carri_ST8389 | Blue Mountain Hospital | 2026-01 | Deal | $395 | QB number blank |
| carri_RTECH8447 | Copper Queen Community Hospital | 2026-01 | Deal | $0 | QB number blank |
| carri_FP8436 | Indian Health Center of Santa Clara Valley | 2026-01 | Deal | $10,000 | QB number blank |
| carri_ACA8368 | King's Daughters Medical Center - Ashland | 2026-01 | Deal | $12,395 | QB number blank |
| carri_HO8370 | King's Daughters Medical Center - Ashland | 2026-01 | Deal | $395 | QB number blank |
| carri_IVC8369 | King's Daughters Medical Center - Ashland | 2026-01 | Deal | $395 | QB number blank |
| carri_OTO8371 | King's Daughters Medical Center - Ashland | 2026-01 | Deal | $395 | QB number blank |
| carri_GE8413 | Midland Health | 2026-01 | Deal | $0 | QB number blank |
| carri_N8411 | Midland Health | 2026-01 | Deal | $0 | QB number blank |
| carri_U8410 | Midland Health | 2026-01 | Deal | $4,000 | QB number blank |
| carri_GE8409 | Novant Health | 2026-01 | Deal | $0 | QB number blank |
| carri_N8347 | Riverview Regional Medical Center - AL | 2026-01 | Deal | $0 | QB number blank |
| carri_PUD8348 | Riverview Regional Medical Center - AL | 2026-01 | Deal | $0 | QB number blank |
| carri_RHU8345 | Riverview Regional Medical Center - AL | 2026-01 | Deal | $0 | QB number blank |
| carri_END8356 | South Georgia Medical Center | 2026-01 | Deal | $12,000 | QB number blank |
| carri_U8357 | South Georgia Medical Center | 2026-01 | Deal | $0 | QB number blank |
| carri_DDS8391 | Winn Community Health Center | 2026-01 | Deal | $395 | QB number blank |
| carri_OD8364 | Winn Community Health Center | 2026-01 | Deal | $12,395 | QB number blank |
| carri_RHU8365 | Winn Community Health Center | 2026-01 | Deal | $395 | QB number blank |
| carri_OBG8422 | Cullman Regional Medical Center | 2026-03 | Deal | $8,395 | QB number blank |
| carri_CD8438 | Concord Hospital | 2026-04 | Deal | $0 | QB number blank |
| carri_CD8439 | Concord Hospital | 2026-04 | Deal | $0 | QB number blank |
| carri_MO8435 | Concord Hospital | 2026-04 | Deal | $14,175 | QB number blank |
| carri_EM8433 | NMC Health | 2026-04 | Deal | $0 | QB number blank |
| carri_FP8431 | SOUTH CENTRAL MEDICAL AND RESOURCE CENTER | 2026-04 | Deal | $6,395 | QB number blank |
| carri_LCSW8445 | SOUTH CENTRAL MEDICAL AND RESOURCE CENTER | 2026-05 | Deal | $395 | QB number blank |
| carri_LPC8442 | SOUTH CENTRAL MEDICAL AND RESOURCE CENTER | 2026-05 | Deal | $395 | QB number blank |
| carri_LPC8443 | SOUTH CENTRAL MEDICAL AND RESOURCE CENTER | 2026-05 | Deal | $395 | QB number blank |
| carri_NP8441 | SOUTH CENTRAL MEDICAL AND RESOURCE CENTER | 2026-05 | Deal | $12,395 | QB number blank |
| carri_EM8446 | Bibb Medical Center | 2026-06 | Deal | $7,980 | QB number blank |
| carri_GS8453 | NMC Health | 2026-07 | Deal | $5,000 | QB number blank |
| carri_U8452 | NMC Health | 2026-07 | Deal | $5,000 | QB number blank |
| carri_PD8448 | Winn Community Health Center | 2026-07 | Deal | $8,395 | QB number blank |
| carri_FP8460 | Family Health Center of Southern Oklahoma | 2026-08 | Deal | $10,370 | QB number blank |
| carri_CVS8454 | Hendrick Medical Center | 2026-08 | Deal | $12,000 | QB number blank |
| carri_END8456 | Hendrick Medical Center | 2026-08 | Deal | $0 | QB number blank |
| carri_HO8458 | Hendrick Medical Center | 2026-08 | Deal | $0 | QB number blank |
| carri_OBG8455 | Hendrick Medical Center | 2026-08 | Deal | $0 | QB number blank |
| carri_RHU8457 | Hendrick Medical Center | 2026-08 | Deal | $0 | QB number blank |
| carri_FP8450 | Missouri Highlands Health Care | 2026-08 | Deal | $0 | QB number blank |
| carri_LCSW8451 | Missouri Highlands Health Care | 2026-08 | Deal | $0 | QB number blank |
| carri_MD8459 | Rogue Community Health | 2026-08 | Deal | $8,375 | QB number blank |
| carri_N8358 | South Georgia Medical Center | OFF HOL | Deal | $0 | QB number blank |

---
Generated from Soft seed + `CARRI_QB_APPLY_MAP` / `CARRI_QB_SPINE` / `SPINE_INVOICES`. Soft only. No GM include-gate flip. No Hub.
