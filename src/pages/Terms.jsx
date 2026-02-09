import { Link } from "react-router-dom";

const updatedAt = new Date().toLocaleDateString("tr-TR");

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top band */}
      <div className="border-b border-gray-200 bg-white/70 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Yasal</p>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                Kullanım Şartları
              </h1>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-gray-900">
                Anasayfa
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-700 font-semibold">Şartlar</span>
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
                    <i className="fas fa-file-contract text-accent"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Kısa Not</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Bu site, ürünleri tanıtır ve WhatsApp üzerinden sipariş/iletişim kolaylığı sağlar.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
                  <div className="text-xs text-gray-500">Son güncelleme</div>
                  <div className="font-semibold text-gray-900">{updatedAt}</div>
                </div>
              </div>

              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-3">Hızlı Başlıklar</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    ["#hizmet", "Hizmet Tanımı"],
                    ["#icerik", "İçerik Kullanımı"],
                    ["#fiyat", "Fiyat & Stok"],
                    ["#sorumluluk", "Sorumluluk"],
                    ["#degisiklik", "Değişiklikler"],
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
              <div className="p-6 md:p-8 border-b border-gray-200 bg-[radial-gradient(circle_at_top,rgba(255,107,53,0.08),transparent_55%)]">
                <p className="text-gray-600 leading-relaxed">
                  Bu siteyi kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.
                  Sorularınız için iletişim sayfamızdan bize ulaşabilirsiniz.
                </p>
              </div>

              <div className="p-6 md:p-8 space-y-10">
                <section id="hizmet" className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3">1) Hizmet Tanımı</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Özkan Wood, ürünlerini tanıtmak ve WhatsApp üzerinden sipariş/iletişim sürecini kolaylaştırmak amacıyla hizmet verir.
                  </p>
                </section>

                <section id="icerik" className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3">2) İçerik Kullanımı</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Sitedeki metin, görsel ve tasarım unsurları izinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.
                  </p>
                </section>

                <section id="fiyat" className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3">3) Fiyat & Stok</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Fiyatlar ve stok bilgileri değişebilir. Nihai teyit, sipariş aşamasında sağlanır.
                  </p>
                </section>

                <section id="sorumluluk" className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3">4) Sorumluluk</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Site kullanımı sırasında oluşabilecek kesinti/hata gibi durumlar için, yürürlükteki mevzuatın izin verdiği ölçüde sorumluluk sınırlandırılır.
                  </p>
                </section>

                <section id="degisiklik" className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3">5) Değişiklikler</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Bu şartlar zaman zaman güncellenebilir. Güncel sürüm bu sayfada yayınlanır.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/iletisim" className="btn btn-primary justify-center">
                      <i className="fas fa-comment-dots"></i>
                      İletişime Geç
                    </Link>

                    <Link to="/gizlilik" className="btn btn-outline justify-center">
                      Gizlilik Politikası
                    </Link>
                  </div>
                </section>

                <p className="text-xs text-gray-500">
                  Bu metin genel bilgilendirme amaçlıdır. İhtiyaca göre içerik genişletilebilir.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
