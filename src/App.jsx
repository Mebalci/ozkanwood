import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductList from './components/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage'; // yeni
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hakkimizda" element={<About />} />
              <Route path="/iletisim" element={<Contact />} />
              <Route path="/urunler" element={<ProductList />} />
              <Route path="/urun/:id" element={<ProductDetail />} />
              <Route path="/sepet" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
