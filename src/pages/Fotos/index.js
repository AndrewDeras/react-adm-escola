import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading/index';
import { Container } from '../../styles/GlobalStyles';
import { Title, Form } from './styled';

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const photoUrl = get(data, 'Photos[0].url', '');
        setPhoto(photoUrl);
        setIsLoading(false);
      } catch (error) {
        const errors = get(error, 'response,errors', []);
        errors.map((err) => toast.error(err));
        setIsLoading(false);
        history.push('/');
      }
    }

    getData();
  }, [id]);

  async function handleChange(e) {
    const file = e.target.files[0];
    const photoUrl = URL.createObjectURL(file);
    setPhoto(photoUrl);

    const formData = new FormData();

    formData.append('aluno_id', id);
    formData.append('photo', file);

    try {
      setIsLoading(true);
      await axios.post('/photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsLoading(false);
      toast.success('Foto enviada com sucesso.');
    } catch (error) {
      const errors = get(error, 'response.data.errors', []);
      const status = get(error, 'response.status', 0);
      errors.map((err) => toast.error(err));
      if (status === 401) {
        dispatch(actions.loginFailure());
        toast.error('É necessário estar logado.');
        history.push('/login');
      }
      setIsLoading(false);
      history.push('/');
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>
        <h1>Fotos</h1>
        <Form>
          <label htmlFor="photo">
            {photo ? (
              <img crossOrigin="" src={photo} alt="Foto" />
            ) : (
              'Selecionar'
            )}
            <input id="photo" type="file" onChange={handleChange} />
          </label>
        </Form>
      </Title>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
