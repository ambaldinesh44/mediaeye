'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);

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
                <li><a href="#" className="active">Home</a></li>
                <li><a href="#">Politics</a></li>
                <li><a href="#">Business</a></li>
                <li><a href="#">Stock Market</a></li>
                <li><a href="#">Sports</a></li>
                <li><a href="#">Crime & Law</a></li>
                <li><a href="#">Health</a></li>
                <li><a href="#">Education</a></li>
                <li><a href="#">Entertainment</a></li>
                <li><a href="#">Lifestyle</a></li>
                <li><a href="#">Environment</a></li>
              </ul>

              <div className="nav-right">
                <span className="live-badge">
                  <span className="live-dot"></span>
                  LIVE
                </span>
                <div className="search-container">
                  <input type="text" className="search-input" placeholder="Search..." />
                  <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
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
                <input type="text" className="search-input" placeholder="Search..." />
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="news-rotator-wrapper">
            <div className="news-rotator">
              <div className="container">
                <div className="news-rotator-container">
                  <div className="news-icon">
                    <img src="images/newsicon.svg" className="img-fluid" />
                  </div>
                  <div className="news-box">
                    <div className="marquee-track">
                      {/* ORIGINAL ITEMS */}
                      <div className="news-item">
                        Huntingdon train stabbing suspects and victims: Are train services suspended?
                      </div>

                      <div className="news-item">
                        British Transport Police have increased security across major rail stations.
                      </div>

                      <div className="news-item">
                        Commuters advised to check train delays before travel today.
                      </div>

                      {/* DUPLICATE ITEMS FOR CONTINUOUS LOOP */}
                      <div className="news-item">
                        Huntingdon train stabbing suspects and victims: Are train services suspended?
                      </div>

                      <div className="news-item">
                        British Transport Police have increased security across major rail stations.
                      </div>

                      <div className="news-item">
                        Commuters advised to check train delays before travel today.
                      </div>
                    </div>
                  </div>
                </div>
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
            <li><a href="#">Home</a></li>
            <li><a href="#">Politics</a></li>
            <li><a href="#">Business</a></li>
            <li><a href="#">Stock Market</a></li>
            <li><a href="#">Sports</a></li>
            <li><a href="#">Crime & Law</a></li>
            <li><a href="#">Health</a></li>
            <li><a href="#">Education</a></li>
            <li><a href="#">Entertainment</a></li>
            <li><a href="#">Lifestyle</a></li>
            <li><a href="#">Environment</a></li>
          </ul>

          <div className="mobile-live">
            <span className="live-badge">
              <span className="live-dot"></span>
              LIVE
            </span>
          </div>

          <div className="mobile-search">
            <div className="search-container">
              <input type="text" className="search-input" placeholder="Search..." />
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5">
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
