import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { logoSrc } from '../constants/assets';

const Footer: React.FC = () => (
  <footer className="site-footer">
    <Container>
      <Row className="g-4">
        {/* Brand */}
        <Col md={4}>
          <div className="d-flex align-items-center gap-2 mb-3">
            <img src={logoSrc} alt="Med Store Medicals" className="footer-logo-image" />
            <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'white' }}>
              Med Store <span style={{ color: '#90e0ef' }}>Medicals</span>
            </span>
          </div>
          <p className="footer-brand-desc">
            Your trusted partner for quality medical equipment and healthcare products.
            We are committed to improving lives through accessible, reliable medical supplies.
          </p>
        </Col>

        {/* Quick Links */}
        <Col md={2} xs={6}>
          <h6 style={{ color: 'white', fontWeight: 700, marginBottom: 16 }}>Quick Links</h6>
          {[
            { to: '/', label: 'Home' },
            { to: '/products', label: 'Products' },
            { to: '/about', label: 'About Us' },
            { to: '/contact', label: 'Contact' },
            { to: '/cart', label: 'Cart' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="footer-link">{label}</Link>
          ))}
        </Col>

        {/* Categories */}
        <Col md={2} xs={6}>
          <h6 style={{ color: 'white', fontWeight: 700, marginBottom: 16 }}>Categories</h6>
          {['Monitoring', 'Diagnostics', 'Mobility', 'Respiratory', 'First Aid', 'Therapy'].map(cat => (
            <Link key={cat} to={`/products?category=${cat}`} className="footer-link">{cat}</Link>
          ))}
        </Col>

        {/* Contact */}
        <Col md={4}>
          <h6 style={{ color: 'white', fontWeight: 700, marginBottom: 16 }}>Contact Us</h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a
              href="https://wa.me/94786574512"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <FontAwesomeIcon icon={faWhatsapp} style={{ color: '#25D366', fontSize: 18 }} />
              +94 786 574 512
            </a>
            <a
              href="mailto:medstore4096@gmail.com"
              className="footer-link"
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <FontAwesomeIcon icon={faEnvelope} style={{ color: '#90e0ef', fontSize: 16 }} />
              medstore4096@gmail.com
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#90e0ef' }} />
              Sri Lanka
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
              <FontAwesomeIcon icon={faPhone} style={{ color: '#90e0ef' }} />
              +94 786 574 512
            </span>
          </div>
        </Col>
      </Row>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Med Store Medicals. All rights reserved. | Quality Medical Equipment in Sri Lanka</p>
      </div>
    </Container>
  </footer>
);

export default Footer;
