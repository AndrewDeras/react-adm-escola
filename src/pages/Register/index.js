import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import { Form } from './styled';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading/index';

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.userEmail);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [id, nomeStored, emailStored]);

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

    if (!id && (password.length < 7 || password.length > 70)) {
      formErrors = true;
      toast.error('Campo senha deve possuir entre 7 e 70 caracteres.');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ id, nome, email, password }));
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Edite sua conta' : 'Crie sua conta'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            id="nome"
            type="text"
            onChange={({ target }) => setNome(target.value)}
            value={nome}
            placeholder="Seu nome"
            autoComplete="on"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
            placeholder="Seu email"
            autoComplete="on"
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

        <button type="submit">
          {id ? 'Editar minha conta' : 'Criar minha conta'}
        </button>
      </Form>
    </Container>
  );
}
