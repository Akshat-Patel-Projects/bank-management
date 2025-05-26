import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-lg font-semibold">
          SecureBank &copy; {new Date().getFullYear()}
        </p>
        <p className="text-sm mt-1">Your Trusted Financial Partner</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="/privacy" className="text-gray-400 hover:text-white transition">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-400 hover:text-white transition">
            Terms of Service
          </a>
          <a href="/contact" className="text-gray-400 hover:text-white transition">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
