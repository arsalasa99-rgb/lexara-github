
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="font-semibold text-lg text-[#E5C07B]">LEXARA.ID</p>
        <p className="text-gray-400 mt-1">Analisis Hukum Terbuka dan Terverifikasi Publik</p>
        <p className="text-xs text-gray-500 mt-4">&copy; {new Date().getFullYear()} Lexara.id. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
