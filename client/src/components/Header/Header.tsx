import * as React from 'react';
import linkLogo from '../../assets/link-86.svg';

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={linkLogo} alt="Logo" className="h-10 w-10 mr-3" />
          <h1 className="text-4xl font-bold font-chewy">ShortLink</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
