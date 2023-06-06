import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import validator from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/Loading/index';
import axios from '../../services/axios';
import history from '../../services/history';
import { Form } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', 0);
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        setIsLoading(true);
        const response = await axios.get(`/alunos/${id}`);
        const { data } = response;
        const photo = get(data, 'Photos[0]', '');

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (error) {
        const errors = get(error, 'response,errors', []);
        errors.map((err) => toast.error(err));
        setIsLoading(false);
        history.push('/');
      }
    }
    if (id !== 0) {
      getData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Campo nome deve possuir entre 3 e 255 caracteres.');
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.error('Campo sobrenome deve possuir entre 3 e 255 caracteres.');
    }

    if (!validator.isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (!validator.isInt(String(idade))) {
      formErrors = true;
      toast.error('Idade precisa ser um valor inteiro.');
    }

    if (!validator.isFloat(String(peso))) {
      formErrors = true;
      toast.error('Peso precisa ser um valor inteiro ou ponto flutuante.');
    }

    if (!validator.isFloat(String(altura))) {
      formErrors = true;
      toast.error('Altura precisa ser um valor inteiro ou ponto flutuante.');
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id === 0) {
        const aluno = await axios.post('/alunos', {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        const { id: alunoId } = aluno.data;
        setIsLoading(false);

        toast.success('Aluno cadastrado com sucesso.');
        history.push(`/aluno/${alunoId}/edit`);
      } else {
        // update
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        setIsLoading(false);
        toast.success('Dados do aluno atualizados.');

        history.push(`/aluno/${id}/edit`);
      }
    } catch (error) {
      const errors = get(error, 'response,errors', []);
      const status = get(error, 'response.status', 0);
      errors.map((err) => toast.error(err));
      if (status === 401) {
        dispatch(actions.loginFailure());
        toast.error('Login requerido.');
        history.push('/login');
      }
      history.push('/');
    }
  };

  return (
    <Container>
      <h1>{id ? 'Editar aluno' : 'Novo luno'}</h1>
      <Loading isLoading={isLoading} />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="nome">
          Nome:
          <input
            id="nome"
            type="text"
            onChange={({ target }) => setNome(target.value)}
            value={nome}
            placeholder="Nome do aluno"
          />
        </label>

        <label htmlFor="sobrenome">
          Sobrenome:
          <input
            id="sobrenome"
            type="text"
            onChange={({ target }) => setSobrenome(target.value)}
            value={sobrenome}
            placeholder="Sobrenome do aluno"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
            placeholder="Email do email"
          />
        </label>

        <label htmlFor="idade">
          Idade:
          <input
            id="idade"
            type="text"
            onChange={({ target }) => setIdade(target.value)}
            value={idade}
            placeholder="Idade do aluno"
          />
        </label>

        <label htmlFor="peso">
          Peso:
          <input
            id="peso"
            type="text"
            onChange={({ target }) => setPeso(target.value)}
            value={peso}
            placeholder="Peso do aluno"
          />
        </label>

        <label htmlFor="altura">
          Altura:
          <input
            id="altura"
            type="text"
            onChange={({ target }) => setAltura(target.value)}
            value={altura}
            placeholder="Altura do aluno"
          />
        </label>

        <button type="submit">{id ? 'Editar' : 'Criar'}</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
