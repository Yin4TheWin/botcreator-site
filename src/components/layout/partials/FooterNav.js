import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <Link to="/toc">Terms and Conditions</Link>
        </li>
        <li>
          <Link to="/privacy">Privacy Policy</Link>
        </li>
        <li>
          <a href="https://discord.gg/qEtqDbZj7H" target="_blank" rel="noreferrer noopener">Support</a>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;