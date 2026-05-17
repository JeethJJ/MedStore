import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import type { CustomerDetails } from '../types';

const WHATSAPP_NUMBER = '94741016229';

function buildWhatsAppMessage(customer: CustomerDetails, items: ReturnType<typeof useCart>['state']['items'], total: number): string {
  const itemLines = items
    .map(item => {
      const variant = item.selectedVariant ? ` (${item.selectedVariant.label})` : '';
      return `• ${item.product.name}${variant} × ${item.quantity} — LKR ${(item.product.price * item.quantity).toLocaleString()}`;
    })
    .join('\n');

  const message = [
    '🛒 *New Order from MedStore*',
    '',
    '👤 *Customer Details*',
    `Name: ${customer.name}`,
    `WhatsApp: ${customer.whatsapp}`,
    `Delivery Address: ${customer.address}`,
    customer.notes ? `Notes: ${customer.notes}` : null,
    '',
    '📦 *Order Items*',
    itemLines,
    '',
    `💰 *Total: LKR ${total.toLocaleString()}*`,
    `💳 *Payment: Cash on Delivery*`,
    '',
    '✅ Please confirm this order. Thank you!',
  ]
    .filter(line => line !== null)
    .join('\n');

  return message;
}

const Checkout: React.FC = () => {
  const { state, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<CustomerDetails>({
    name: '',
    whatsapp: '',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (state.items.length === 0 && !orderPlaced) {
    return (
      <Container style={{ paddingTop: 80, textAlign: 'center' }}>
        <h4 style={{ fontWeight: 700 }}>Your cart is empty.</h4>
        <Link to="/products">
          <button className="btn-primary-custom" style={{ marginTop: 16, padding: '12px 28px' }}>Browse Products</button>
        </Link>
      </Container>
    );
  }

  const validate = (): boolean => {
    const errs: Partial<CustomerDetails> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.whatsapp.trim()) {
      errs.whatsapp = 'WhatsApp number is required';
    } else if (!/^\+?[\d\s-]{7,15}$/.test(form.whatsapp.trim())) {
      errs.whatsapp = 'Enter a valid phone number';
    }
    if (!form.address.trim()) errs.address = 'Delivery address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CustomerDetails]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildWhatsAppMessage(form, state.items, totalPrice);
    const encodedMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    // Clear cart and show success state
    clearCart();
    setOrderPlaced(true);

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  if (orderPlaced) {
    return (
      <>
        <div className="page-hero">
          <Container><h1>Order Placed!</h1></Container>
        </div>
        <Container style={{ paddingBottom: 64 }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '60px 20px', border: '1px solid var(--border)', maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ color: '#2ec4b6', fontSize: '4rem', marginBottom: 20 }}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <h3 style={{ fontWeight: 800, marginBottom: 12 }}>Thank you, {form.name}!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 8 }}>
              Your order has been sent to us via WhatsApp. We'll confirm your order and arrange delivery shortly.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '0.875rem' }}>
              If WhatsApp didn't open automatically, please{' '}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary)', fontWeight: 600 }}
              >
                click here
              </a>{' '}
              to contact us.
            </p>
            <button className="btn-primary-custom" onClick={() => navigate('/')} style={{ padding: '12px 28px', fontSize: '1rem', borderRadius: 12 }}>
              Back to Home
            </button>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <div className="page-hero">
        <Container>
          <h1>Checkout</h1>
          <p style={{ opacity: 0.85, marginTop: 8 }}>Complete your order details below</p>
        </Container>
      </div>

      <Container style={{ paddingBottom: 64 }}>
        <button
          onClick={() => navigate('/cart')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', marginBottom: 24, padding: 0 }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Cart
        </button>

        <Form onSubmit={handlePlaceOrder} noValidate>
          <Row className="g-4">
            {/* Customer Form */}
            <Col lg={7}>
              <div className="checkout-form-section">
                <h5 style={{ fontWeight: 700, marginBottom: 24 }}>Delivery & Contact Details</h5>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600 }}>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Ahmed Jihan"
                    isInvalid={!!errors.name}
                    style={{ borderRadius: 10, padding: '10px 14px', border: '1.5px solid var(--border)' }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600 }}>WhatsApp Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="e.g. +94 77 123 4567"
                    isInvalid={!!errors.whatsapp}
                    style={{ borderRadius: 10, padding: '10px 14px', border: '1.5px solid var(--border)' }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.whatsapp}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600 }}>Delivery Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your full delivery address including city"
                    isInvalid={!!errors.address}
                    style={{ borderRadius: 10, padding: '10px 14px', border: '1.5px solid var(--border)', resize: 'vertical' }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600 }}>Notes / Special Instructions <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions for your order..."
                    style={{ borderRadius: 10, padding: '10px 14px', border: '1.5px solid var(--border)', resize: 'vertical' }}
                  />
                </Form.Group>

                {/* Payment Info */}
                <div style={{ background: 'var(--background)', borderRadius: 12, padding: '16px 20px', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>💳 Payment Method</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--primary)' }}>Cash on Delivery</strong> — Pay when your order arrives at your doorstep.
                  </div>
                </div>
              </div>
            </Col>

            {/* Order Summary */}
            <Col lg={5}>
              <div className="order-summary-card">
                <h5 style={{ fontWeight: 700, marginBottom: 20 }}>Order Summary</h5>

                <div style={{ maxHeight: 260, overflowY: 'auto', marginBottom: 16 }}>
                  {state.items.map(item => (
                    <div
                      key={`${item.product.id}-${item.selectedVariant?.label}`}
                      style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}
                    >
                      {item.product.images[0] ? (
                        <img src={item.product.images[0]} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)' }} />
                      ) : (
                        <div style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🏥</div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.product.name}</div>
                        {item.selectedVariant && <div style={{ fontSize: '0.72rem', opacity: 0.7 }}>{item.selectedVariant.label}</div>}
                        <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>× {item.quantity}</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, flexShrink: 0 }}>LKR {(item.product.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 14, marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', opacity: 0.85, marginBottom: 6 }}>
                    <span>Items ({totalItems})</span>
                    <span>LKR {totalPrice.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', opacity: 0.85, marginBottom: 6 }}>
                    <span>Delivery</span>
                    <span style={{ color: '#90e0ef' }}>Cash on Delivery</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.3rem', marginBottom: 24, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 14 }}>
                  <span>Total</span>
                  <span>LKR {totalPrice.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%', padding: '14px', fontSize: '1rem', borderRadius: 12,
                    background: '#25D366', border: 'none', color: 'white', fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '1.2rem' }} />
                  Place Order via WhatsApp
                </button>
                <p style={{ fontSize: '0.75rem', opacity: 0.65, textAlign: 'center', marginTop: 10 }}>
                  WhatsApp will open with your order pre-filled. Tap Send to confirm.
                </p>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default Checkout;
