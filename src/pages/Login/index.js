import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import * as actions from '../../store/modules/auth/actions';
import { Form } from './styled';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading/index';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector((state) => state.auth.isLoading);

  const prevPath = get(props, 'location.state.prevPath', '/');

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    let loginErrors = false;

    if (!isEmail(email)) {
      loginErrors = true;
      toast.error('E-mail inválido.');
    }

    if (password.length < 7 || password.length > 70) {
      loginErrors = true;
      toast.error('Senha inválida.');
    }

    if (loginErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
            placeholder="Seu email"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            id="password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            placeholder="Seu senha"
          />
        </label>
        <button type="submit">Login</button>
      </Form>
    </Container>
  );
}
