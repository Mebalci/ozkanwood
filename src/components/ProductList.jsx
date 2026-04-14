import { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { urunleriGetir, kategorileriGetir } from '../api';

export default function ProductList() {
  const [urunler, setUrunler] = useState([]);
  const [kategoriler, setKategoriler] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCategories, setShowCategories] = useState(false);

  const normalize = (value) =>
    String(value || '')
      .toLocaleLowerCase('tr-TR')
      .trim();

  useEffect(() => {
    setLoading(true);

    Promise.all([urunleriGetir(), kategorileriGetir()])
      .then(([products, categories]) => {
        const aktifUrunler = Array.isArray(products) ? products : [];
        const apiKategoriler = Array.isArray(categories) ? categories : [];

        setUrunler(aktifUrunler);

        // Ürünü olan kategori isimlerini bul
        const urunKategoriMap = new Map();

        aktifUrunler.forEach((urun) => {
          if (!urun?.category) return;

          const normalizedName = normalize(urun.category);

          if (!urunKategoriMap.has(normalizedName)) {
            urunKategoriMap.set(normalizedName, {
              id: normalizedName,
              name: urun.category,
            });
          }
        });

        // API'den gelen kategoriler varsa onları ürünlerle eşleştir
        let filtreliKategoriler = apiKategoriler
          .filter((kategori) => kategori?.name)
          .filter((kategori) => urunKategoriMap.has(normalize(kategori.name)))
          .map((kategori) => ({
            id: kategori.id ?? normalize(kategori.name),
            name: kategori.name,
          }));

        // Eğer API kategorileri sorunluysa direkt ürünlerden kategori üret
        if (filtreliKategoriler.length === 0) {
          filtreliKategoriler = Array.from(urunKategoriMap.values());
        }

        // Tekrarlı kategorileri temizle
        const uniqueMap = new Map();
        filtreliKategoriler.forEach((kategori) => {
          const key = normalize(kategori.name);
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, kategori);
          }
        });

        const siraliKategoriler = Array.from(uniqueMap.values()).sort((a, b) =>
          a.name.localeCompare(b.name, 'tr')
        );

        setKategoriler(siraliKategoriler);
      })
      .catch((error) => {
        console.error('Ürün/Kategori yükleme hatası:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleCategory = (categoryName) => {
    const normalizedTarget = normalize(categoryName);

    setSelectedCategories((prev) => {
      const exists = prev.some((item) => normalize(item) === normalizedTarget);

      if (exists) {
        return prev.filter((item) => normalize(item) !== normalizedTarget);
      }

      return [...prev, categoryName];
    });
  };

  const removeCategory = (categoryName) => {
    const normalizedTarget = normalize(categoryName);

    setSelectedCategories((prev) =>
      prev.filter((item) => normalize(item) !== normalizedTarget)
    );
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  const kategoriUrunSayilari = useMemo(() => {
    const counts = {};

    urunler
      .filter((u) => Number(u.quantity) > 0)
      .forEach((urun) => {
        const key = normalize(urun.category);
        if (!key) return;
        counts[key] = (counts[key] || 0) + 1;
      });

    return counts;
  }, [urunler]);

  const filteredUrunler = useMemo(() => {
    return urunler
      .filter((u) => Number(u.quantity) > 0)
      .filter((u) => {
        if (selectedCategories.length === 0) return true;

        const urunKategori = normalize(u.category);
        return selectedCategories.some(
          (selected) => normalize(selected) === urunKategori
        );
      })
      .filter((u) => {
        const term = normalize(searchTerm);
        if (!term) return true;

        return (
          normalize(u.title).includes(term) ||
          normalize(u.brand).includes(term)
        );
      });
  }, [urunler, selectedCategories, searchTerm]);

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Mobil kategori aç/kapa */}
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setShowCategories((prev) => !prev)}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm flex items-center justify-between text-gray-800 font-medium"
          >
            <span>Kategoriler</span>
            <span className="text-lg">{showCategories ? '−' : '+'}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Kategoriler */}
          <aside
            className={`${showCategories ? 'block' : 'hidden'} lg:block w-full lg:w-72 xl:w-80`}
          >
            <div className="bg-white p-4 rounded-xl shadow-md sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Kategoriler</h2>

                {selectedCategories.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCategories}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Temizle
                  </button>
                )}
              </div>

              <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                <li>
                  <button
                    type="button"
                    onClick={clearCategories}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategories.length === 0
                        ? 'bg-accent text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Hepsi
                  </button>
                </li>

                {kategoriler
                  .filter((kategori) => kategoriUrunSayilari[normalize(kategori.name)] > 0)
                  .map((kategori) => {
                    const isSelected = selectedCategories.some(
                      (item) => normalize(item) === normalize(kategori.name)
                    );

                    return (
                      <li key={kategori.id}>
                        <button
                          type="button"
                          onClick={() => toggleCategory(kategori.name)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${
                            isSelected
                              ? 'bg-accent/10 text-accent font-semibold border border-accent/30'
                              : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                          }`}
                        >
                          <span className="pr-3">{kategori.name}</span>
                          <span className="text-xs shrink-0 opacity-80">
                            ({kategoriUrunSayilari[normalize(kategori.name)] || 0})
                          </span>
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </aside>

          {/* İçerik */}
          <div className="flex-1 min-w-0">
            {/* Seçili kategoriler */}
            {selectedCategories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedCategories.map((kategori) => (
                  <span
                    key={kategori}
                    className="inline-flex items-center gap-2 bg-accent text-white px-3 py-2 rounded-full text-sm"
                  >
                    <span>{kategori}</span>
                    <button
                      type="button"
                      onClick={() => removeCategory(kategori)}
                      className="leading-none text-white/90 hover:text-white"
                      aria-label={`${kategori} kategorisini kaldır`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Başlık + arama */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Ürünlerimiz
              </h1>

              <div className="w-full sm:max-w-md">
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

            {/* Sonuç sayısı */}
            <div className="mb-6 text-gray-600">
              <span className="font-semibold">{filteredUrunler.length}</span> ürün bulundu
            </div>

            {/* Liste */}
            {filteredUrunler.length === 0 ? (
              <div className="text-center py-16 sm:py-20 bg-white rounded-xl shadow-sm">
                <div className="text-5xl sm:text-6xl text-gray-300 mb-4">
                  <i className="fas fa-search"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Ürün bulunamadı
                </h3>
                <p className="text-gray-600 px-4">
                  {searchTerm
                    ? `"${searchTerm}" için sonuç bulunamadı.`
                    : 'Seçtiğiniz kategorilerde ürün bulunamadı.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6">
                {filteredUrunler.map((urun, index) => (
                  <ProductCard key={urun.id || index} urun={urun} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
