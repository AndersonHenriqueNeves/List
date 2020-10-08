import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Logo from '../../assets/logo.png';

import { Form, Input } from '@rocketseat/unform';

import { signOut } from '../../store/modules/auth/actions';

import '../Home/styles.css';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';

export default function Dashboard() {

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token-list')

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
    } else {
      history.push('/')
    }
  }, [])

  const dispatch = useDispatch();

  function handleConfirm() {

  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <>
      <div className="topnav">
      <img className="Logo" src={Logo} alt="Logo"/>
      <a className="signOut" onClick={handleSignOut}>Sair</a>
      <a href="/user-profile">Minha Conta</a>
    </div>
      <section id="main">
        <div className="container">
          <h1>Encontre seu médico no ListDoctor</h1>
          <h5>Profissionais qualificados para te ajudar</h5>
          <div>
            <Form>
              <div className="d-flex flex-column flex-md-row">
                <div className="flex-grow-1 mx-1">
                  <Input  placeholder="Especialidade" name="speciality" type="text" size="lg" />
                </div>

                <div className="flex-grow-1 mx-1">
                  <Input placeholder="Cidade" name="city" type="text" size="lg" />
                </div>

                <button
                  className="search-button"
                  size="lg"
                  style={{ height: 39 }}
                  onClick={handleConfirm}
                >
                  Pesquisar
                </button>
              </div>
            </Form>
          </div>
        </div>
      </section>
      <section id="intro">
        <div className="container my-5">
          <h2 className="text-center mb-4">Consultas online</h2>
          <p>
            Não descuide da sua saúde. Escolha a consulta online para começar ou
            continuar o seu tratamento sem sair de casa. Se precisar, você
            também pode marcar uma consulta no consultório.
          </p>
        </div>
      </section>
      <section id="benefits" className="py-5">
        <div className="container d-flex flex-column flex-md-row">
          <div className="benefits-item mx-lg-5 mx-md-1 my-sm-2">
            <h5 className="mb-4 text-center">Encontre especialistas</h5>
            <p className="text-center">
              Busque por especialistas de saúde em sua região. Filtre por planos
              de saúde, tratamentos ou disponibilidade.
            </p>
          </div>
          <div className="benefits-item mx-lg-5 mx-md-1 my-sm-2">
            <h5 className="mb-4 text-center">Marque consultas</h5>
            <p className="text-center">
              Escolha o profissional, dia e horário que desejar, agendando sua
              consulta em até dois minutos. Sem complicação.
            </p>
          </div>
          <div className="benefits-item mx-lg-5 mx-md-1 my-sm-2">
            <h5 className="mb-4 text-center">Receba lembretes</h5>
            <p className="text-center">
              Confirmamos tudo imediatamente pelo email informado e, antes da
              consulta, um lembrete será enviado via celular.
            </p>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer_copy">
          <p className="footer_text">www.listdoctor.com.br © 2020 - Agende agora sua consulta</p>
        </div>
      </footer>
    </>
  )
}