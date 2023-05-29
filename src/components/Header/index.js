import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

import { Nav } from './styled';

export default function Header() {
  // eslint-disable-next-line
  const botaoClicado = useSelector((state) => state.botaoClicado);

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/signin">
        <FaSignInAlt size={24} />
      </Link>
      {botaoClicado ? 'Botão clicado' : 'Botão não clicado'}
    </Nav>
  );
}
