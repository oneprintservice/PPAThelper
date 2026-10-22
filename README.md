# OnePrint Repair Rush — Prototype v0.2

Standalone HTML/CSS/JavaScript prototype. Open `index.html` in a modern browser. No build step, server, Firebase, WebPOS, or printer integration.

## Included in v0.2
- Choose one of three BYTE starter specializations: VOLT, AEGIS, NEXUS.
- Manual skill selection and animated battle effects.
- Four active skill slots; new skills unlock every 5 levels. If slots are full, a prompt offers to replace an old skill.
- Energy recovery after battle: set to 70% of maximum after a win and 40% after a loss. Rest is available at 0 energy and restores energy/HP fully.
- HP recovers 50% of maximum after each battle, plus gradual regeneration over time.
- Gear Scrap replaces generic components and is spent crafting upgrade items.
- Local save, JSON export/import, and local reset.
- Dummy service monsters only. Status `Selesai/Diambil` guarantees win; `Cancel` cannot be defeated; other statuses use a random 50–90% outcome chance.
- Quick mode: 5 minutes then 30-minute cooldown. Relax mode: local device time windows 12:00–13:00 and 23:00–00:00.

## Notes
- Battle, balancing, animations and progression are still an early prototype; test on the target Android browser.
- Save data from v0.1 is not automatically migrated; this version uses a separate localStorage key.
- Sprite characters currently use emoji placeholders with CSS battle effects, not final pixel-art sprites.
