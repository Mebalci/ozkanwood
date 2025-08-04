export default function About() {
  return (
    <div className="container py-5 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mb-5">
        <span className="section-badge">Hakkımızda</span>
        <h1 className="section-title">Doğallığın ve Zarafetin Buluşma Noktası</h1>
        <p className="section-subtitle">
          Özkan Wood olarak, doğal malzemeleri zarafetle birleştiriyor, el işçiliğiyle hazırladığımız mobilya kulplarıyla yaşam alanlarınıza doğallık katıyoruz.
        </p>
      </div>

      <div className="row justify-content-center w-100">
        <div className="col-md-10 d-flex justify-content-center">
          <div className="feature-card text-center w-100">
            <div className="feature-icon mx-auto">
              <i className="fas fa-tree"></i>
            </div>
            <div className="feature-content">
              <h3>El İşçiliği ile Hayat Bulan Tasarımlar</h3>
              <p>
                Her bir ürünümüz, ustalarımızın ellerinden çıkan özgün birer tasarım harikasıdır. Doğaya saygılı, kaliteli ve uzun ömürlü ahşap ürünler sunuyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}