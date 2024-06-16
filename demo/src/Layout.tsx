// components/Layout.tsx
import React, { ReactNode } from 'react';
import Nav from './componets/Nav';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
       <Nav/>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
