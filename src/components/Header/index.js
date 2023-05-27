import React from 'react';

import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';

import { Nav } from './styled';

export default function Header() {
  return (
    <Nav>
      <a href="http://">
        <FaHome />
      </a>
      <a href="http://">
        <FaUserAlt />
      </a>
      <a href="http://">
        <FaSignInAlt />
      </a>
    </Nav>
  );
}
