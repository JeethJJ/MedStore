import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCross, faBars } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';

const AppNavbar: React.FC = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      style={{
        background: 'linear-gradient(135deg, #023e8a 0%, #0077b6 100%)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '10px 0',
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-logo" onClick={() => setExpanded(false)}>
          <div className="logo-icon">
            <FontAwesomeIcon icon={faCross} style={{ color: '#90e0ef' }} />
          </div>
          <div className="logo-text">
            Med<span>Store</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-nav"
          onClick={() => setExpanded(!expanded)}
          style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
        >
          <FontAwesomeIcon icon={faBars} style={{ color: 'white' }} />
        </Navbar.Toggle>

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-2" style={{ gap: '4px' }}>
            {[
              { path: '/', label: 'Home', exact: true },
              { path: '/products', label: 'Products', exact: false },
              { path: '/about', label: 'About', exact: false },
              { path: '/contact', label: 'Contact', exact: false },
            ].map(({ path, label, exact }) => (
              <NavLink
                key={path}
                to={path}
                end={exact}
                onClick={() => setExpanded(false)}
                style={({ isActive }) => ({
                  color: 'white',
                  fontWeight: isActive ? 700 : 500,
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  transition: 'background 0.15s',
                  display: 'block',
                })}
              >
                {label}
              </NavLink>
            ))}

            <button
              className="cart-badge-btn"
              onClick={() => { navigate('/cart'); setExpanded(false); }}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '10px',
                color: 'white',
                padding: '8px 18px',
                cursor: 'pointer',
                fontWeight: 600,
                marginLeft: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="cart-count-badge">{totalItems}</span>
              )}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
