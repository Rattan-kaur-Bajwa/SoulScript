// src/components/Layout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Layout.css'; // Add styles for your layout if needed

const Layout = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
      navigate(path);
    };
  return (
    <div className="layout">
         <header>
          <nav className="navbar avbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className='item'>
              <a className="nav-link active" aria-current="page" onClick={() => handleNavigation('/journal')}>Journal</a>
            </div>
            <div className='item'>
              <a className="nav-link active" aria-current="page" onClick={() => handleNavigation('/new-entry')}>New Entry</a>
            </div>
            <div className='item'>
              <a className="nav-link active" aria-current="page" onClick={() => handleNavigation('/inspiration')}>Inspiration</a>
            </div>
          </nav>
        </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
