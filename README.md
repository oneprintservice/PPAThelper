# PWA Ukur Bidang — prototipe awal

Fitur: identitas pekerjaan, GPS berkelanjutan, foto patok dengan ID otomatis, catatan, panjang sisi manual, pilihan titik sudut, sketsa GPS, estimasi luas/keliling, laporan siap cetak/simpan PDF, ekspor/impor JSON.

## Menjalankan
Unggah isi folder ke hosting HTTPS (mis. GitHub Pages atau Cloudflare Pages), buka di Chrome Android, beri izin lokasi dan kamera, lalu tambahkan ke layar utama jika diperlukan. GPS dan service worker tidak bekerja penuh saat membuka file lokal `file://`.

## Batasan penting
- Prototipe belum diuji lapangan dan belum untuk penetapan batas resmi.
- Data disimpan di localStorage; foto dikompres tetapi kapasitas tetap terbatas. Ekspor cadangan rutin. Tahap berikutnya sebaiknya migrasi ke IndexedDB.
- Sketsa dan luas menggunakan koordinat GPS HP sebagai estimasi; panjang meteran dicatat terpisah dan belum digunakan untuk mengoreksi geometri.
- Belum ada citra satelit, cache peta offline, input koordinat survei, diagonal/bearing/offset, koreksi geometri, sinkronisasi Drive, atau mesin PDF langsung. PDF menggunakan menu cetak browser.
- Uji pada bidang sederhana yang hasilnya diketahui sebelum dipakai rutin. Jangan gunakan hasil GPS sebagai satu-satunya dasar penetapan batas.
