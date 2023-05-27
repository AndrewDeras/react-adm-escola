import React from 'react';

import { Title, Paragraph } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Login() {
  return (
    <Container>
      <Title isRed>
        Login<small>small</small>
      </Title>
      <Paragraph>Página de login</Paragraph>
      <button type="button">Enviar</button>
    </Container>
  );
}
