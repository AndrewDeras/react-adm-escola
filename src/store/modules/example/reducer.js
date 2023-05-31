import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.clickedButtonSuccess: {
      console.log('Sucesso');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case types.clickedButtonRequest: {
      console.log('Request on the way');
      return state;
    }

    case types.clickedButtonFailure: {
      console.log('Error');
      return state;
    }

    default: {
      return state;
    }
  }
}
