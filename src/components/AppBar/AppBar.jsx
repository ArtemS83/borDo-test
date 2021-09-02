import React from 'react';
import { NavLink } from 'react-router-dom';
import './AppBar.css';

const AppBar = () => {
  return (
    <header>
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink
              exact
              to="/news"
              className="link nav-link"
              activeClassName="activeLink"
            >
              News
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newest"
              className="link nav-link"
              activeClassName="activeLink"
            >
              Newest
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppBar;
