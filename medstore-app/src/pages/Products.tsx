import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList, faSearch, faTimes, faSlidersH, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCategory = searchParams.get('category') || 'All';

  const setCategory = (cat: string) => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break;

    }
    return list;
  }, [activeCategory, search, sort]);

  const clearSearch = () => setSearch('');

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <Container>
          <h1>Medical Equipment</h1>
          <p style={{ opacity: 0.85, marginTop: 8, fontSize: '1.05rem' }}>
            Browse our complete range of certified medical products
          </p>
        </Container>
      </div>

      <Container style={{ paddingBottom: 64 }}>

        {/* ── Mobile: single toggle button ── */}
        <div className="d-md-none mb-3">
          <button
            onClick={() => setFiltersOpen(o => !o)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'white', border: '1.5px solid var(--border)', borderRadius: 12,
              padding: '12px 16px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', color: 'var(--text-main)',
            }}
          >
            <span>
              <FontAwesomeIcon icon={faSlidersH} style={{ marginRight: 8, color: 'var(--primary)' }} />
              Filters &amp; Sort
              {(activeCategory !== 'All' || search || sort !== 'default') && (
                <span style={{ marginLeft: 8, background: 'var(--primary)', color: 'white', borderRadius: '50%', width: 20, height: 20, fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {[activeCategory !== 'All', !!search, sort !== 'default'].filter(Boolean).length}
                </span>
              )}
            </span>
            <FontAwesomeIcon icon={filtersOpen ? faChevronUp : faChevronDown} style={{ color: 'var(--text-muted)' }} />
          </button>

          <Collapse in={filtersOpen}>
            <div>
              <div style={{ background: 'white', borderRadius: 12, border: '1.5px solid var(--border)', padding: 16, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 13 }} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ width: '100%', padding: '9px 32px 9px 32px', border: '1.5px solid var(--border)', borderRadius: 10, outline: 'none', fontSize: '0.9rem' }}
                  />
                  {search && (
                    <button onClick={clearSearch} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                </div>

                {/* Sort + View row */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Form.Select
                    value={sort}
                    onChange={e => setSort(e.target.value as SortOption)}
                    style={{ flex: 1, border: '1.5px solid var(--border)', borderRadius: 10, padding: '9px 12px', fontSize: '0.875rem' }}
                  >
                    <option value="default">Sort: Default</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="name-asc">Name: A–Z</option>
                  </Form.Select>
                  <div style={{ display: 'flex', gap: 4, border: '1.5px solid var(--border)', borderRadius: 10, padding: 3, background: 'var(--background)', flexShrink: 0 }}>
                    <button onClick={() => setView('grid')} style={{ padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', background: view === 'grid' ? 'var(--primary)' : 'transparent', color: view === 'grid' ? 'white' : 'var(--text-muted)' }} title="Grid"><FontAwesomeIcon icon={faTh} /></button>
                    <button onClick={() => setView('list')} style={{ padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', background: view === 'list' ? 'var(--primary)' : 'transparent', color: view === 'list' ? 'white' : 'var(--text-muted)' }} title="List"><FontAwesomeIcon icon={faList} /></button>
                  </div>
                </div>

                {/* Categories as horizontal chips */}
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-muted)', marginBottom: 8 }}>Category</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setCategory(cat); setFiltersOpen(false); }}
                        style={{
                          padding: '5px 14px', borderRadius: 20, border: '1.5px solid',
                          borderColor: activeCategory === cat ? 'var(--primary)' : 'var(--border)',
                          background: activeCategory === cat ? 'var(--primary)' : 'white',
                          color: activeCategory === cat ? 'white' : 'var(--text-muted)',
                          fontWeight: activeCategory === cat ? 700 : 400,
                          fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>

        {/* ── Desktop: full filters bar ── */}
        <div
          className="d-none d-md-flex"
          style={{
            background: 'white', borderRadius: 16, padding: '20px 24px',
            marginBottom: 32, border: '1px solid var(--border)',
            flexWrap: 'wrap', gap: 16, alignItems: 'center',
          }}
        >
          {/* Search */}
          <div style={{ flex: '1 1 220px', position: 'relative', minWidth: 200 }}>
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '9px 36px 9px 36px', border: '1.5px solid var(--border)', borderRadius: 10, outline: 'none', fontSize: '0.9rem', transition: 'border-color 0.15s' }}
            />
            {search && (
              <button onClick={clearSearch} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div style={{ flex: '0 0 auto' }}>
            <Form.Select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              style={{ border: '1.5px solid var(--border)', borderRadius: 10, padding: '9px 14px', fontSize: '0.9rem', minWidth: 170 }}
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
            </Form.Select>
          </div>

          {/* View toggle */}
          <div style={{ display: 'flex', gap: 6, border: '1.5px solid var(--border)', borderRadius: 10, padding: 4, background: 'var(--background)' }}>
            <button onClick={() => setView('grid')} style={{ padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', background: view === 'grid' ? 'var(--primary)' : 'transparent', color: view === 'grid' ? 'white' : 'var(--text-muted)', transition: 'all 0.15s' }} title="Grid view"><FontAwesomeIcon icon={faTh} /></button>
            <button onClick={() => setView('list')} style={{ padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', background: view === 'list' ? 'var(--primary)' : 'transparent', color: view === 'list' ? 'white' : 'var(--text-muted)', transition: 'all 0.15s' }} title="List view"><FontAwesomeIcon icon={faList} /></button>
          </div>
        </div>

        <Row className="g-4">
          {/* ── Desktop: Category Sidebar ── */}
          <Col md={3} lg={2} className="d-none d-md-block">
            <div style={{ background: 'white', borderRadius: 14, padding: 20, border: '1px solid var(--border)', position: 'sticky', top: 80 }}>
              <h6 style={{ fontWeight: 700, marginBottom: 16, color: 'var(--text-main)' }}>Categories</h6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    style={{
                      padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                      background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                      color: activeCategory === cat ? 'white' : 'var(--text-muted)',
                      fontWeight: activeCategory === cat ? 700 : 400,
                      textAlign: 'left', fontSize: '0.875rem', transition: 'all 0.15s',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Col>

          {/* Product Grid/List */}
          <Col xs={12} md={9} lg={10}>
            <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
                Showing <strong>{filtered.length}</strong> products
                {activeCategory !== 'All' && <> in <strong>{activeCategory}</strong></>}
                {search && <> for "<strong>{search}</strong>"</>}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: 16, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
                <h5 style={{ fontWeight: 700 }}>No products found</h5>
                <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search term.</p>
                <button className="btn-primary-custom" onClick={() => { clearSearch(); setCategory('All'); }} style={{ marginTop: 12 }}>
                  Clear Filters
                </button>
              </div>
            ) : view === 'grid' ? (
              <Row className="g-4">
                {filtered.map(product => (
                  <Col xs={12} sm={6} xl={4} key={product.id}>
                    <ProductCard product={product} view="grid" />
                  </Col>
                ))}
              </Row>
            ) : (
              <div>
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} view="list" />
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
