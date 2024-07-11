// File: components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '1rem', backgroundColor: '#333', color: 'white', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} Nafis Rayan. All rights reserved.</p>
      {/* <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Privacy Policy</a></p>
      <p><a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Terms of Service</a></p> */}
    </footer>
  );
};

export default Footer;