import styled, { createGlobalStyle } from 'styled-components';

import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
   *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
   }

   body{
    font-family: sans-serif;
    background: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
   }

   html, body, #root{
    height: 100%;
   }

   button{
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    transition: all 300ms;
   }

   button:hover{
    filter: brightness(88%);
   }

   a{
    text-decoration: none;
    color: ${colors.primaryColor};
   }

   ul{
    list-style: none;
   }

   body .Toastify__toast-theme--success.Toastify__toast--success {
    background-color: ${colors.successColor};
    color: #000;
   }

   body .Toastify__toast-theme--error.Toastify__toast--error {
    background-color: ${colors.errorColor};
    color: #000;
   }

   body .Toastify__progress-bar--success {
    background-color: ${colors.successColor};
   }
   body .Toastify__progress-bar--error {
    background-color: ${colors.errorColor};
   }
`;

export const Container = styled.section`
  max-width: 480px;
  margin: 30px auto;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);
`;
