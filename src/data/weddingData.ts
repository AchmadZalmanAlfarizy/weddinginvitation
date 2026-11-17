export interface EventDetail {
  id: string;
  title: string;
  dayName: string;
  dateText: string;
  timeText: string;
  venueName: string;
  address: string;
  mapsUrl: string;
  startIso: string;
  endIso: string;
}

export interface LoveStoryItem {
  year: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface WishItem {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guests: number;
  message: string;
  createdAt: string;
}

export const weddingData = {
  couple: {
    shortTitle: 'Rifal & Asti',
    monogram: 'R & A',
    groom: {
      fullName: 'Muhammad Rifal Alfarizy',
      nickName: 'Rifal',
      instagram: 'https://instagram.com/',
      instagramHandle: '@rifalalfarizy',
      photo: '/images/foto-4.jpg',
    },
    bride: {
      fullName: 'Rahmdhani Dw Astuti',
      nickName: 'Asti',
      instagram: 'https://instagram.com/',
      instagramHandle: '@rahmdhani.dwastuti',
      photo: '/images/foto-3.jpg',
    },
  },

  // Tanggal utama untuk countdown (Format ISO dengan timezone WIB +07:00)
  targetDateIso: '2027-01-24T08:00:00+07:00',
  displayDate: 'Minggu, 24 Januari 2027',
  locationSummary: 'Cianjur, Jawa Barat',

  coverPhoto: '/images/foto-5.jpg',
  heroPhoto: '/images/foto-7.jpg',

  // Letakkan file lagu MP3 Anda di folder: public/music/wedding-song.mp3
  // Jika file belum tersedia, website otomatis memutar melodi piano ambient lembut sebagai fallback.
  music: {
    src: '/music/wedding-song.mp3',
    title: 'Romantic Wedding Instrumental',
    artist: 'Background Music',
  },

  quote: {
    arabic:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    text: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum: 21',
  },

  events: [
    {
      id: 'akad',
      title: 'Akad Nikah',
      dayName: 'Minggu',
      dateText: '24 Januari 2027',
      timeText: '08.00 – 10.00 WIB',
      venueName: 'Kediaman / Lokasi Akad (Cianjur)',
      address: 'Kabupaten Cianjur, Jawa Barat',
      mapsUrl: 'https://maps.google.com/?q=Cianjur,+Jawa+Barat',
      startIso: '20270124T010000Z',
      endIso: '20270124T030000Z',
    },
    {
      id: 'resepsi',
      title: 'Resepsi Pernikahan',
      dayName: 'Minggu',
      dateText: '24 Januari 2027',
      timeText: '11.00 – 14.00 WIB',
      venueName: 'Gedung / Lokasi Resepsi (Cianjur)',
      address: 'Kabupaten Cianjur, Jawa Barat',
      mapsUrl: 'https://maps.google.com/?q=Cianjur,+Jawa+Barat',
      startIso: '20270124T040000Z',
      endIso: '20270124T070000Z',
    },
  ] as EventDetail[],

  loveStory: [
    {
      year: '2023',
      title: 'Pertama Kali Bertemu',
      description:
        'Berawal dari pertemuan sederhana yang tak terduga, perbincangan ringan berubah menjadi rasa nyaman yang terus tumbuh dari waktu ke waktu.',
    },
    {
      year: '2024',
      title: 'Menjalin Komitmen',
      description:
        'Belajar saling memahami, bertumbuh bersama, dan meyakinkan hati bahwa setiap langkah ke depan terasa lebih bermakna saat dijalani berdua.',
    },
    {
      year: '2026',
      title: 'Prosesi Lamaran',
      description:
        'Di hadapan keluarga tercinta, kami mengikat janji suci untuk melangkah ke jenjang pernikahan dengan penuh doa dan restu orang tua.',
    },
    {
      year: '2027',
      title: 'Menuju Pelaminan',
      description:
        'Dengan memohon rahmat dan ridho Allah SWT, kami siap memulai babak baru kehidupan sebagai sepasang suami istri.',
    },
  ] as LoveStoryItem[],

  gallery: [
    {
      id: 'gal-2',
      src: '/images/foto-2.jpg',
      alt: 'Momen Bahagia Rifal & Asti Menabur Kelopak Bunga',
      caption: 'Selebrasi Bahagia Bersama Keluarga',
      aspect: 'landscape',
    },
    {
      id: 'gal-5',
      src: '/images/foto-5.jpg',
      alt: 'Rifal & Asti Menunjukkan Cincin Pernikahan',
      caption: 'Ikatan Suci yang Tersemat',
      aspect: 'portrait',
    },
    {
      id: 'gal-6',
      src: '/images/foto-6.jpg',
      alt: 'Potret Resmi Rifal & Asti di Pelaminan',
      caption: 'Bersama di Pelaminan',
      aspect: 'portrait',
    },
    {
      id: 'gal-7',
      src: '/images/foto-7.jpg',
      alt: 'Rifal & Asti Menggenggam Kelopak Mawar',
      caption: 'Doa & Harapan Terbaik',
      aspect: 'portrait',
    },
    {
      id: 'gal-1',
      src: '/images/foto-1.jpg',
      alt: 'Momen Prosesi Penyambutan Mempelai',
      caption: 'Langkah Menuju Restu',
      aspect: 'portrait',
    },
    {
      id: 'gal-3',
      src: '/images/foto-3.jpg',
      alt: 'Potret Mempelai Wanita dengan Siger Sunda',
      caption: 'Anggun dalam Balutan Siger',
      aspect: 'portrait',
    },
    {
      id: 'gal-4',
      src: '/images/foto-4.jpg',
      alt: 'Prosesi Buka Pintu Mempelai Pria',
      caption: 'Prosesi Pemotongan Pita',
      aspect: 'portrait',
    },
  ] as GalleryItem[],

  giftAccounts: [
    {
      id: 'bca',
      bankName: 'Bank BCA',
      accountNumber: '1234567890',
      accountHolder: 'Muhammad Rifal Alfarizy',
    },
    {
      id: 'mandiri',
      bankName: 'Bank Mandiri',
      accountNumber: '0987654321',
      accountHolder: 'Rahmdhani Dw Astuti',
    },
  ] as BankAccount[],

  initialWishes: [
    {
      id: 'w-1',
      name: 'Keluarga Besar Alfarizy',
      attendance: 'hadir',
      guests: 2,
      message:
        'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fi khair. Semoga Rifal & Asti menjadi keluarga sakinah, mawaddah, warahmah.',
      createdAt: '2026-11-10T09:30:00Z',
    },
    {
      id: 'w-2',
      name: 'Nadia Putri & Pasangan',
      attendance: 'hadir',
      guests: 2,
      message:
        'Selamat menempuh hidup baru untuk Rifal dan Asti! Lancar sampai hari H, selalu bahagia dan saling melengkapi selamanya.',
      createdAt: '2026-11-12T14:15:00Z',
    },
    {
      id: 'w-3',
      name: 'Rizky Pratama',
      attendance: 'ragu',
      guests: 1,
      message:
        'Turut berbahagia mendengar kabar pernikahan kalian. InsyaAllah diusahakan hadir di acara resepsi. Doa terbaik selalu!',
      createdAt: '2026-11-15T18:45:00Z',
    },
  ] as WishItem[],
};

