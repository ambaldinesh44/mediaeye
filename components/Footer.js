'use client';

import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <>
      <footer className="footer bg-dark text-light py-4 py-md-5 mt-5">
        <div className="container-fluid px-3 px-md-4">
          <div className="row g-4 g-md-5">
            {/* Left Column - Logo and Description */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="footer-brand mb-3">
                <Image
                  src="/logo.png"
                  alt="Media Eye News"
                  width={150}
                  height={60}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className="footer-description text-muted">
                Your trusted source for breaking news, in-depth analysis, and comprehensive coverage of the stories that shape our world.
              </p>
            </div>

            {/* Middle Column - Sections */}
            <div className="col-12 col-md-6 col-lg-4">
              <h5 className="footer-heading mb-3 mb-md-4">Sections</h5>
              <ul className="footer-links list-unstyled">
                <li className="mb-2">
                  <Link href="/world" className="footer-link text-muted d-flex align-items-center">
                    <i className="bi bi-globe me-2"></i>
                    World
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/technology" className="footer-link text-muted d-flex align-items-center">
                    <i className="bi bi-cpu me-2"></i>
                    Technology
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/sports" className="footer-link text-muted d-flex align-items-center">
                    <i className="bi bi-trophy me-2"></i>
                    Sports
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/business" className="footer-link text-muted d-flex align-items-center">
                    <i className="bi bi-briefcase me-2"></i>
                    Business
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/health" className="footer-link text-muted d-flex align-items-center">
                    <i className="bi bi-heart-pulse me-2"></i>
                    Health
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Column - Company */}
            <div className="col-12 col-md-6 col-lg-4">
              <h5 className="footer-heading mb-3 mb-md-4">Company</h5>
              <ul className="footer-links list-unstyled">
                <li className="mb-2">
                  <Link href="/about" className="footer-link text-muted">
                    About
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/contact" className="footer-link text-muted">
                    Contact
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/careers" className="footer-link text-muted">
                    Careers
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/privacy" className="footer-link text-muted">
                    Privacy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/terms" className="footer-link text-muted">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar - Copyright */}
          <div className="row mt-4 mt-md-5 pt-3 pt-md-4 border-top border-secondary">
            <div className="col-12 text-center text-md-start">
              <p className="text-muted mb-0 footer-copyright">
                &copy; {new Date().getFullYear()} Media Eye News. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background-color: #1a1d29 !important;
        }

        .footer-heading {
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .footer-description {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #9ca3af;
        }

        .footer-link {
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
          color: #9ca3af;
        }

        .footer-link:hover {
          color: #dc3545;
        }

        .footer-copyright {
          font-size: 0.875rem;
        }

        /* Tablet (768px and up) */
        @media (min-width: 768px) {
          .footer-heading {
            font-size: 1.25rem;
          }

          .footer-description {
            font-size: 1rem;
          }

          .footer-link {
            font-size: 0.95rem;
          }
        }

        /* Desktop (992px and up) */
        @media (min-width: 992px) {
          .footer-heading {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </>
  );
};
