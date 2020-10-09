import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { useHistory } from 'react-router-dom';

import { signInRequest } from '../../store/modules/auth/actions';

import Logo from '../../assets/logo.png';

import './styles.css';
import '../RegisterDoctor/styles.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import api from '../../services/api';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleError(mensagem) {
    toast.error(`${mensagem}`)
  }

  const handleSubmit = async () => {

    const info = {
      email,
      password
    }

    if(!email || typeof email == undefined || email == null) {
      handleError('O campo de Email é obrigatório')
      return
    }

    if(!password || typeof password == undefined || password == null) {
      handleError('O campo de Senha é obrigatório')
      return
    }

    console.log(info)

    api.post('/sessions', info).then(resp => {
      api.defaults.headers.authorization = `Bearer ${resp.data.token}`;

      localStorage.setItem('token-list', resp.data.token);

      history.push('/dashboard')
    }).catch(error => {
        const { data } = error.response;
        handleError(data.error);
    })
  }

  return (
    <div>
      <div className="topnav">
        <img className="Logo" src={Logo} alt="Logo" />
        <a href="/login">Login</a>
        <a href="#profissionais">Profissionais</a>
        <a href="#sobre">Sobre</a>
        <a href="/">Home</a>
      </div>
      <hr></hr>
      <div className="register-container">
        <div className="contentLogin-form">
          <h2 className="titleLogin">Para continuar, inicie a sessão:</h2>
          <Form onSubmit={handleSubmit}>
            <div className="inputLongo">
              <div>
                <p className="p-inputLongoLogin">
                  Endereço de e-mail*:
          </p>
                <Input name="email" type="email" className="input-inputLongoLogin" onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="inputLongo">
              <div>
                <p className="p-inputLongoLogin">
                  Senha*:
          </p>
                <Input name="password" type="password" className="input-inputLongoLogin" onChange={e => setPassword(e.target.value)} />
              </div>
            </div>
            <div className="divButtonLogin">
              {/* <button type="submit" className="btnLogin">{loading ? 'Carregando...' : 'Entrar'}</button> */}
              <button type="submit" className="btnLogin">Entrar</button>
            </div>
          </Form>
          <p> <a href="#" className="stylelink"> Esqueceu sua senha? </a></p>
          <label className="stylelabel">Faça seu cadastro <a href="/register-user" className="stylelink">como paciente</a> ou <a href="/register-doctor" className="stylelink">como profissional de saúde.</a></label>
        </div>
      </div>
      <footer>
        <div className="footer_copy">
          <p className="footer_text">www.listdoctor.com.br © 2020 - Agende agora sua consulta</p>
        </div>
      </footer>
    </div>
  )
}