import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductList from './components/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';


function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hakkimizda" element={<About />} />
              <Route path="/iletisim" element={<Contact />} />
              <Route path="/urunler" element={<ProductList />} />
              <Route path="/urun/:id" element={<ProductDetail />} />
              <Route path="/sepet" element={<CartPage />} />
              <Route path="/gizlilik" element={<PrivacyPolicy />} />
              <Route path="/kullanim-sartlari" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
