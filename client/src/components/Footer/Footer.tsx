import * as React from 'react';

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-md mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Cemre Biltekin. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
