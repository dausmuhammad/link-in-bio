# LinkSpace

Phase 1 — fondasi dan UI interaktif. Next.js App Router, React, **JavaScript saja**, Tailwind CSS, komponen Button bergaya shadcn/ui (Radix Slot + CVA), Lucide, Motion, React Hook Form + Zod, dan dnd-kit. Recharts sudah disiapkan untuk Phase 3; belum ada grafik analytics palsu.

## Menjalankan

Node.js 24 LTS (diverifikasi dengan 24.22.1), npm 11.

```sh
npm ci
npm run dev
```

Build produksi: `npm run build`, lalu `npm run start`. Port default 3000. Font Geist dimuat lokal melalui `next/font/local` dari dependency `geist`, sehingga build tidak memerlukan Google Fonts.

```sh
npm run lint
npm run build
# Jika Chromium sistem tersedia:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
# Alternatif: npx playwright install chromium, lalu npm test.
```

Playwright menyalakan server produksi secara otomatis; build terlebih dahulu. Browser download memerlukan izin domain CDN Playwright, tetapi Chromium sistem tidak memerlukannya.

## Halaman dan perilaku

- `/`: landing, galeri enam tema, fitur, cara kerja, FAQ.
- `/login`, `/signup`: form email tervalidasi; **tidak mengirim email, membuat akun, atau sesi**.
- `/dashboard`: workspace demo publik, filter periode, analytics kosong yang jujur.
- `/dashboard/builder`: Profile, Links, Socials, Appearance, Settings; preview langsung; tambah/edit/hapus/toggle link; pengurutan drag atau keyboard (Space, panah, Space); tema, bentuk tombol, warna dekorasi; penyimpanan draft lokal dengan status perubahan.
- `/alexrivera`: contoh profil tetap dari data demo; bukan hasil publikasi draft browser. Username lain mengembalikan 404.
- `/pricing`: rencana Free/Pro, tanpa checkout atau pembayaran.

Builder mobile menggunakan tab Edit/Preview. Tema terang/gelap antarmuka disimpan terpisah di browser. Link hanya menerima HTTP/HTTPS. Penyimpanan gagal menampilkan pesan dan tidak mengklaim berhasil. Peringatan navigasi menjaga perubahan yang belum disimpan untuk klik tautan aplikasi dan penutupan/reload halaman; tombol Back/Forward browser pada navigasi SPA belum mendapat dialog khusus. Draft tidak tersinkron antarperangkat. Jangan masukkan informasi sensitif ke demo.

## Struktur

- `src/app`: route, metadata, layout, loading/error/not-found.
- `src/components/ui`: primitive UI; `components.json` menggunakan JavaScript.
- `src/components`: shell, brand, form auth, renderer profil publik.
- `src/features/builder`: state dan interaksi editor lokal.
- `src/lib`: data contoh, tema, helper URL, class utility.
- `tests`: alur browser dan responsivitas 375/390/768/1024/1440px.

Design tokens di `globals.css`: violet, slate, radius 12–20px, input 16px, focus terlihat, mode terang/gelap, reduced motion, navigasi mobile dengan safe-area. Halaman marketing dan publik memakai Server Components; hanya interaksi yang menjadi Client Components.

## Batas fase

Belum ada PostgreSQL/Prisma, Auth.js, otorisasi, upload, publikasi, tracking, atau billing. Dashboard tidak dilindungi karena secara eksplisit merupakan demo tanpa akun. Phase 2 harus menambahkan sesi database, kepemilikan server-side, migrasi, validasi server, storage object, dan publishing; jangan membawa localStorage ini sebagai database produksi. File `.env.example` berisi nama variabel yang direncanakan; Phase 1 tidak memerlukan secret.

Sesuai `LINKSPACE_CODEX_PROMPT.md`, Phase 2 menunggu persetujuan pemilik proyek.
