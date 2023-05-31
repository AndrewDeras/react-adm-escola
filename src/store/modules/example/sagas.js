import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './action';
import * as types from '../types';

const request = () =>
  // eslint-disable-next-line
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 2000);
  });

function* exampleRequest() {
  try {
    yield call(request);
    yield put(actions.buttonClickSuccess());
  } catch (error) {
    toast.error('Deu algum erro.');
    yield put(actions.buttonClickFailure());
  }
}

export default all([takeLatest(types.clickedButtonRequest, exampleRequest)]);
