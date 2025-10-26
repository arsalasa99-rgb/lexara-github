
import { LawDocument, User, UserRole, MultidisciplinaryAnalysis, BlockchainNode, ForumComment } from './types';

export const COLORS = {
  primary: '#8B1E3F', // Dark Bordeaux Red
  accentGold: '#E5C07B',
  accentPink: '#F6A5C0',
  background: '#FFF5EC', // Light Cream
  text: '#333333',
};

export const USERS: Record<string, User> = {
  'user1': { id: 'user1', name: 'Budi Santoso', role: UserRole.Warga },
  'user2': { id: 'user2', name: 'Dr. Anisa Lestari, S.H., M.H.', role: UserRole.Ahli },
  'user3': { id: 'user3', name: 'Kementerian Hukum', role: UserRole.Pemerintah },
  'user4': { id: 'user4', name: 'Siti Aminah', role: UserRole.Warga },
};

export const LAW_DOCUMENTS: LawDocument[] = [
  {
    id: 'ruu-perampasan-aset',
    title: 'RUU Perampasan Aset Tindak Pidana',
    category: 'RUU Aktif',
    shortDescription: 'Rancangan Undang-Undang untuk merampas aset hasil tindak pidana korupsi dan kejahatan lainnya.',
    status: 'Dalam Pembahasan',
    coreArticles: [
        { article: "Pasal 1", content: "Definisi mengenai aset tindak pidana yang dapat dirampas oleh negara." },
        { article: "Pasal 5 Ayat (1)", content: "Mekanisme pembuktian terbalik dalam kasus perampasan aset." },
        { article: "Pasal 12", content: "Pengelolaan aset rampasan untuk pemulihan kerugian negara dan kepentingan publik." },
    ]
  },
  {
    id: 'uu-perlindungan-anak',
    title: 'UU No. 35 Tahun 2014 tentang Perlindungan Anak',
    category: 'Hukum Pidana',
    shortDescription: 'Perubahan atas UU No. 23 Tahun 2002 yang mengatur hak dan perlindungan anak di Indonesia.',
    status: 'Berlaku',
    coreArticles: [
        { article: "Pasal 15", content: "Setiap Anak berhak untuk memperoleh perlindungan dari: a. penyalahgunaan dalam kegiatan politik; b. pelibatan dalam sengketa bersenjata..." },
        { article: "Pasal 20", content: "Negara, Pemerintah, Pemerintah Daerah, Masyarakat, Keluarga, dan Orang Tua atau Wali berkewajiban dan bertanggung jawab terhadap penyelenggaraan Perlindungan Anak." },
    ]
  },
  {
    id: 'kuhp',
    title: 'Kitab Undang-Undang Hukum Pidana (KUHP)',
    category: 'Hukum Pidana',
    shortDescription: 'Kodifikasi hukum pidana yang berlaku di Indonesia.',
    status: 'Berlaku',
    coreArticles: [
      { article: "Pasal 338", content: "Barang siapa dengan sengaja merampas nyawa orang lain, diancam karena pembunuhan dengan pidana penjara paling lama lima belas tahun." },
    ]
  },
  {
    id: 'kuhper',
    title: 'Kitab Undang-Undang Hukum Perdata (KUHPer)',
    category: 'Hukum Perdata',
    shortDescription: 'Kodifikasi hukum perdata yang mengatur hubungan antar individu.',
    status: 'Berlaku',
    coreArticles: [
      { article: "Pasal 1320", content: "Untuk sahnya suatu perjanjian diperlukan empat syarat: kesepakatan mereka yang mengikatkan dirinya; kecakapan untuk membuat suatu perikatan; suatu pokok persoalan tertentu; suatu sebab yang tidak terlarang." },
    ]
  },
];

export const ANALYSIS_DATA: Record<string, MultidisciplinaryAnalysis[]> = {
  'ruu-perampasan-aset': [
    { discipline: 'Hukum Pidana & Kriminologi', icon: 'Gavel', summary: 'Fokus pada pembuktian terbalik dan efektivitasnya dalam menjerat pelaku kejahatan ekonomi.', fullAnalysis: 'Analisis mendalam tentang bagaimana RUU ini mengubah paradigma penegakan hukum dari menghukum pelaku (in personam) menjadi mengejar aset hasil kejahatan (in rem). Pembuktian terbalik menjadi kunci, namun tantangannya adalah potensi pelanggaran hak asasi tersangka jika tidak diatur secara ketat.' },
    { discipline: 'Ekonomi & Kebijakan Publik', icon: 'TrendingUp', summary: 'Analisis dampak terhadap pemulihan aset negara dan stabilitas ekonomi.', fullAnalysis: 'RUU ini berpotensi besar mengembalikan kerugian negara akibat korupsi. Aset yang dirampas dapat digunakan untuk mendanai layanan publik. Namun, perlu ada mekanisme pengelolaan aset yang transparan dan efisien agar tidak menimbulkan masalah baru. Dari sisi kebijakan, ini adalah sinyal kuat bagi investor bahwa pemerintah serius memberantas korupsi.' },
    { discipline: 'Politik & Kekuasaan', icon: 'Users', summary: 'Potensi RUU sebagai alat politik dan dampaknya pada konstelasi kekuasaan.', fullAnalysis: 'Instrumen hukum yang kuat seperti perampasan aset dapat disalahgunakan untuk tujuan politik, menargetkan lawan atau membungkam kritik. Oleh karena itu, lembaga yang berwenang harus independen dan diawasi secara ketat oleh parlemen dan masyarakat sipil.' },
    { discipline: 'Agama & Moral Publik', icon: 'BookOpen', summary: 'Perspektif nilai keadilan dan pengembalian hak publik dalam ajaran agama.', fullAnalysis: 'Mayoritas ajaran agama menekankan pentingnya keadilan dan mengutuk pencurian atau perolehan harta secara tidak sah. Konsep merampas aset koruptor sejalan dengan prinsip moral untuk mengembalikan apa yang menjadi hak masyarakat. Ini dianggap sebagai langkah menegakkan keadilan sosial.' },
    { discipline: 'HAM & Keadilan Sosial', icon: 'Scale', summary: 'Menimbang antara kebutuhan pemberantasan korupsi dan perlindungan HAM.', fullAnalysis: 'Titik kritis RUU ini adalah keseimbangan antara efektivitas pemberantasan kejahatan dan perlindungan hak milik serta asas praduga tak bersalah. Proses perampasan harus adil, transparan, dan memberikan ruang bagi pihak ketiga yang beritikad baik untuk mempertahankan haknya.' },
  ],
  'uu-perlindungan-anak': [
    { discipline: 'Psikologi Perkembangan', icon: 'Smile', summary: 'Dampak UU terhadap kesehatan mental dan tumbuh kembang anak sebagai korban.', fullAnalysis: 'UU ini memberikan landasan hukum untuk perlindungan psikologis anak. Ketentuan tentang rehabilitasi dan penghindaran dari publikasi media sangat penting untuk mencegah trauma jangka panjang pada anak korban kekerasan. Ini sejalan dengan teori perkembangan anak yang menekankan pentingnya lingkungan yang aman.' },
    { discipline: 'Sosiologi Keluarga', icon: 'Home', summary: 'Peran negara dalam intervensi keluarga dan perubahan struktur sosial.', fullAnalysis: 'UU ini menandai pergeseran di mana negara memiliki kewenangan lebih besar untuk mengintervensi ranah privat (keluarga) demi kepentingan terbaik anak. Ini mengubah dinamika kekuasaan dalam keluarga dan memperkuat posisi anak sebagai subjek hukum yang memiliki hak, bukan sekadar objek milik orang tua.' },
    { discipline: 'Administrasi Publik', icon: 'Briefcase', summary: 'Tanggung jawab dan kapabilitas lembaga negara dalam implementasi perlindungan.', fullAnalysis: 'Implementasi UU ini memerlukan sinergi antar lembaga seperti KPAI, P2TP2A, kepolisian, dan pengadilan. Tantangannya adalah keterbatasan anggaran, sumber daya manusia yang kompeten, dan koordinasi antar lembaga di tingkat pusat dan daerah.' },
    { discipline: 'Komunikasi Publik & Media', icon: 'Megaphone', summary: 'Peran media dalam edukasi publik dan risiko eksploitasi anak.', fullAnalysis: 'Media memiliki dua sisi: sebagai alat edukasi untuk menyosialisasikan hak-hak anak, dan sebagai platform yang berisiko mengeksploitasi kasus kekerasan pada anak. UU ini memberikan batasan jelas tentang bagaimana media harus memberitakan kasus yang melibatkan anak, terutama dalam melindungi identitas mereka.' },
    { discipline: 'Agama & Moral Publik', icon: 'BookOpen', summary: 'Kewajiban melindungi anak sebagai amanah dalam perspektif agama.', fullAnalysis: 'Semua agama memandang anak sebagai anugerah dan amanah yang harus dijaga. UU Perlindungan Anak selaras dengan nilai-nilai moral dan ajaran agama yang menekankan kewajiban orang tua dan masyarakat untuk melindungi, mendidik, dan menyejahterakan anak.' },
  ]
};


export const BLOCKCHAIN_DATA: Record<string, BlockchainNode[]> = {
  'ruu-perampasan-aset': [
    { id: 'node1', date: '2023-03-15', actor: 'Pemerintah (Inisiatif Awal)', summary: 'Pengajuan draf awal RUU ke DPR.', hash: '0x1a2b...', changes: { article: 'Pasal 1', before: 'N/A', after: 'Aset Tindak Pidana adalah setiap harta benda yang diperoleh atau diduga diperoleh dari tindak pidana.', reason: 'Definisi dasar sebagai landasan RUU.' } },
    { id: 'node2', date: '2023-09-22', actor: 'DPR (Komisi III)', summary: 'Perubahan definisi & penambahan klausul pihak ketiga.', hash: '0x3c4d...', changes: { article: 'Pasal 1', before: 'Aset Tindak Pidana adalah setiap harta benda yang diperoleh atau diduga diperoleh dari tindak pidana.', after: 'Aset Tindak Pidana adalah ... termasuk keuntungan yang diperoleh dari aset tersebut.', reason: 'Memperluas cakupan aset yang bisa dirampas.' } },
    { id: 'node3', date: '2024-02-10', actor: 'Masyarakat Sipil (Masukan Publik)', summary: 'Usulan penguatan mekanisme pengawasan.', hash: '0x5e6f...', changes: { article: 'Pasal 25 (Baru)', before: 'N/A', after: 'Dibentuk komisi independen untuk mengawasi pengelolaan aset rampasan.', reason: 'Meningkatkan transparansi dan akuntabilitas.' } },
  ]
};

export const FORUM_DATA: Record<string, ForumComment[]> = {
  'ruu-perampasan-aset': [
    { 
      id: 'c1', 
      author: USERS['user2'], 
      content: 'Mengenai Pasal 5 Ayat (1) tentang pembuktian terbalik, ini adalah langkah maju. Namun, perlu ada batasan yang jelas agar tidak melanggar hak asasi manusia. Bagaimana jika aset tersebut diperoleh dari warisan atau usaha yang sah sebelum dugaan tindak pidana terjadi?', 
      timestamp: '2 hari yang lalu', 
      upvotes: 42, 
      linkedArticle: 'Pasal 5 Ayat (1)',
      replies: [
        { id: 'c1-r1', author: USERS['user3'], content: 'Terima kasih atas masukannya, Dr. Anisa. Pemerintah telah mempertimbangkan hal ini. Dalam draf terbaru, ada mekanisme bagi terdakwa dan pihak ketiga untuk membuktikan legalitas perolehan aset. Prosesnya akan diawasi oleh pengadilan.', timestamp: '1 hari yang lalu', upvotes: 15, replies: [] },
        { id: 'c1-r2', author: USERS['user1'], content: 'Setuju, Bu Doktor. Jangan sampai rakyat kecil yang kebetulan dapat warisan malah jadi korban. Pengawasannya harus ketat!', timestamp: '1 hari yang lalu', upvotes: 25, replies: [] }
      ]
    },
    { 
      id: 'c2', 
      author: USERS['user1'], 
      content: 'Saya dukung penuh RUU ini! Sudah saatnya koruptor dimiskinkan. Uang hasil rampasan harus dipakai untuk sekolah gratis dan rumah sakit.', 
      timestamp: '3 hari yang lalu', 
      upvotes: 78,
      replies: []
    },
  ]
};
