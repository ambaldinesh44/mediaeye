'use client';

import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          {/* Left Section */}
          <div className="footer-col footer-about">
            <Link href="/">
              <img src="/images/logo-white.svg" className="footer-logo" alt="Logo" />
            </Link>

            <p className="footer-text">
              Your trusted source for breaking news, in-depth analysis,
              and comprehensive coverage of the stories that shape our world.
            </p>
          </div>

          {/* Middle Section */}
          <div className="footer-col">
            <h4 className="footer-title">Sections</h4>
            <ul className="footer-list">
              <li>
                <Link href="/world">
                  <img src="/images/world-menu.svg" className="img-fluid" alt="World" /> World
                </Link>
              </li>
              <li>
                <Link href="/technology">
                  <img src="/images/technology-menu.svg" className="img-fluid" alt="Technology" /> Technology
                </Link>
              </li>
              <li>
                <Link href="/sports">
                  <img src="/images/sports-menu.svg" className="img-fluid" alt="Sports" /> Sports
                </Link>
              </li>
              <li>
                <Link href="/business">
                  <img src="/images/business-menu.svg" className="img-fluid" alt="Business" /> Business
                </Link>
              </li>
              <li>
                <Link href="/health">
                  <img src="/images/health-menu.svg" className="img-fluid" alt="Health" /> Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="footer-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-list">
              <li><Link href="/about-us">About</Link></li>
              <li><Link href="/contact-us">Contact</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/privacy-policy-2">Privacy</Link></li>
              <li><Link href="/terms-conditions">Terms</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2025 NewsHub. All rights reserved.</p>
          <p>Made with care for informed readers</p>
        </div>
      </footer>
    </>
  );
};
