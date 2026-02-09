import { Link } from "react-router-dom";

const updatedAt = new Date().toLocaleDateString("tr-TR");

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top band */}
      <div className="border-b border-gray-200 bg-white/70 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Yasal</p>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                Gizlilik Politikası
              </h1>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-gray-900">
                Anasayfa
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-700 font-semibold">Gizlilik</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <i className="fas fa-shield-alt text-accent"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Özet</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Verilerinizi yalnızca hizmet sunmak, güvenliği sağlamak ve deneyimi iyileştirmek için kullanırız.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
                    <div className="text-xs text-gray-500">Son güncelleme</div>
                    <div className="font-semibold text-gray-900">{updatedAt}</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
                    <div className="text-xs text-gray-500">İletişim</div>
                    <a
                      className="font-semibold text-gray-900 hover:text-accent"
                      href="https://wa.me/905070824608"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-3">Hızlı Başlıklar</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    ["#veriler", "Toplanan Veriler"],
                    ["#amac", "Kullanım Amaçları"],
                    ["#cerez", "Çerezler"],
                    ["#ucuncu", "Üçüncü Taraflar"],
                    ["#haklar", "Haklar & İletişim"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-8">
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-gray-200 bg-[radial-gradient(circle_at_top,rgba(255,107,53,0.08),transparent_55%)]">
                <p className="text-gray-600 leading-relaxed">
                  Özkan Wood olarak gizliliğinize önem veriyoruz. Bu sayfa, sitemizi kullandığınızda
                  hangi verileri hangi amaçlarla işlediğimizi açıklar.
                </p>
              </div>

              {/* Sections */}
              <div className="p-6 md:p-8 space-y-10">
                <section id="veriler" className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3">1) Toplanan Veriler</h2>
                  <ul className="space-y-2 text-gray-700 leading-relaxed list-disc pl-5">
                    <li>Site kullanımına bağlı teknik veriler (cihaz, tarayıcı, sayfa görüntüleme gibi).</li>
                    <li>İletişim kanallarında paylaştığınız bilgiler (WhatsApp üzerinden iletilen sipariş mesajı vb.).</li>
                    <li>Sepet/ürün tercihleri gibi kullanıcı deneyimini iyileştiren bilgiler (yerel olarak saklanabilir).</li>
                  </ul>
                </section>

                <section id="amac" className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3">2) Kullanım Amaçları</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Veriler; hizmetin sunulması, sipariş sürecinin yönetimi, güvenliğin sağlanması ve site performansının
                    iyileştirilmesi amacıyla kullanılabilir.
                  </p>
                </section>

                <section id="cerez" className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3">3) Çerezler</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Kullanıcı deneyimini geliştirmek için çerezler kullanılabilir. Tarayıcı ayarlarınızdan çerezleri
                    yönetebilir veya devre dışı bırakabilirsiniz.
                  </p>
                </section>

                <section id="ucuncu" className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3">4) Üçüncü Taraflar</h2>
                  <p className="text-gray-700 leading-relaxed">
                    WhatsApp gibi üçüncü taraf servislerine yönlendirme olabilir. Bu servislerin gizlilik politikaları
                    kendi sorumluluklarındadır.
                  </p>
                </section>

                <section id="haklar" className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3">5) Haklar & İletişim</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Gizlilikle ilgili talepleriniz için bize ulaşabilirsiniz.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://wa.me/905070824608"
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary justify-center"
                    >
                      <i className="fab fa-whatsapp"></i>
                      WhatsApp’tan Yaz
                    </a>

                    <Link
                      to="/kullanim-sartlari"
                      className="btn btn-outline justify-center"
                    >
                      Kullanım Şartları
                    </Link>
                  </div>

                  <p className="text-xs text-gray-500 mt-6">
                    Bu metin genel bilgilendirme amaçlıdır. İhtiyaca göre içerik genişletilebilir.
                  </p>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
