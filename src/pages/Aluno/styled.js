import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.div`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 5px;
    margin-top: 5px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;

export const ProfilePicture = styled.div`
  margin: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;

  img {
    height: 180px;
    width: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;
