import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';
import image from './image/logo.png';

const NavBar = () => {
  return (
    <div className={classes.nav_bar}>
      <ul className={classes.ul}>
        <li>
          <Link className={classes.homeLink} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={classes.concertLink} to="/concerts">
            Concerts
          </Link>
        </li>
        <li>
          <Link className={classes.fansLink} to="/fans">
            Fans
          </Link>
        </li>
      </ul>
      <img className={classes.img_logo} src={image}></img>
    </div>
  );
};

export default NavBar;
