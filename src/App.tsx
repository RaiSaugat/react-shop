import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Left side: Product details (or placeholder) */}
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="*"
            element={
              <div className="placeholder">
                Please select a product from the list.
              </div>
            }
          />
        </Routes>

        {/* Right side: Product list */}
        <ProductList />
      </div>
    </Router>
  );
};

export default App;
