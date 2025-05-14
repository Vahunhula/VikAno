import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PageTransition from './PageTransition';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow overflow-hidden">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
