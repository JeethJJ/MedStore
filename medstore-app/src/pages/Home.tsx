import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldAlt, faTruck, faHeadset, faMedal,
  faArrowRight, faStethoscope,
} from '@fortawesome/free-solid-svg-icons';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const features = [
  {
    icon: faShieldAlt,
    title: 'Certified Quality',
    desc: 'All products meet international medical standards and certifications.',
  },
  {
    icon: faTruck,
    title: 'Island-Wide Delivery',
    desc: 'Fast and reliable delivery across all of Sri Lanka.',
  },
  {
    icon: faHeadset,
    title: '24/7 Support',
    desc: 'Our expert team is always available to assist you via WhatsApp.',
  },
  {
    icon: faMedal,
    title: 'Trusted Brand',
    desc: 'Serving thousands of healthcare professionals and families.',
  },
];

const Home: React.FC = () => {
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="hero-content">
                <div className="hero-badge">
                  <FontAwesomeIcon icon={faStethoscope} style={{ marginRight: 8 }} />
                  Sri Lanka's Trusted Medical Store
                </div>
                <h1 className="hero-title">
                  Quality Medical<br />
                  <span>Equipment</span> for<br />
                  Better Health
                </h1>
                <p className="hero-subtitle">
                  Shop from our wide range of certified medical devices, mobility aids,
                  diagnostics, and healthcare supplies — delivered to your door.
                </p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <Link to="/products">
                    <button className="btn-primary-custom" style={{ fontSize: '1rem', padding: '12px 28px', borderRadius: 12 }}>
                      Shop Now
                      <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: 8 }} />
                    </button>
                  </Link>
                  <Link to="/contact">
                    <button className="btn-outline-primary-custom" style={{
                      fontSize: '1rem', padding: '12px 28px', borderRadius: 12,
                      color: 'white', borderColor: 'rgba(255,255,255,0.5)',
                    }}>
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-flex justify-content-center align-items-center">
              <div style={{
                width: 380, height: 380, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '2px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10rem',
              }}>
                🏥
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats */}
      <section style={{ background: 'white', padding: '32px 0', borderBottom: '1px solid var(--border)' }}>
        <Container>
          <Row className="text-center g-3">
            {[
              { value: '500+', label: 'Products' },
              { value: '10,000+', label: 'Happy Customers' },
              { value: '5+', label: 'Years Experience' },
              { value: '24/7', label: 'Customer Support' },
            ].map(stat => (
              <Col xs={6} md={3} key={stat.label}>
                <div style={{ fontWeight: 800, fontSize: '1.8rem', color: 'var(--primary)' }}>{stat.value}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>{stat.label}</div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section style={{ padding: '64px 0' }}>
        <Container>
          <div className="section-header" style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--text-main)' }}>
              Why Choose <span style={{ color: 'var(--primary)' }}>MedStore</span>?
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 480, marginTop: 8 }}>
              We are dedicated to providing the highest quality medical equipment with exceptional service.
            </p>
          </div>
          <Row className="g-4">
            {features.map(f => (
              <Col md={6} lg={3} key={f.title}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={f.icon} />
                  </div>
                  <h5 style={{ fontWeight: 700, marginBottom: 8 }}>{f.title}</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>{f.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '0 0 64px' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div className="section-header" style={{ margin: 0 }}>
              <div className="section-header-line" />
              <div>
                <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', margin: 0 }}>Featured Products</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>Our most popular medical equipment</p>
              </div>
            </div>
            <Link to="/products">
              <button className="btn-outline-primary-custom" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>
                View All Products
                <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: 8 }} />
              </button>
            </Link>
          </div>
          <Row className="g-4">
            {featured.map(product => (
              <Col xs={12} sm={6} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Banner */}
      <section style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))', padding: '64px 0', color: 'white' }}>
        <Container className="text-center">
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', marginBottom: 16 }}>
            Need Help Choosing the Right Equipment?
          </h2>
          <p style={{ opacity: 0.85, maxWidth: 480, margin: '0 auto 28px', fontSize: '1.05rem' }}>
            Our medical experts are available on WhatsApp to guide you to the best product for your needs.
          </p>
          <a href="https://wa.me/94741016229" target="_blank" rel="noopener noreferrer">
            <button className="btn-primary-custom" style={{
              padding: '14px 32px', fontSize: '1rem', borderRadius: 12,
              background: '#25D366', border: 'none',
            }}>
              💬 Chat on WhatsApp
            </button>
          </a>
        </Container>
      </section>
    </>
  );
};

export default Home;
