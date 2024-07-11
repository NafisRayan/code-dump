// components/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#333', padding: '10px 20px', borderBottom: '2px solid #ff6347' }}>
      <nav>
        <ul style={{ display: 'flex', justifyContent: 'space-around', listStyleType: 'none', margin: 0, padding: 0 }}>
          <li><Link href="/" style={{ color: '#00ff00', textDecoration: 'none' }}>Home</Link></li>
          <li><Link href="/about" style={{ color: '#0000ff', textDecoration: 'none' }}>About Us</Link></li>
          <li><Link href="/services" style={{ color: '#ff0000', textDecoration: 'none' }}>Services</Link></li>
          <li><Link href="/contact" style={{ color: '#ffff00', textDecoration: 'none' }}>Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;