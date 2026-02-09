/* ---------- ICONS ---------- */
const IconInfo = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8h.01M11 12h1v4h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconTree = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 3c-4 0-7 3-7 7 0 3.5 2.3 6.4 5.5 7.3V21h3v-3.7C16.7 16.4 19 13.5 19 10c0-4-3-7-7-7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const IconAward = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
    <path d="M8 14l-2 7 6-3 6 3-2-7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const IconHeart = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 21s-7-4.5-9-8.5C1 8.5 4 5 7.5 5c2 0 3.5 1.2 4.5 2.7C13 6.2 14.5 5 16.5 5 20 5 23 8.5 21 12.5 19 16.5 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------- COMPONENT ---------- */
export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* HERO */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
            <IconInfo className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-gray-700">Hakkımızda</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Doğallığın ve Zarafetin Buluşma Noktası
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            Özkan Wood olarak, doğal malzemeleri zarafetle birleştiriyor, el işçiliğiyle
            hazırladığımız mobilya kulplarıyla yaşam alanlarınıza doğallık katıyoruz.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: IconTree,
              title: "El İşçiliği ile Hayat Bulan Tasarımlar",
              text:
                "Her bir ürünümüz, ustalarımızın ellerinden çıkan özgün birer tasarım harikasıdır. Doğaya saygılı, kaliteli ve uzun ömürlü ahşap ürünler sunuyoruz.",
            },
            {
              icon: IconAward,
              title: "Kalite ve Güven",
              text:
                "15 yılı aşkın tecrübemizle, müşterilerimize en yüksek kalitede ürünler sunuyoruz. Her ürünümüz titizlikle kontrol edilir.",
            },
            {
              icon: IconHeart,
              title: "Müşteri Memnuniyeti",
              text:
                "Binlerce mutlu müşterimizden gelen güven, bizim en büyük motivasyonumuzdur. Sizin memnuniyetiniz önceliğimizdir.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <item.icon className="w-9 h-9 text-accent" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {item.title}
              </h3>

              <p className="text-gray-600 text-center leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "1000+", label: "Mutlu Müşteri" },
            { number: "15+", label: "Yıl Tecrübe" },
            { number: "100%", label: "Doğal Malzeme" },
            { number: "5000+", label: "Üretilen Ürün" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition"
            >
              <div className="text-4xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
