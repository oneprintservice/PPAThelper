# OnePrint Repair Rush — Prototype v0.1

Prototipe mandiri dengan data servis dummy. Tidak terhubung ke Firebase, transaksi, inventori bisnis, atau printer.

## Cara mencoba
Ekstrak ZIP dan buka `index.html` di browser modern. Pilih TT dummy, mulai Mode Kilat atau Mode Santai, lalu jalankan auto-battle dan upgrade alat. Jika browser membatasi localStorage untuk file://, jalankan melalui server statis lokal atau preview terpisah.

## Aturan
- Mode Kilat 5 menit, lalu cooldown 30 menit.
- Mode Santai bebas selama 12.00–13.00 dan 23.00–00.00 waktu lokal; berakhir saat jendela tutup.
- Cooldown Mode Kilat tidak memblokir Mode Santai.
- Selesai/diambil: menang 100%; status aktif: acak merata 50–90%; cancel: menang 0%.
- Save lokal dengan key oneprint_repair_rush_save_v1; tersedia ekspor/impor JSON.
- Jam mengikuti perangkat dan bukan anti-cheat. Data servis adalah dummy.
