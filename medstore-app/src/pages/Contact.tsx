import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const contactItems = [
  {
    icon: faWhatsapp,
    iconColor: '#25D366',
    title: 'WhatsApp',
    subtitle: 'Chat with us directly',
    value: '+94 741 016 229',
    link: 'https://wa.me/94741016229',
    linkLabel: 'Open WhatsApp Chat',
    isExternal: true,
  },
  {
    icon: faPhone,
    iconColor: 'var(--primary)',
    title: 'Phone',
    subtitle: 'Call us anytime',
    value: '+94 741 016 229',
    link: 'tel:+94741016229',
    linkLabel: 'Call Now',
    isExternal: false,
  },
  {
    icon: faEnvelope,
    iconColor: 'var(--accent)',
    title: 'Email',
    subtitle: 'Send us an email',
    value: 'jihanjeed49@gmail.com',
    link: 'mailto:jihanjeed49@gmail.com',
    linkLabel: 'Send Email',
    isExternal: false,
  },
  {
    icon: faClock,
    iconColor: 'var(--warning)',
    title: 'Working Hours',
    subtitle: 'We are available',
    value: 'Mon – Sat: 9:00 AM – 6:00 PM',
    link: null,
    linkLabel: null,
    isExternal: false,
  },
];

const Contact: React.FC = () => (
  <>
    <div className="page-hero">
      <Container>
        <h1>Contact Us</h1>
        <p style={{ opacity: 0.85, marginTop: 8, fontSize: '1.05rem', maxWidth: 500, margin: '8px auto 0' }}>
          We're here to help. Reach out to us anytime.
        </p>
      </Container>
    </div>

    <Container style={{ paddingBottom: 64 }}>
      {/* Contact Cards */}
      <Row className="g-4 mb-5 justify-content-center">
        {contactItems.map(item => (
          <Col md={6} lg={3} key={item.title}>
            <div
              style={{
                background: 'white', borderRadius: 16, padding: '32px 24px', textAlign: 'center',
                border: '1px solid var(--border)', height: '100%',
                transition: 'transform 0.25s, box-shadow 0.25s',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,119,182,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 16, marginBottom: 16,
                background: 'linear-gradient(135deg, #e9f1fb, #c9dff5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.75rem', color: item.iconColor,
              }}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <h5 style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 8 }}>{item.subtitle}</p>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: 12, fontSize: '0.9rem', wordBreak: 'break-word' }}>{item.value}</p>
              {item.link && item.linkLabel && (
                <a
                  href={item.link}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'inline-block', padding: '8px 20px', borderRadius: 10,
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    color: 'white', fontWeight: 600, fontSize: '0.85rem',
                    transition: 'opacity 0.2s',
                  }}
                >
                  {item.linkLabel}
                </a>
              )}
            </div>
          </Col>
        ))}
      </Row>

      {/* WhatsApp CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #128C7E, #25D366)',
        borderRadius: 20, padding: '48px', color: 'white', textAlign: 'center',
      }}>
        <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '3rem', marginBottom: 16 }} />
        <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 12 }}>
          The Fastest Way to Reach Us
        </h2>
        <p style={{ opacity: 0.9, maxWidth: 480, margin: '0 auto 28px', fontSize: '1rem', lineHeight: 1.8 }}>
          For product enquiries, orders, or any questions — message us on WhatsApp.
          We typically respond within minutes.
        </p>
        <a
          href="https://wa.me/94741016229"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block', padding: '14px 36px', borderRadius: 12,
            background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.5)',
            color: 'white', fontWeight: 700, fontSize: '1.05rem',
            transition: 'background 0.2s',
          }}
        >
          💬 Message Us on WhatsApp
        </a>
      </div>
    </Container>
  </>
);

export default Contact;
