import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart, faTag } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';

interface Props {
  product: Product;
  view?: 'grid' | 'list';
}

const categoryIcons: Record<string, string> = {
  Monitoring: '🩺',
  Diagnostics: '🔬',
  Mobility: '♿',
  Respiratory: '💨',
  'First Aid': '🩹',
  Therapy: '🌡️',
  Orthopaedics: '🦴',
  Furniture: '🏥',
};

const ProductCard: React.FC<Props> = ({ product, view = 'grid' }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const goToDetail = () => navigate(`/products/${product.id}`);

  if (view === 'list') {
    return (
      <div className="product-list-item" onClick={goToDetail} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && goToDetail()}>
        {product.images[0] ? (
          <img src={product.images[0]} alt={product.name} className="product-list-img" loading="lazy" />
        ) : (
          <div className="product-list-img-placeholder">
            {categoryIcons[product.category] || '🏥'}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div className="product-card-category">{product.category}</div>
          <h5 className="product-card-title">{product.name}</h5>
          <p className="product-card-desc" style={{ WebkitLineClamp: 3 }}>{product.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <span className="product-card-price">LKR {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="product-card-original-price">LKR {product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            {discountPct && (
              <span className="product-offer-badge">
                <FontAwesomeIcon icon={faTag} style={{ marginRight: 4 }} />
                {discountPct}% OFF
              </span>
            )}
            <span className={product.inStock ? 'stock-badge-in' : 'stock-badge-out'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <span className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} style={{ opacity: i < Math.round(product.rating) ? 1 : 0.25, fontSize: 12 }} />
              ))}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({product.reviewCount})</span>
          </div>
        </div>
        <button
          className="btn-primary-custom"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          style={{ alignSelf: 'center', whiteSpace: 'nowrap', fontSize: '0.875rem', padding: '8px 16px' }}
        >
          <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: 6 }} />
          Add to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="product-card" onClick={goToDetail} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && goToDetail()}>
      {product.images[0] ? (
        <img src={product.images[0]} alt={product.name} className="product-card-img" loading="lazy" />
      ) : (
        <div className="product-card-img-placeholder">
          {categoryIcons[product.category] || '🏥'}
        </div>
      )}
      <div className="product-card-body">
        <div className="product-card-category">{product.category}</div>
        {discountPct && (
          <div className="product-offer-badge">
            <FontAwesomeIcon icon={faTag} style={{ marginRight: 4 }} />
            {discountPct}% OFF
          </div>
        )}
        <h5 className="product-card-title">{product.name}</h5>
        <p className="product-card-desc">{product.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <span className="stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} style={{ opacity: i < Math.round(product.rating) ? 1 : 0.25, fontSize: 12 }} />
            ))}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({product.reviewCount})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span className="product-card-price">LKR {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="product-card-original-price">LKR {product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <span className={product.inStock ? 'stock-badge-in' : 'stock-badge-out'}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <button
          className="btn-primary-custom"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          style={{ marginTop: 12, width: '100%', fontSize: '0.875rem' }}
        >
          <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: 6 }} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
