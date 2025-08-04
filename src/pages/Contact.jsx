export default function Contact() {
  return (
    <div className="container py-5 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mb-5">
        <span className="section-badge">İletişim</span>
        <h1 className="section-title">Bize Ulaşın</h1>
        <p className="section-subtitle">
          Her türlü soru, görüş ve özel siparişleriniz için bizimle iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="row justify-content-center w-100">
        <div className="col-md-8 d-flex justify-content-center">
          <div className="feature-card text-center w-100">
            <div className="feature-icon mx-auto">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="feature-content">
              <h3>Adres</h3>
              <p className="mb-3">Önder, Taştop Sk. No:16 D:2. kat, 06360 Altındağ/Ankara</p>
              <h4 className="fw-bold mb-2">Telefon</h4>
              <p className="mb-4">
                <a href="https://wa.me/905070824608" target="_blank" rel="noreferrer" className="text-success text-decoration-none">
                  <i className="bi bi-whatsapp me-2"></i>+90 507 082 46 08
                </a>
              </p>
              <a
                href="https://wa.me/905070824608"
                target="_blank"
                rel="noreferrer"
                className="btn-premium primary px-4 py-3"
              >
                <i className="bi bi-whatsapp me-2"></i>WhatsApp ile İletişime Geçin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}