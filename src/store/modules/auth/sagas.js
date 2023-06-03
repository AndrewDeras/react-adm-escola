import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

// eslint-disable-next-line
function* loginRequest({payload}) {
  console.log('saga', payload);
}

export default all([takeLatest(types.LOGIN_REQUEST, loginRequest)]);
