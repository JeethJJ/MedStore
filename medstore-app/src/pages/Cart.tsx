import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowLeft, faArrowRight, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { logoSrc } from '../constants/assets';

const Cart: React.FC = () => {
  const { state, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (state.items.length === 0) {
    return (
      <>
        <div className="page-hero">
          <Container><h1>Your Cart</h1></Container>
        </div>
        <Container style={{ paddingBottom: 64, textAlign: 'center' }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '60px 20px', border: '1px solid var(--border)', maxWidth: 480, margin: '0 auto' }}>
            <div style={{ fontSize: '4rem', marginBottom: 20 }}>
              <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'var(--border)' }} />
            </div>
            <h4 style={{ fontWeight: 700, marginBottom: 12 }}>Your cart is empty</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Browse our products and add items to your cart.</p>
            <Link to="/products">
              <button className="btn-primary-custom" style={{ padding: '12px 28px', fontSize: '1rem', borderRadius: 12 }}>
                Browse Products
              </button>
            </Link>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <div className="page-hero">
        <Container>
          <h1>Your Cart</h1>
          <p style={{ opacity: 0.85, marginTop: 8 }}>{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </Container>
      </div>

      <Container style={{ paddingBottom: 64 }}>
        <Row className="g-4">
          {/* Cart Items */}
          <Col lg={8}>
            <button
              onClick={() => navigate(-1)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', marginBottom: 20, padding: 0 }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Continue Shopping
            </button>

            {state.items.map(item => (
              <div
                key={`${item.product.id}-${item.selectedVariant?.label}`}
                className="cart-item-row"
              >
                {/* Image */}
                {item.product.images[0] ? (
                  <img src={`${import.meta.env.BASE_URL.slice(0, -1)}${item.product.images[0]}`} alt={item.product.name} className="cart-item-img" />
                ) : (
                  <div style={{ width: 80, height: 80, borderRadius: 8, background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                    <img src={logoSrc} alt="" className="cart-item-logo-placeholder" />
                  </div>
                )}

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link to={`/products/${item.product.id}`}>
                    <h6 style={{ fontWeight: 700, margin: 0, color: 'var(--text-main)', lineHeight: 1.3 }}>{item.product.name}</h6>
                  </Link>
                  {item.selectedVariant && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Variant: {item.selectedVariant.label}
                    </div>
                  )}
                  <div style={{ fontWeight: 700, color: 'var(--primary)', marginTop: 4 }}>
                    LKR {item.product.price.toLocaleString()}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.label)}
                  >
                    −
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.label)}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div style={{ textAlign: 'right', minWidth: 100 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                    LKR {(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product.id, item.selectedVariant?.label)}
                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: 6, borderRadius: 6, transition: 'background 0.15s' }}
                  title="Remove item"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </Col>

          {/* Order Summary */}
          <Col lg={4}>
            <div className="order-summary-card">
              <h5 style={{ fontWeight: 700, marginBottom: 20 }}>Order Summary</h5>

              {state.items.map(item => (
                <div
                  key={`${item.product.id}-${item.selectedVariant?.label}`}
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.875rem', opacity: 0.9 }}
                >
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>LKR {(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', margin: '16px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.9rem', opacity: 0.85 }}>
                <span>Subtotal ({totalItems} items)</span>
                <span>LKR {totalPrice.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.9rem', opacity: 0.85 }}>
                <span>Delivery</span>
                <span style={{ color: '#90e0ef' }}>Cash on Delivery</span>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', margin: '16px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', marginBottom: 24 }}>
                <span>Total</span>
                <span>LKR {totalPrice.toLocaleString()}</span>
              </div>

              <button
                className="btn-primary-custom"
                onClick={() => navigate('/checkout')}
                style={{ width: '100%', padding: '14px', fontSize: '1rem', borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)' }}
              >
                Proceed to Checkout
                <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: 8 }} />
              </button>

              <Link to="/products">
                <button style={{ width: '100%', marginTop: 10, padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 12, color: 'white', cursor: 'pointer', fontSize: '0.875rem' }}>
                  Continue Shopping
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
