/* ---------- ICONS ---------- */
const IconMail = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M4 6h16v12H4z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M4 6l8 7 8-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconMap = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const IconPhone = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L9 10a16 16 0 0 0 5 5l.6-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const IconWhatsApp = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 8.5c.2-.4.4-.5.7-.5h.6c.2 0 .5 0 .7.5l.8 1.9c.1.3.1.5 0 .7l-.4.6c-.1.2-.2.4 0 .6a6.5 6.5 0 0 0 3 3c.2.1.4.1.6 0l.6-.4c.2-.1.4-.1.7 0l1.9.8c.5.2.5.5.5.7v.6c0 .3-.1.5-.5.7-.4.2-1.5.5-3-.1-1.6-.6-3.5-2.1-4.3-4.2-.6-1.5-.3-2.6-.1-3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ---------- COMPONENT ---------- */
export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
            <IconMail className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-gray-700">İletişim</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Bize Ulaşın
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            Her türlü soru, görüş ve özel siparişleriniz için bizimle iletişime
            geçebilirsiniz.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* ADRES */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <IconMap className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Adres</h3>
            <p className="text-gray-600 leading-relaxed">
              Önder, Taştop Sk. No:16 D:2. kat
              <br />
              06360 Altındağ / Ankara
            </p>
          </div>

          {/* TELEFON */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <IconPhone className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Telefon</h3>
            <a
              href="tel:+905070824608"
              className="text-accent hover:text-accent-dark font-semibold text-lg transition"
            >
              +90 507 082 46 08
            </a>
          </div>

          {/* WHATSAPP */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <IconWhatsApp className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp</h3>
            <p className="text-gray-600 mb-4">
              Hızlı yanıt için WhatsApp üzerinden bize ulaşabilirsiniz.
            </p>
            <a
              href="https://wa.me/905070824608"
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn inline-flex items-center gap-2"
            >
              <IconWhatsApp className="w-5 h-5" />
              WhatsApp ile İletişime Geçin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
