import React from 'react';
import Image from 'next/image';
import photo from '../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <div className="w-500 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-500 to-purple-300 text-white">
      <div className="mb-12">
        <Image src={photo} alt="Logo" width={200} height={200} />
      </div>
      <nav className="flex flex-col space-y-4">
        <a href="#" className="flex items-center text-lg font-medium hover:text-purple-200">
          <span className="material-icons mr-2">dashboard</span>
          Dashboard
        </a>
        <a href="#" className="flex items-center text-lg font-medium hover:text-purple-200">
          <span className="material-icons mr-2">home</span>
          Home
        </a>
        <a href="#" className="flex items-center text-lg font-medium hover:text-purple-200">
          <span className="material-icons mr-2">info</span>
          About
        </a>
        <a href="#" className="flex items-center text-lg font-medium hover:text-purple-200">
          <span className="material-icons mr-2">logout</span>
          Logout
        </a>
      </nav>
    </div>
  );
};

export default Header;
