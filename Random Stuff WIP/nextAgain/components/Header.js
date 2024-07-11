// File: components/Header.js

import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ display: 'inline', marginRight: '1rem' }}>
            <Link href="/" passHref>
              Home
            </Link>
          </li>
          <li style={{ display: 'inline', marginRight: '1rem' }}>
            <Link href="/about" passHref>
              About Us
            </Link>
          </li>
          <li style={{ display: 'inline', marginRight: '1rem' }}>
            <Link href="/services" passHref>
              Services
            </Link>
          </li>
          <li style={{ display: 'inline', marginRight: '1rem' }}>
            <Link href="/contact" passHref>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;