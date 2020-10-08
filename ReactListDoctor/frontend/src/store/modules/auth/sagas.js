import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    password
  });

  const { token, user } = response.data;

  api.defaults.headers.Authorization = `Bearer ${token}`;

  localStorage.setItem('token', token);
  console.log(token);

  yield put(signInSuccess(token, user));

  history.push('/dashboard');
} catch (error) {
  const { data } = error.response;
  toast.error(data.error);
  yield put(signFailure());
}
}

export function* signUp({ payload }) {
  
  try {
  const { 
    name,
    cpf,
    cep,
    numberphone,
    uf,
    city,
    neighborhood,
    street,
    complement,
    number,
    reference,
    email,
    password
  } = payload;

  yield call(api.post, 'users', {
    name,
    cpf,
    cep,
    numberphone,
    uf,
    city,
    neighborhood,
    street,
    complement,
    number,
    reference,
    email,
    password
  });
  history.push('/login');
} catch(error) {
  const { data } = error.response;
  toast.error(data.error);
  yield put(signFailure());
}
} 

export function* signUpPro({ payload }) {
  try {
  const { 
    name,
    lastname,
    specialty,
    city,
    number,
    email,
    password,
    record,
    description
  } = payload;

  yield call(api.post, 'professionals', {
    name,
    lastname,
    specialty,
    city,
    number,
    email,
    password,
    record,
    description
  });
  history.push('/login');
} catch(error) {
  const { data } = error.response;
  toast.error(data.error);
  yield put(signFailure());
}
}

export function setToken({ payload }) {
  if(!payload) return;

  const { token } = payload.auth;

  if(token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/SIGN_UP_REQUEST_PRO', signUpPro),
]);