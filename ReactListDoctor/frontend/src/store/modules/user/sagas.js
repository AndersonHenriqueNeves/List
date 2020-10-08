import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const {
      name,
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
      ...rest } = payload.data;

      console.log(uf);
  
    const profile = Object.assign(
      { name, cep, numberphone, uf, city, neighborhood, street, complement, number, reference, email },
      rest.oldPassword ? rest : {}
    );

    // const response = yield call(api.put, 'users', profile);

    // console.log('response: ' + response);
    // console.log('profile: ' + profile)

    // toast.success('Perfil atualizado com sucesso!');

    // yield put(updateProfileSuccess(response.data));
    api.put('users', profile).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err.response)
    })
  } catch (error) {
    const { data } = error.response;
    toast.error(data.error);
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)
]);