# Kuis Network ARC

How to use:
1. Install [Node](https://nodejs.org/en/) >=12.x (preferably LTS yang sekarang) dan [MongoDB Community Server](https://www.mongodb.com/try/download/community).
2. Clone repository ini. 
3. Di command prompt/terminal, change directory ke folder yang udah di clone (pake `cd`, untuk windows bisa lihat [disini](https://www.digitalcitizen.life/command-prompt-how-use-basic-commands/)), terus ketik `npm install` dan enter.
3. Copy .env.example ke directory yang sama, tapi rename jadi .env. Isi `DB_URL` di .env (pake notepad juga bisa) dengan url databasenya (buat local, biasanya `mongodb://127.0.0.1:27017`).
4. Pastiin mongodbnya udah jalan (seharusnya setelah install bakal otomatis run).
5. Di command prompt/terminal sebelumnya, ketik `npm run start-dev` dan enter.
6. Selamat, web bisa diakses via `localhost:3000` dari browser :)

Development notes:
1. Untuk `routes`
- Silahkan lengkapi `questions.routes.js`, bisa lihat referensi/komentar yang sudah tersedia.
- **Kalian harus pake `Question` buat databasenya (e.g. `Question.create`, `Question.updateOne`, dkk)**
2. Untuk `views`
- Silahkan buat file view baru yang memenuhi di folder `views`.
- **Jangan mulai dari `<html>`,  tapi mulai dari DALAM `<body>` (ngga usah dibikin `<body>`-nya lagi)**. Selalu include `<% layout('layout') %>` di awal file. Silahkan lihat template.ejs buat referensi.
- Views udah bisa pakai [Bootstrap](https://getbootstrap.com/docs/4.6) dan [jQuery](https://api.jquery.com/) **Slim** (module `ajax` sama `effect` ngga ada, pake `fetch` aja buat pengganti `ajax`). Beberapa fitur bootstrap mungkin gabisa dijalanin karena ngga ada `popper` (e.g. toast), tapi mostly should work.
- Untuk field buat form, bisa pake `include('form', options)` dimana options merupakan javascript object berupa:
  - `label`: Label untuk fieldnya
  - `name`: Nama fieldnya di database (lihat `question.model.js`)
  - `value`: Initial value buat field (berguna buat edit)
  - `required`: Fieldnya wajib diisi apa ngga?
  - `readonly`: Fieldnya bisa diubah ngga?
  - `tooltip`: Deskripsi/info khusus buat fieldnya
  - `type`: Tipe fieldnya (bisa `text`, `number`, `textarea`, dkk)
  - `rows`: (Optional, cuma untuk type `textarea`) Panjang baris `textarea`
- Untuk submit, bisa manfaatin `form.js`, terutama buat form update/create, tapi jangan lupa include `<script src="/form.js"></script>` sebelum tag `<script>` kalian. Fungsi yang bisa dipakai dari `form.js`:
  - `setFormProcess(form, action, method, onSuccess?)`
    - `form`: Form yang dipake buat submit
    - `action`: Endpoint buat server
    - `method`: Method yang dipakai (`POST`, `PUT`, `DELETE`, ato apa)
    - `onSuccess`: (Optional) Kalau form berhasil diproses, ntar bakal jalanin ini.

## SELAMAT MENGERJAKAN1!1!! :D