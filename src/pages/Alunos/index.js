import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import axios from '../../services/axios';
import Loading from '../../components/Loading/index';
import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture } from './styled';

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

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos &&
          alunos.map((aluno) => (
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

              <Link to={`/aluno/${aluno.id}/delete`}>
                <FaWindowClose size={16} />
              </Link>
            </div>
          ))}
      </AlunoContainer>
    </Container>
  );
}
