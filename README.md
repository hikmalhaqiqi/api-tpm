# Aplikasi Silsilah Keluarga (Family Tree)

Aplikasi web ini memungkinkan pengguna untuk membuat, mengelola, dan memvisualisasikan silsilah keluarga mereka secara digital. Pengguna dapat melakukan registrasi, login, menambahkan anggota keluarga, mendefinisikan hubungan (khususnya pasangan dan orang tua), serta mengunggah foto untuk setiap anggota keluarga.

## Fitur Utama

* **Autentikasi Pengguna:** Registrasi, Login, dan Logout aman menggunakan JWT (JSON Web Tokens).
* **Visualisasi Pohon Keluarga:** Tampilan interaktif silsilah keluarga menggunakan library FamilyTreeJS.
* **Manajemen Anggota Keluarga (CRUD):** Tambah, Lihat, Edit, dan Hapus data anggota keluarga.
* **Upload Foto:** Pengguna dapat mengunggah foto untuk setiap anggota keluarga, yang disimpan di Google Cloud Storage.
* **Manajemen Relasi:**
    * Definisi hubungan orang tua (Ayah/Ibu - `fid`/`mid`).
    * Definisi hubungan pasangan (Suami/Istri - `pids`).
* **Manajemen Sesi:** Access token dengan durasi pendek dan refresh token (disimpan di HttpOnly cookie) untuk sesi yang persisten dan aman.
* **Deployment Cloud:** Dideploy sepenuhnya di Google Cloud Platform (App Engine untuk Frontend, Cloud Run untuk Backend, Cloud Build untuk CI/CD).

## Tech Stack

**Frontend:**
* HTML5
* CSS3 (Styling dengan Bulma) [cite: fam2/fe/index.html, fam2/fe/register.html]
* JavaScript (ES6+)
* jQuery & Axios (untuk AJAX dan utilitas) [cite: fam2/fe/script.js]
* FamilyTreeJS (oleh BalkanGraph) untuk visualisasi pohon keluarga [cite: fam2/fe/familytree.js, fam2/fe/script.js]

**Backend:**
* Node.js [cite: fam2/be/package.json]
* Express.js (Framework web) [cite: fam2/be/package.json, fam2/be/index.js]
* Sequelize ORM (Interaksi dengan database MySQL) [cite: fam2/be/package.json, fam2/be/config/db.js]
* JSON Web Token (`jsonwebtoken`) untuk autentikasi [cite: fam2/be/package.json, fam2/be/controllers/UserController.js]
* `bcrypt` untuk hashing password [cite: fam2/be/package.json, fam2/be/controllers/UserController.js]
* `multer` untuk menangani unggahan file (foto) [cite: fam2/be/package.json, fam2/be/controllers/famillyController.js]
* `@google-cloud/storage` untuk integrasi dengan Google Cloud Storage [cite: fam2/be/package.json, fam2/be/controllers/famillyController.js]
* Middleware: `cors`, `cookie-parser`, `dotenv` [cite: fam2/be/package.json]

**Database:**
* MySQL [cite: fam2/be/config/db.js]

**Layanan Cloud & Deployment:**
* Google Cloud Platform (GCP)
* Google App Engine: Hosting frontend statis (Service ID: `fe-077`) [cite: fam2/fe/app.yaml, fam2/cloudbuild.frontend.yaml]
* Google Cloud Run: Hosting backend API ter-container (Service ID: `fam07`) [cite: fam2/cloudbuild.backend.yaml]
* Google Container Registry (GCR): Penyimpanan Docker image backend. [cite: fam2/cloudbuild.backend.yaml]
* Google Cloud Storage:
    * Penyimpanan file `.env` untuk backend (diambil saat build). [cite: fam2/cloudbuild.backend.yaml]
    * Penyimpanan foto anggota keluarga (bucket: `tugas-7`). [cite: fam2/be/controllers/famillyController.js]
* Google Cloud Build: Otomatisasi proses build dan deployment (CI/CD). [cite: fam2/cloudbuild.backend.yaml, fam2/cloudbuild.frontend.yaml]

## Struktur Proyek

/├── be/                     # Backend (Node.js/Express)
│   ├── config/             # Konfigurasi (database)
│   ├── controllers/        # Logika bisnis dan request handling
│   ├── middleware/         # Middleware Express (mis: VerifyToken)│   ├── model/              # Model data Sequelize & asosiasi│   ├── routes/             # Definisi rute API
│   ├── index.js            # Entry point backend
│   └── package.json        # Dependensi backend
├── fe/                     # Frontend (HTML, JS, CSS)
│   ├── index.html          # Halaman Login
│   ├── register.html       # Halaman Registrasi
│   ├── tree.html           # Halaman utama pohon keluarga
│   ├── script.js           # Logika JavaScript utama frontend│   ├── familytree.js       # Library FamilyTreeJS
│   └── app.yaml            # Konfigurasi deployment App Engine
├── cloudbuild.backend.yaml # Konfigurasi Cloud Build untuk backend
├── cloudbuild.frontend.yaml# Konfigurasi Cloud Build untuk frontend
└── package.json            # Dependensi level root (minimal)
## Setup dan Instalasi Lokal

### Prasyarat
* Node.js (v14 atau lebih tinggi direkomendasikan)
* npm (biasanya terinstal bersama Node.js)
* Server MySQL yang sedang berjalan
* Google Cloud SDK (gcloud CLI) - Opsional untuk deployment lokal, tapi dibutuhkan untuk deployment ke GCP.

### Backend (`be/` direktori)
1.  Navigasi ke direktori `be/`.
2.  Buat file `.env` di dalam direktori `be/` dan isi dengan variabel lingkungan yang dibutuhkan:
    ```dotenv
    DB_HOST=localhost
    DB_USERNAME=username_db_anda
    DB_PASSWORD=password_db_anda
    DB_NAME=nama_database_anda
    ACCESS_TOKEN_SECRET=rahasia_access_token_anda
    REFRESH_TOKEN_SECRET=rahasia_refresh_token_anda
    PORT=3000 # Opsional, default ke 3000
    # Untuk Google Cloud Storage (jika tidak menggunakan ADC atau service account di GCP env):
    # GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-file.json
    # GCLOUD_PROJECT=your-gcp-project-id
    ```
    * **Catatan:** Untuk GCS, kode saat ini memiliki `projectId: 'noted-cider-459904-e7'` yang di-hardcode dan `keyFilename` yang dikomentari di `be/controllers/famillyController.js` [cite: fam2/be/controllers/famillyController.js]. Jika menjalankan lokal di luar GCP, Anda mungkin perlu menyediakan kredensial.
3.  Instal dependensi:
    ```bash
    npm install
    ```
4.  Pastikan database MySQL sudah dibuat dan skema tabel akan disinkronkan oleh Sequelize saat server pertama kali dijalankan (`db.sync({ alter: true })` di `be/model/index.js`). [cite: fam2/be/model/index.js]

### Frontend (`fe/` direktori)
1.  Frontend terdiri dari file statis.
2.  Untuk pengembangan lokal, buka `fe/index.html` langsung di browser Anda.
3.  **PENTING:** Ubah variabel `BASE_URL` di `fe/script.js` agar menunjuk ke alamat backend lokal Anda (misalnya, `const BASE_URL = 'http://localhost:3000';`). Saat ini, URL tersebut di-hardcode ke layanan Cloud Run yang sudah di-deploy. [cite: fam2/fe/script.js]
    ```javascript
    // fe/script.js - ubah baris ini untuk pengembangan lokal
    // const BASE_URL = '[https://fam-1057648600827.us-central1.run.app](https://fam-1057648600827.us-central1.run.app)';
    const BASE_URL = 'http://localhost:3000'; // Contoh untuk lokal
    ```

## Menjalankan Aplikasi (Lokal)

### Backend
1.  Navigasi ke direktori `be/`.
2.  Jalankan server backend:
    ```bash
    npm start
    ```
    Server akan berjalan di `http://localhost:3000` (atau port yang Anda tentukan di `.env`). [cite: fam2/be/package.json, fam2/be/index.js]

### Frontend
1.  Setelah backend berjalan dan Anda telah mengubah `BASE_URL` di `fe/script.js`, buka file `fe/index.html` di browser Anda.

## API Endpoints Utama

Berikut adalah beberapa endpoint API utama yang disediakan oleh backend:

* `POST /api/login`: Login pengguna. [cite: fam2/be/routes/userRoutes.js]
* `POST /api/users`: Registrasi pengguna baru. [cite: fam2/be/routes/userRoutes.js]
* `DELETE /api/logout`: Logout pengguna. [cite: fam2/be/routes/userRoutes.js]
* `GET /api/token`: Memperbarui access token. [cite: fam2/be/routes/userRoutes.js]
* `GET /api/family`: Mengambil data keluarga pengguna (memerlukan autentikasi). [cite: fam2/be/routes/famillyRoutes.js]
* `POST /api/family`: Menambah anggota keluarga baru (memerlukan autentikasi). [cite: fam2/be/routes/famillyRoutes.js]
* `PUT /api/family/:id`: Memperbarui data anggota keluarga (memerlukan autentikasi). [cite: fam2/be/routes/famillyRoutes.js]
* `DELETE /api/family/:id`: Menghapus anggota keluarga (memerlukan autentikasi). [cite: fam2/be/routes/famillyRoutes.js]
* `POST /api/upload-photo`: Mengunggah foto anggota keluarga (memerlukan autentikasi). [cite: fam2/be/routes/famillyRoutes.js]

*Semua endpoint yang memerlukan autentikasi dilindungi oleh middleware `verifyToken`.* [cite: fam2/be/routes/famillyRoutes.js, fam2/be/routes/userRoutes.js]

## Deployment ke Google Cloud Platform

Aplikasi ini dikonfigurasi untuk deployment otomatis menggunakan Google Cloud Build.

### Backend (Cloud Run)
* Konfigurasi build ada di `cloudbuild.backend.yaml`. [cite: fam2/cloudbuild.backend.yaml]
* Proses:
    1.  Mengambil file `.env` dari Google Cloud Storage.
    2.  Membangun Docker image dari direktori `be/`.
    3.  Mendorong image ke Google Container Registry (GCR).
    4.  Men-deploy image ke layanan Google Cloud Run bernama `fam07` di region `us-central1`.

### Frontend (App Engine)
* Konfigurasi build ada di `cloudbuild.frontend.yaml`. [cite: fam2/cloudbuild.frontend.yaml]
* Konfigurasi App Engine ada di `fe/app.yaml`. [cite: fam2/fe/app.yaml]
* Proses: Men-deploy file statis dari direktori `fe/` ke layanan Google App Engine bernama `fe-077`.

### Catatan Google Cloud Storage
* Backend menggunakan bucket GCS bernama `tugas-7` untuk menyimpan foto yang diunggah. [cite: fam2/be/controllers/famillyController.js] Pastikan bucket ini ada dan memiliki izin yang sesuai (misalnya, membuat objek dapat diakses publik untuk ditampilkan di frontend).

---