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


## Modul eksperimen kamera AR
Versi ini menambahkan modul WebXR AR eksperimental untuk mencoba menandai dua permukaan dan menghitung jarak 3D antara keduanya. Tidak semua browser/perangkat mendukung WebXR AR + hit-test. Jalankan melalui HTTPS di Chrome Android; jika fitur tidak tersedia, gunakan input ukuran manual.

Penting:
- Hasil AR bukan alat ukur legal dan harus dibandingkan dengan meteran.
- Uji dahulu pada jarak pendek yang sudah diketahui (misalnya 1 m, 2 m, 3 m).
- Jika sesi AR gagal, itu tidak berarti seluruh PWA gagal; fitur GPS, foto, sketsa, laporan, dan ekspor tetap terpisah.
- Versi ini masih eksperimen teknis. Jangan gunakan hasil AR sebagai ukuran final bidang tanah.
