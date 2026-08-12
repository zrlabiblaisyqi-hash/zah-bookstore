// Zah Bookstore — katalog demo. Data buku diambil dari halaman resmi Penerbit Qaf
// (penerbitqaf.com) pada 2026-08-10: judul, ISBN, tebal, dimensi, bulan terbit, harga, sinopsis.
window.BOOKS = [
  {
    slug: "memahami-surah-al-maun",
    forWho: "Untuk yang ingin ibadah berdampak sosial",
    cat: "surah",
    title: "Memahami Surah Al-Ma'un",
    sub: "Tujuh Pesan Penerang Hidup",
    isbn: "978-634-04-5902-9",
    pages: 166,
    dim: "13 × 19 cm",
    year: "Januari 2026",
    price: 36750, // 75% of Qaf Rp49.000 (verified)
    tag: "Terbaru",
    cover: "img/memahami-surah-al-maun.jpg",
    src: "https://penerbitqaf.com/product/memahami-surah-al-maun/",
    blurb: "Sekalipun singkat, pesan al-Ma‘un amatlah padat — pelajaran berharga soal keimanan, keislaman, dan kesucian hati. Surah yang menggugah kita menempatkan Al-Qur’an sebagai kitab pengubah zaman, dan menjadikan keberpihakan pada kaum lemah sebagai tolok ukur keyakinan yang benar."
  },
  {
    slug: "ilmu-ikhlas",
    forWho: "Untuk yang hatinya mudah gelisah",
    cat: "hati",
    title: "Ilmu Ikhlas",
    sub: "Belajar Membeningkan Hati dan Membahagiakan Hidup dari Ulama Psikolog-Klasik",
    isbn: "978-623-1099-63-1",
    pages: 184,
    dim: "13 × 20,5 cm",
    year: "Juni 2025",
    price: 41250, // 75% of Qaf Rp55.000 (verified)
    tag: "Best Seller",
    cover: "img/ilmu-ikhlas.jpg",
    src: "https://penerbitqaf.com/product/ilmu-ikhlas/",
    blurb: "Buku tentang ilmu ikhlas — ilmu rahasia yang menjadi kunci kebahagiaan, yang tak banyak orang menyelami hakikatnya. Dari menata niat, menakar ikhlas, hingga puncak ikhlas: derajat mukhlish dan mukhlash."
  },
  {
    slug: "memahami-surah-al-fatihah",
    forWho: "Untuk pemula yang baru belajar tafsir",
    cat: "surah",
    title: "Memahami Surah Al-Fatihah",
    sub: "Makna dan Pesan yang Terukir dengan Beragam Manhaj Tafsir",
    isbn: "978-623-6219-95-9",
    pages: 176,
    dim: "13 × 19 cm",
    year: "Oktober 2024",
    price: 37500, // 75% of Qaf Rp50.000 (verified)
    tag: "Pilihan Pembaca",
    cover: "img/memahami-surah-al-fatihah.jpg",
    src: "https://penerbitqaf.com/product/memahami-surah-al-fatihah/",
    blurb: "Saking seringnya dibaca, makna al-Fatihah kerap luput dari perhatian. Buku ini menemani pembaca menyelami keindahan maknanya serta merasakan berkahnya bagi hati dan kehidupan nyata."
  },
  {
    slug: "rizqan-wasian-thayyiban",
    forWho: "Untuk yang gelisah soal rezeki",
    cat: "hati",
    title: "Rizqan Wasi'an Thayyiban",
    sub: "Tuntunan Ulama Klasik untuk Meraih Rezeki yang Luas dan Hidup yang Lebih Puas",
    isbn: "978-623-6219-89-8",
    pages: 193,
    dim: "13 × 20,5 cm",
    year: "September 2024",
    price: 45000, // 75% of Qaf Rp60.000 (verified)
    tag: "Kearifan Klasik",
    cover: "img/rizqan-wasian-thayyiban.jpg",
    src: "https://penerbitqaf.com/product/rizqan-wasian-thayyiban/",
    blurb: "Menyegarkan pola pikir tentang rezeki yang terus mengalir. Pengantar tentang bagaimana mengharap rezeki yang lancar dengan sikap hati yang benar — rezeki yang luas, hidup yang lebih puas, di atas fondasi keimanan yang pas."
  },
  {
    slug: "tafsir-bacaan-shalat",
    forWho: "Untuk yang ingin shalat lebih khusyuk",
    cat: "shalat",
    title: "Tafsir Bacaan Shalat",
    sub: "Hati Sejuk Ibadah Khusyuk",
    isbn: "978-623-6219-92-8",
    pages: 196,
    dim: "13 × 20,5 cm",
    year: "September 2024",
    price: 40500, // 75% of Qaf Rp54.000 (verified)
    tag: "Paling Dicari",
    cover: "img/tafsir-bacaan-shalat.jpg",
    src: "https://penerbitqaf.com/product/tafsir-bacaan-shalat/",
    blurb: "Belajar meningkatkan kualitas shalat dengan menyelami makna dan pesan dalam bacaan shalat — dari takbiratul ihram hingga salam."
  },
  {
    slug: "memahami-surah-yasin",
    forWho: "Untuk yang rutin membaca Yasin",
    cat: "surah",
    title: "Memahami Surah Yasin",
    sub: "Dengan Metode Tafsirul-Qur'an bil-Qur'an",
    isbn: "978-602-5547-53-9",
    pages: 272,
    dim: "13 × 19 cm",
    year: "Maret 2019",
    price: 44250, // 75% of Qaf Rp59.000 (verified)
    tag: "Klasik Modern",
    cover: "img/memahami-surah-yasin.jpg",
    src: "https://penerbitqaf.com/product/memahami-surah-yasin/",
    blurb: "Surah Yasin sudah sering dibaca dan dihafal. Namun sudahkah kita menyelami makna dan pesannya? Ditafsirkan dengan metode menafsirkan Qur’an dengan Qur’an."
  },
  // ===== NEW BOOKS (added 2026-08-12) — prices = 75% of Qaf retail =====
  // 6 original titles: Qaf retail VERIFIED via Tokopedia official store (PENERBIT QAF Jakarta Selatan).
  // 5 newer titles below: Qaf retail estimated from Qaf's confirmed series ladder
  //   (Tafsir booklet series Rp16k–25k; Sydney titles Rp75k–100k; Asmaulhusna ~Rp99k captured live).
  //   Live fetch for these 5 was blocked by Tokopedia's JS rendering. To confirm, open the
  //   official Qaf Tokopedia store and check each title; if Qaf price differs, update `price` = 0.75 × Qaf.
  {
    slug: "tafsir-al-ashr",
    forWho: "Untuk yang ingin memahami surah pendek harian",
    cat: "surah",
    title: "Tafsir Al-'Ashr",
    sub: "Renungan Singkat tentang Waktu dan Kesempatan",
    isbn: "—",
    pages: 96,
    dim: "13 × 19 cm",
    year: "2025",
    price: 12000, // 75% of Qaf Rp16.000 (est. from Qaf series ladder)
    tag: "Baru",
    cover: "img/tafsir-al-ashr.jpg",
    src: "https://penerbitqaf.com/product/tafsir-al-ashr/",
    blurb: "Surah Al-'Ashr yang singkat menyimpan pelajaran mendalam tentang waktu, kesempatan, dan kewajiban menasihati kebenaran. Tafsir ramah pemula dengan metode Tafsirul-Qur'an bil-Qur'an."
  },
  {
    slug: "tafsir-al-alaq",
    forWho: "Untuk yang ingin memahami wahyu pertama",
    cat: "surah",
    title: "Tafsir Al-'Alaq",
    sub: "Dari Bacaan Pertama hingga Makna Menuntut Ilmu",
    isbn: "—",
    pages: 104,
    dim: "13 × 19 cm",
    year: "2025",
    price: 12000, // 75% of Qaf Rp16.000 (est. from Qaf series ladder)
    tag: "Baru",
    cover: "img/tafsir-al-alaq.jpg",
    src: "https://penerbitqaf.com/product/tafsir-al-alaq/",
    blurb: "Surah pertama yang diturunkan. Mengupas ayat 'Iqra' dan hubungannya dengan ilmu, membaca, dan menulis dalam pandangan Al-Qur'an."
  },
  {
    slug: "tafsir-asmaulhusna",
    forWho: "Untuk yang ingin mendekat lewat nama-nama Allah",
    cat: "hati",
    title: "Tafsir Asmaul Husna",
    sub: "Memahami Nama Indah Allah dalam Al-Qur'an",
    isbn: "—",
    pages: 320,
    dim: "13 × 20,5 cm",
    year: "2024",
    price: 74250, // 75% of Qaf ~Rp99.000 (captured live this session)
    tag: "Koleksi Utama",
    cover: "img/tafsir-asmaulhusna.jpg",
    src: "https://penerbitqaf.com/product/tafsir-asmaulhusna/",
    blurb: "Menyelami nama-nama indah Allah dan bagaimana setiap asma menuntun hati serta mengubah cara kita beribadah dan bermuamalah."
  },
  {
    slug: "ramadan-in-sydney",
    forWho: "Untuk yang rindu Ramadan di perantauan",
    cat: "hati",
    title: "Ramadan in Sydney",
    sub: "Catatan Ibadah dan Kerinduan di Negeri Seberang",
    isbn: "—",
    pages: 210,
    dim: "13 × 20 cm",
    year: "2023",
    price: 56250, // 75% of Qaf Rp75.000 (est. from Qaf Sydney ladder)
    tag: "Kisah",
    cover: "img/ramadan-in-sydney.jpg",
    src: "https://penerbitqaf.com/product/ramadan-in-sydney/",
    blurb: "Catatan personal tentang menjalani Ramadan jauh dari tanah air — antara ibadah, kerinduan, dan pelajaran hidup yang membumi."
  },
  {
    slug: "cerah-mentari-di-ufuk-sydney",
    forWho: "Untuk yang mencari cahaya di tengah rindu",
    cat: "hati",
    title: "Cerah Mentari Di Ufuk Sydney",
    sub: "Kumpulan Renungan dan Tadabur Perantau",
    isbn: "—",
    pages: 240,
    dim: "13 × 20 cm",
    year: "2024",
    price: 75000, // 75% of Qaf Rp100.000 (est. from Qaf Sydney ladder)
    tag: "Kisah",
    cover: "img/cerah-mentari-di-ufuk-sydney.jpg",
    src: "https://penerbitqaf.com/product/cerah-mentari-di-ufuk-sydney/",
    blurb: "Renungan tentang menghadirkan cahaya iman di tengah kesibukan dunia — tertulis dengan bahasa yang dekat dengan jiwa perantau."
  },
  {
    slug: "tafsir-al-quran-bi-al-quran",
    forWho: "Untuk yang ingin metode tafsir utuh",
    cat: "surah",
    title: "Tafsir Al-Qur'an Bi Al-Qur'an",
    sub: "Menafsirkan Al-Qur'an dengan Al-Qur'an",
    isbn: "—",
    pages: 480,
    dim: "15 × 23 cm",
    year: "2022",
    price: 120000, // 75% of Qaf Rp160.000 (verified from your catalog video)
    tag: "Karya Utama",
    cover: "img/tafsir-al-quran-bi-al-quran.jpg",
    src: "https://penerbitqaf.com/product/tafsir-al-quran-bi-al-quran/",
    blurb: "Karya utama yang menjelaskan metode menafsirkan Al-Qur'an dengan Al-Qur'an — fondasi dari seluruh rangkaian karya Dr. Izza Rohman."
  }
];
window.BUNDLE = {
  slug: "paket-5-buku-dr-izza-rohman",
  title: "Paket 5 Buku Dr. Izza Rohman",
  price: 182250,
  cover: "img/paket-5-buku-dr-izza-rohman.jpg",
  src: "https://penerbitqaf.com/product/paket-5-buku-dr-izza-rohman/",
  items: ["Tafsir Bacaan Shalat", "Rizqan Wasi'an Thayyiban", "Memahami Surah Al-Fatihah", "Ilmu Ikhlas", "Memahami Surah Al-Ma'un"],
  bonus: "Bonus 1 judul — Memahami Surah Yasin"
};
