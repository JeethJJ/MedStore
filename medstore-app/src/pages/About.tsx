import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faAward, faUsers, faLeaf } from '@fortawesome/free-solid-svg-icons';

const values = [
  { icon: faHeartbeat, title: 'Patient First', desc: 'Every product we stock is chosen with patient safety and comfort as the top priority.' },
  { icon: faAward, title: 'Quality Assured', desc: 'We source only certified, internationally approved medical equipment from trusted manufacturers.' },
  { icon: faUsers, title: 'Community Focused', desc: 'We are proud to serve families, clinics, and healthcare professionals across Sri Lanka.' },
  { icon: faLeaf, title: 'Sustainable Care', desc: 'We are committed to responsible sourcing and environmentally conscious operations.' },
];

const About: React.FC = () => (
  <>
    <div className="page-hero">
      <Container>
        <h1>About MedStore</h1>
        <p style={{ opacity: 0.85, marginTop: 8, fontSize: '1.05rem', maxWidth: 500, margin: '8px auto 0' }}>
          Your trusted partner for quality medical equipment in Sri Lanka
        </p>
      </Container>
    </div>

    <Container style={{ paddingBottom: 64 }}>
      {/* Our Story */}
      <Row className="align-items-center g-5 mb-5">
        <Col lg={6}>
          <div style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))', borderRadius: 20, padding: '40px', color: 'white', minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏥</div>
            <h2 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: 12 }}>Our Story</h2>
            <p style={{ opacity: 0.85, lineHeight: 1.8 }}>
              Founded with a clear mission — to make quality healthcare accessible to every Sri Lankan family.
              MedStore was born from a personal experience of struggling to find reliable medical equipment.
            </p>
          </div>
        </Col>
        <Col lg={6}>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 16 }}>
            Dedicated to <span style={{ color: 'var(--primary)' }}>Better Health</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 16 }}>
            MedStore was established to address the growing need for accessible, high-quality medical equipment
            in Sri Lanka. We understand that healthcare is not a luxury — it's a necessity, and every family
            deserves access to the tools that keep them healthy and safe.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 16 }}>
            Our team carefully curates a range of certified products — from everyday monitoring devices to
            specialized mobility aids and hospital-grade equipment — ensuring that whether you're a healthcare
            professional, a caregiver, or a patient, you'll find exactly what you need.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
            We take pride in our personalized customer service, island-wide delivery, and our commitment to
            standing behind every product we sell.
          </p>
        </Col>
      </Row>

      {/* Our Values */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>Our Values</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '8px auto 0' }}>
            The principles that guide everything we do
          </p>
        </div>
        <Row className="g-4">
          {values.map(v => (
            <Col md={6} lg={3} key={v.title}>
              <div className="feature-card" style={{ height: '100%' }}>
                <div className="feature-icon">
                  <FontAwesomeIcon icon={v.icon} />
                </div>
                <h5 style={{ fontWeight: 700, marginBottom: 8 }}>{v.title}</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>{v.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Mission */}
      <div style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))', borderRadius: 20, padding: '48px', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 16 }}>Our Mission</h2>
        <p style={{ opacity: 0.9, maxWidth: 640, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.8 }}>
          "To empower every Sri Lankan with access to certified, affordable medical equipment —
          enabling healthier lives, faster recoveries, and stronger healthcare outcomes for all."
        </p>
      </div>
    </Container>
  </>
);

export default About;
