import React from 'react';
import { useDispatch } from 'react-redux';

import { Title, Paragraph } from './styled';
import { Container } from '../../styles/GlobalStyles';
import * as exampleActios from '../../store/modules/example/action';

export default function Login() {
  const dispatch = useDispatch();

  function hanldeClick(e) {
    e.preventDefault();

    dispatch(exampleActios.buttonClick());
  }

  return (
    <Container>
      <Title isRed>
        Login<small>small</small>
      </Title>
      <Paragraph>Página de login</Paragraph>
      <button onClick={hanldeClick} type="button">
        Enviar
      </button>
    </Container>
  );
}
