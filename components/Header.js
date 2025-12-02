'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const openMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  return (
    <>
      <div>
        <nav className="top-navbar">
          <div className="navbar-container">
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div className="logo-section">
{/* 
                <Image
              src="/logo.png"
              alt="Media Eye News"
              width={120}
              height={50}
              priority
              style={{ objectFit: 'contain' }}
            /> */}
                <img src="/images/logo-black.svg" alt="logo" className="img-fluid" /> 
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              <ul className="nav-links">
                <li><Link href="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
                <li><Link href="/category/politics" className={isActive('/category/politics') ? 'active' : ''}>Politics</Link></li>
                <li><Link href="/category/business" className={isActive('/category/business') ? 'active' : ''}>Business</Link></li>
                <li><Link href="/category/stock-market" className={isActive('/category/stock-market') ? 'active' : ''}>Stock Market</Link></li>
                <li><Link href="/category/sports" className={isActive('/category/sports') ? 'active' : ''}>Sports</Link></li>
                <li><Link href="/category/crime" className={isActive('/category/crime') ? 'active' : ''}>Crime & Law</Link></li>
                <li><Link href="/category/health" className={isActive('/category/health') ? 'active' : ''}>Health</Link></li>
                <li><Link href="/category/education" className={isActive('/category/education') ? 'active' : ''}>Education</Link></li>
                <li><Link href="/category/entertaintment" className={isActive('/category/entertaintment') ? 'active' : ''}>Entertainment</Link></li>
                <li><Link href="/category/lifestyle" className={isActive('/category/lifestyle') ? 'active' : ''}>Lifestyle</Link></li>
                <li><Link href="/category/environment-climate" className={isActive('/category/environment-climate') ? 'active' : ''}>environment-climate</Link></li>
              </ul>

              <div className="nav-right">
                <span className="live-badge">
                  <span className="live-dot"></span>
                  LIVE
                </span>
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <svg
                    className="search-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    onClick={handleSearch}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button className="mobile-toggle" onClick={openMenu}>
              ☰
            </button>

            {/* Mobile/Tablet Nav Right (LIVE + Search) */}
            <div className="mobile-nav-right">
              <span className="live-badge">
                <span className="live-dot"></span>
                LIVE
              </span>
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <svg
                  className="search-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  onClick={handleSearch}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
            </div>
          </div>

        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} id="menuOverlay" onClick={closeMenu}></div>

        {/* Mobile Menu (Slides from Right) */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`} id="mobileMenu">
          <div className="mobile-menu-header">
            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Menu</span>
            <button className="mobile-menu-close" onClick={closeMenu}>×</button>
          </div>

          <ul className="mobile-nav-links">
            <li><Link href="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li><Link href="/category/politics" className={isActive('/category/politics') ? 'active' : ''}>Politics</Link></li>
            <li><Link href="/category/business" className={isActive('/category/business') ? 'active' : ''}>Business</Link></li>
            <li><Link href="/category/stock-market" className={isActive('/category/stock-market') ? 'active' : ''}>Stock Market</Link></li>
            <li><Link href="/category/sports" className={isActive('/category/sports') ? 'active' : ''}>Sports</Link></li>
            <li><Link href="/category/crime" className={isActive('/category/crime') ? 'active' : ''}>Crime & Law</Link></li>
            <li><Link href="/category/health" className={isActive('/category/health') ? 'active' : ''}>Health</Link></li>
            <li><Link href="/category/education" className={isActive('/category/education') ? 'active' : ''}>Education</Link></li>
            <li><Link href="/category/entertaintment" className={isActive('/category/entertaintment') ? 'active' : ''}>Entertainment</Link></li>
            <li><Link href="/category/lifestyle" className={isActive('/category/lifestyle') ? 'active' : ''}>Lifestyle</Link></li>
            <li><Link href="/category/environment-climate" className={isActive('/category/environment-climate') ? 'active' : ''}>Environment</Link></li>
          </ul>

          <div className="mobile-live">
            <span className="live-badge">
              <span className="live-dot"></span>
              LIVE
            </span>
          </div>

          <div className="mobile-search">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <svg
                className="search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                onClick={handleSearch}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
