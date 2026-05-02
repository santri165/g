# Tugas Praktik 1 - Front-End SITTA Universitas Terbuka

Repositori ini berisi *source code* untuk **Tugas Praktik 1**, yaitu perancangan antarmuka aplikasi pemesanan bahan ajar **SITTA** (Sistem Informasi Tiras dan Transaksi Bahan Ajar) Universitas Terbuka yang dikembangkan oleh UT-Daerah.

Fokus pengembangan pada tahap ini murni di sisi **Front-End** menggunakan HTML semantik, CSS (dengan prinsip *modern UI/UX* dan *glassmorphism*), serta manipulasi DOM Javascript yang interaktif, tanpa menggunakan integrasi *Back-End* atau *Database* sungguhan.

## 🚀 Fitur Utama

Aplikasi ini terdiri dari 4 halaman utama:
1. **Halaman Login (`login.html`)**
   - Form otentikasi interaktif.
   - Pengecekan validasi data dengan array *dummy* di Javascript.
   - Menampilkan *Custom Alert* (bukan alert bawaan browser) jika login gagal atau berhasil.
   - *Modal Box* (Pop-up) untuk fitur "Lupa Password" dan "Daftar Akun".

2. **Dashboard Utama (`dashboard.html`)**
   - Menampilkan salam (*Greeting*) dinamis berdasarkan waktu lokal (Pagi/Siang/Sore).
   - Menampilkan nama akun pengguna yang sedang login menggunakan *Session Storage*.
   - Tata letak responsif (*Sidebar* & *Widget Card*).

3. **Tracking Pengiriman (`tracking.html`)**
   - Pencarian berdasarkan **Nomor Delivery Order (DO)**.
   - Mengubah UI secara dinamis menggunakan JS DOM ketika nomor DO ditemukan.
   - Menampilkan riwayat perjalanan pengiriman bahan ajar dalam bentuk visual *Timeline* yang rapi.

4. **Informasi Stok Bahan Ajar (`stok.html`)**
   - Menampilkan tabel data stok secara dinamis dari file data dummy (`js/data.js`).
   - Terdapat fitur tambah data bahan ajar baru (via *Modal Box*) yang langsung memperbarui tabel secara seketika (*real-time*) tanpa perlu me-*refresh* halaman.

## 💻 Teknologi yang Digunakan
- **HTML5:** Struktur dokumen semantik dan valid.
- **CSS3:** *Styling* premium, variabel CSS, *responsive design*, dan animasi transisi.
- **Vanilla Javascript (ES6):** Manipulasi DOM (`document.createElement`, manipulasi kelas), *Event Listeners*, perulangan array data, dan penyimpanan state sementara dengan *Session Storage*.

## 📂 Struktur File
```text
📦 tugasjayy
 ┣ 📂 asset
 ┃ ┗ 📂 img             # Gambar cover buku
 ┣ 📂 css
 ┃ ┗ 📜 style.css       # File stylesheet utama
 ┣ 📂 js
 ┃ ┣ 📜 data.js         # Dummy database (Pengguna, Bahan Ajar, Tracking)
 ┃ ┗ 📜 main.js         # Logika interaktif Javascript (DOM, Validasi, dll)
 ┣ 📜 index.html        # Redirect ke halaman login
 ┣ 📜 login.html        # Halaman Login
 ┣ 📜 dashboard.html    # Halaman Dashboard Utama
 ┣ 📜 tracking.html     # Halaman Tracking DO
 ┣ 📜 stok.html         # Halaman Tabel Stok
 ┗ 📜 README.md         # Dokumentasi Repositori
```

## 🛠️ Cara Menjalankan Aplikasi
1. Lakukan *Clone* atau *Download ZIP* repositori ini.
2. Ekstrak folder ke komputer Anda.
3. Buka file **`index.html`** atau **`login.html`** menggunakan Web Browser modern (seperti Google Chrome, Mozilla Firefox, atau Microsoft Edge). Anda tidak perlu menjalankan server lokal, namun jika menggunakan VS Code, *ekstensi Live Server* sangat direkomendasikan.
4. Gunakan kredensial berikut untuk menguji coba masuk ke aplikasi:
   - **Email:** `admin@ut.ac.id`
   - **Password:** `admin123`
5. Untuk menguji coba fitur **Tracking**, masuk ke halaman Tracking Pengiriman dan masukkan nomor DO berikut: `2023001234` atau `2023005678`.

---
*Proyek ini merupakan bagian dari evaluasi pemahaman fundamental Front-End Web Development.*
"# jokii" 
