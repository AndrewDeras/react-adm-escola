import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading/index';
import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await axios.get('alunos');
      setAlunos(res.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  async function handleDelete(e, id, index) {
    e.preventDefault();
    try {
      setIsLoading(true);

      await axios.delete(`/alunos/${id}`);

      const updatedAlunos = [...alunos];
      updatedAlunos.splice(index, 1);
      setAlunos(updatedAlunos);

      setIsLoading(false);
      toast.success('Aluno deletado com sucesso.');
    } catch (error) {
      const status = get(error, 'response.status', 0);
      if (status === 401) {
        toast.error('Login necessário.');
        setIsLoading(false);
        history.push('/login');
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>
      <NovoAluno to="/aluno">Novo Aluno</NovoAluno>
      <AlunoContainer>
        {alunos &&
          alunos.map((aluno, index) => (
            <div key={String(aluno.id)}>
              <ProfilePicture>
                {get(aluno, 'Photos[0].url', false) ? (
                  <img crossOrigin="" src={aluno.Photos[0].url} alt="" />
                ) : (
                  <FaUserCircle size={36} />
                )}
              </ProfilePicture>
              <span>{aluno.nome}</span>
              <span>{aluno.email}</span>

              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit size={16} />
              </Link>

              <Link
                onClick={(e) => {
                  handleDelete(e, aluno.id, index);
                }}
                to={`/aluno/${aluno.id}/delete`}
              >
                <FaWindowClose size={16} />
              </Link>
            </div>
          ))}
      </AlunoContainer>
    </Container>
  );
}
