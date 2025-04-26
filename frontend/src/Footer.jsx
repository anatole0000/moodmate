import React from 'react';

const Footer = () => (
  <footer className="text-center py-3" style={{ backgroundColor: '#f8f9fa', color: '#6c757d' }}>
    <small>© {new Date().getFullYear()} MoodMate. All rights reserved.</small>
  </footer>
);

export default Footer;
