'use client';

import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  return (
    <>
      {/* Single Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-2">
        <div className="container-fluid">
          {/* Logo */}
          <Link href="/" className="navbar-brand">
            <Image
              src="/logo.png"
              alt="Media Eye News"
              width={120}
              height={50}
              priority
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links and Right Side */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/politics">Politics</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/business">Business</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/stock-market">Stock Market</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/sports">Sports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/crime">Crime & Law</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/health">Health</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/education">Education</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/entertainment">Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/lifestyle">Lifestyle</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/environment">Environment</Link>
              </li>
            </ul>

            {/* Right Side: Live Badge and Search */}
            <div className="d-flex align-items-center gap-3">
              {/* Live Badge */}
              <span className="badge bg-danger d-flex align-items-center gap-1 px-2 py-1">
                <span className="live-dot"></span>
                LIVE
              </span>

              {/* Search Bar */}
              <form className="d-flex" role="search" action="/" method="GET">
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  name="s"
                  style={{ width: '200px' }}
                />
                <button className="btn btn-sm btn-outline-secondary ms-1" type="submit">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Breaking News Ticker */}
      <div className="breaking-news border-bottom py-2">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <span className="badge bg-danger me-2">🔴</span>
            <div className="ticker-content">
              <marquee behavior="scroll" direction="left" scrollamount="5">
                Huntingdon train stabbing suspects and victims: Are train services suspended? Police arrest two after multiple injuries at Huntingdon station.
              </marquee>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .live-dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .navbar-nav .nav-link {
          padding: 0.5rem 0.75rem;
          color: #333;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
        }

        .navbar-nav .nav-link:hover {
          color: #dc3545;
        }

        .ticker-content {
          flex: 1;
          overflow: hidden;
        }

        .breaking-news {
          background: #fff3cd;
        }

        .navbar {
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
      `}</style>
    </>
  );
};
