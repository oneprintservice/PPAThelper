# OnePrint Repair Rush — Prototype v0.3.2

Standalone HTML/CSS/JavaScript game prototype. No Firebase, no WebPOS integration, no printer integration.

## Run
Extract the ZIP and open `index.html` in a modern browser. Progress is saved in localStorage on that device/browser. Use Export Save for a portable JSON backup.

## Implemented in v0.3.2
- Summon one of three BYTE starter forms: VOLT (attack/critical), AEGIS (defense), NEXUS (energy efficiency).
- Manual turn-based skill selection and CSS pixel-art humanoid robot sprites.
- Enemy level and stats scale with BYTE level; transaction status remains dummy battle outcome modifier.
- Battle rewards coins and Gear Scrap. Gear Scrap can be sold for coins.
- Five craft categories: Weapon (+ATK), Armor (+DEF), Power Coil (+ATK/+DEF), Energy Cell (skill energy efficiency), Repair Kit (consumable HP + energy recovery).
- Crafted gear can be equipped, sold, and upgraded using coins; gear level increases its bonus.
- Individual coin upgrades for BYTE ATK, DEF, max HP, and energy efficiency.
- HP does not auto-heal after battle. HP does not regenerate passively; Repair Kit or Rest can restore it. Energy is not restored after battle; use Repair Kit or Rest when energy reaches zero.
- Local save export/import/reset, Mode Kilat and Mode Santai windows.

## Notes
- All service transaction names and statuses are fictional dummy data.
- This is an early prototype. Visuals are CSS pixel-art approximations, not final sprite sheets. Please test battle balance and save persistence in the target Android browser.


Perbaikan v0.3.2: ikon pixel BYTE ditampilkan di kartu starter; musuh memiliki variasi siluet/warna; countdown mode diperbarui tiap detik; battle berlangsung sampai HP BYTE atau musuh mencapai 0; kategori estimasi kesulitan mudah 90–100%, menengah 31–89%, sulit 10–30%. Persentase adalah estimasi tingkat kesulitan, bukan pemutus hasil acak battle.
