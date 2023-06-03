import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import axios from '../../services/axios';
import history from '../../services/history';
import { Form } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Campo nome deve possuir entre 3 e 255 caracteres.');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (password.length < 7 || password.length > 70) {
      formErrors = true;
      toast.error('Campo senha deve possuir entre 7 e 70 caracteres.');
    }

    if (formErrors) return;

    try {
      await axios.post('/users', { nome, email, password });
      toast.success('Usuário cadastrado com sucesso.');
      history.push('/login');
    } catch (error) {
      const errors = get(error, 'response.data.errors', []);

      errors.map((err) => toast.error(err));
    }
  }
  return (
    <Container>
      <h1>Crie sua conta.</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            onChange={({ target }) => setNome(target.value)}
            value={nome}
            placeholder="Seu nome"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
            placeholder="Seu email"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            placeholder="Seu senha"
          />
        </label>

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
