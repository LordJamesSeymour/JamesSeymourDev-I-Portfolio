# Cursor.zip vaporwave — statue assets

The statue cutouts on the Cursor.zip project page are derived from
**public-domain / CC0** photographs from open-access museum collections — the
**SMK (Statens Museum for Kunst / National Gallery of Denmark)** and **The Met
Open Access**. All are free for any use; no attribution is required. Credits are
listed here anyway, as good practice.

Each PNG is a locally-produced transparent cutout (the dark studio background
was keyed out and any museum mount/plinth cropped). The original source photos
and the cutout script live in `scripts/cursor-vaporwave-statues/` (not shipped
with the site).

| File | Subject | Source | Date | License |
|------|---------|--------|------|---------|
| `statue-left.png` | **Head of Michelangelo's _David_** (plaster cast bust) | SMK, accession KAS2232 — https://commons.wikimedia.org/wiki/File:Michelangelo_Buonarroti,_Hoved_fra_statuen_af_David,_,_KAS2232,_Statens_Museum_for_Kunst.jpg | after Michelangelo (orig. 1501–1504) | Public Domain (SMK Open Access) |
| `statue-right.png` | Marble portrait of the co-emperor Lucius Verus (Roman) | The Met, object 248783 — https://www.metmuseum.org/art/collection/search/248783 | ca. 161–169 CE | CC0 1.0 (Public Domain) |
| `statue-fragment.png` | Marble portrait bust of a woman, veiled (Roman) | The Met, object 253055 — https://www.metmuseum.org/art/collection/search/253055 | ca. 193–211 CE | CC0 1.0 (Public Domain) |

`statue-left.png` source: Statens Museum for Kunst, released **Public Domain**
([SMK Open Access](https://www.smk.dk/en/article/smk-open/)), via Wikimedia
Commons. `statue-right.png` / `statue-fragment.png` sources: © The Metropolitan
Museum of Art, under
[CC0 1.0 / Open Access](https://www.metmuseum.org/about-the-met/policies-and-documents/open-access).

## Replacing a statue later

1. Drop a new source image (any dark-background sculpture photo) into
   `scripts/cursor-vaporwave-statues/`.
2. Add or edit its entry in `JOBS` inside `make_cutouts.py` (filename, output
   name, flood threshold, and how much of the top to keep).
3. Run `python scripts/cursor-vaporwave-statues/make_cutouts.py` to regenerate
   the transparent PNG(s) in this folder.
4. If you already have a clean transparent PNG, just drop it in here using the
   same filename — no script needed.

Keep new sources **public-domain / CC0** (The Met Open Access, Wikimedia Commons
PD, or other open-access museum collections) and update the table above.
