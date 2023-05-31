import * as types from '../types';

export function buttonClickRequest() {
  return {
    type: types.clickedButtonRequest,
  };
}
export function buttonClickSuccess() {
  return {
    type: types.clickedButtonSuccess,
  };
}

export function buttonClickFailure() {
  return {
    type: types.clickedButtonFailure,
  };
}
