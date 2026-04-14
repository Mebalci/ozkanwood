import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { urunleriGetir, kategorileriGetir } from '../api';

export default function ProductList() {
  const [urunler, setUrunler] = useState([]);
  const [kategoriler, setKategoriler] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([urunleriGetir(), kategorileriGetir()])
      .then(([p, c]) => {
        setUrunler(p);
        setKategoriler(c);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredUrunler = urunler
    .filter(u => u.quantity > 0)
    .filter(u => !selectedCategory || u.category === selectedCategory)
    .filter(u =>
      u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Ekran yüklenirken spinner göster
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        </div>
      </div>
    );
  }

  // Kategoriler listesini ve ürün gridini yan yana yerleştir
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 flex gap-8">
        <aside className="w-64">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-3">Kategoriler</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left ${!selectedCategory ? 'text-accent font-semibold' : ''}`}
                >
                  Hepsi
                </button>
              </li>
              {kategoriler.map(k => (
                <li key={k.id}>
                  <button
                    onClick={() => setSelectedCategory(k.name)}
                    className={`block w-full text-left ${selectedCategory === k.name ? 'text-accent font-semibold' : ''}`}
                  >
                    {k.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ürünlerimiz</h1>
            <div className="max-w-md">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Ürün veya marka ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {filteredUrunler.length > 0 && (
            <div className="mb-6 text-gray-600">
              <span className="font-semibold">{filteredUrunler.length}</span> ürün bulundu
            </div>
          )}

          {filteredUrunler.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl text-gray-300 mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ürün bulunamadı</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? `"${searchTerm}" için sonuç bulunamadı.`
                  : 'Henüz ürün yüklenmedi.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUrunler.map((urun) => (
                <ProductCard key={urun.id} urun={urun} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
