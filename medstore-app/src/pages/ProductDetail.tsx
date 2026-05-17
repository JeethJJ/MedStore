import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart, faArrowLeft, faStar, faTag,
  faCheckCircle, faTimesCircle, faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import type { ProductVariant } from '../types';
import ProductCard from '../components/ProductCard';
import { logoSrc } from '../constants/assets';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = products.find(p => p.id === id);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants[0]
  );
  const [activeImage, setActiveImage] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) {
    return (
      <Container style={{ paddingTop: 80, textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>😕</div>
        <h3 style={{ fontWeight: 700 }}>Product not found</h3>
        <button className="btn-primary-custom" onClick={() => navigate('/products')} style={{ marginTop: 16 }}>
          Back to Products
        </button>
      </Container>
    );
  }

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addItem(product, selectedVariant);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '14px 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
            <span>/</span>
            <Link to="/products" style={{ color: 'var(--text-muted)' }}>Products</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category}`} style={{ color: 'var(--text-muted)' }}>{product.category}</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.name}</span>
          </div>
        </Container>
      </div>

      <Container style={{ padding: '40px 0 64px' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', marginBottom: 24, padding: 0 }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>

        <Row className="g-5">
          {/* Images */}
          <Col md={5}>
            <div style={{ position: 'sticky', top: 90 }}>
              {/* Main Image */}
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 12, background: '#e9f1fb' }}>
                {product.images.length > 0 ? (
                  <img
                    src={`${import.meta.env.BASE_URL.slice(0, -1)}${product.images[activeImage]}`}
                    alt={product.name}
                    style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', color: 'var(--primary)' }}>
                    <img src={logoSrc} alt="MedStore" className="product-detail-logo-placeholder" />
                  </div>
                )}
                {product.images.length > 1 && (
                  <>
                    <button onClick={() => setActiveImage(i => (i - 1 + product.images.length) % product.images.length)}
                      style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button onClick={() => setActiveImage(i => (i + 1) % product.images.length)}
                      style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={`${import.meta.env.BASE_URL.slice(0, -1)}${img}`}
                      alt=""
                      onClick={() => setActiveImage(i)}
                      style={{
                        width: 72, height: 56, objectFit: 'cover', borderRadius: 8, cursor: 'pointer',
                        border: `2px solid ${activeImage === i ? 'var(--primary)' : 'var(--border)'}`,
                        transition: 'border-color 0.15s',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </Col>

          {/* Product Info */}
          <Col md={7}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              {product.category}
            </div>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 12, lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} style={{ opacity: i < Math.round(product.rating) ? 1 : 0.2, fontSize: 14 }} />
                ))}
              </span>
              <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
                LKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    LKR {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="product-offer-badge" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>
                    <FontAwesomeIcon icon={faTag} style={{ marginRight: 4 }} />
                    {discountPct}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <div style={{ marginBottom: 20 }}>
              {product.inStock ? (
                <span className="stock-badge-in">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 4 }} />
                  In Stock ({product.stockCount} available)
                </span>
              ) : (
                <span className="stock-badge-out">
                  <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: 4 }} />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24, fontSize: '0.95rem' }}>
              {product.description}
            </p>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>
                  {product.variants[0].color ? 'Colour' : 'Type / Size'}:
                  {selectedVariant && <span style={{ fontWeight: 400, color: 'var(--primary)', marginLeft: 6 }}>{selectedVariant.label}</span>}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.variants.map(v => (
                    <button
                      key={v.label}
                      className={`variant-btn${selectedVariant?.label === v.label ? ' active' : ''}`}
                      onClick={() => setSelectedVariant(v)}
                    >
                      {v.color && (
                        <span style={{
                          display: 'inline-block', width: 12, height: 12, borderRadius: '50%',
                          background: v.color.toLowerCase(), marginRight: 6, border: '1px solid rgba(0,0,0,0.15)',
                        }} />
                      )}
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Active Offers */}
            {product.offers.length > 0 && (
              <div style={{ background: 'linear-gradient(135deg, #fff3e0, #ffe8c0)', border: '1px solid #f59e0b', borderRadius: 12, padding: '14px 18px', marginBottom: 24 }}>
                <div style={{ fontWeight: 700, color: '#b45309', marginBottom: 8, fontSize: '0.9rem' }}>
                  🎁 Active Offers on this Product
                </div>
                {product.offers.map(offer => (
                  <div key={offer.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span className="product-offer-badge" style={{ fontSize: '0.75rem' }}>{offer.discount}% OFF</span>
                    <span style={{ fontSize: '0.875rem', color: '#92400e', fontWeight: 500 }}>{offer.title} — {offer.description}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                className="btn-primary-custom"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                style={{ flex: '1 1 200px', padding: '14px 28px', fontSize: '1rem', borderRadius: 12 }}
              >
                <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: 8 }} />
                {addedFeedback ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <Link to="/cart" style={{ flex: '0 0 auto' }}>
                <button className="btn-outline-primary-custom" style={{ padding: '14px 24px', borderRadius: 12, height: '100%' }}>
                  View Cart
                </button>
              </Link>
            </div>
          </Col>
        </Row>

        {/* Long Description */}
        <div style={{ background: 'white', borderRadius: 16, padding: '32px', border: '1px solid var(--border)', marginTop: 48 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Product Details</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>{product.longDescription}</p>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <div className="section-header">
              <div className="section-header-line" />
              <h3 style={{ fontWeight: 700, margin: 0 }}>Related Products</h3>
            </div>
            <Row className="g-4">
              {related.map(p => (
                <Col xs={12} sm={6} lg={3} key={p.id}>
                  <ProductCard product={p} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </>
  );
};

export default ProductDetail;
