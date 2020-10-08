import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '../../store/modules/auth/actions';
import { updateProfileRequest } from '../../store/modules/user/actions';

import Logo from '../../assets/logo.png';

import './styles.css';

import api from '../../services/api';

import { useHistory } from 'react-router-dom';

export default function UserProfile() {
  const history = useHistory();
  const [uf, setUf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [numberphone, setNumberphone] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [complement, setComplement] = useState('');
  const [number, setNumber] = useState('');
  const [reference, setReference] = useState('');

  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token-list')

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
    } else {
      history.push('/')
    }
  }, [])

  const handleSubmit = async () => {
    const info = {
      nome,
      email,
      numberphone,
      cep,
      city,
      neighborhood,
      street,
      complement,
      number,
      reference,
      uf
    }

    console.log(info);

    await api.put('/users', info).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err.response);
    });
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <>
      <div className="topnav">
        <img className="Logo" src={Logo} alt="Logo" />
        <a className="signOut" onClick={handleSignOut}>Sair</a>
        <a href="#minhaConta">Minha Conta</a>
      </div>
      <hr />
      <div className="containerProfile">
        <Form initialData={profile} onSubmit={handleSubmit} className="containerForm">
          <h4> Configurações de Perfil </h4>
          <Input className="inputperfil" name="name" placeholder="Nome completo" onChange={e => setNome(e.target.value)} />
          <Input className="inputperfil" name="email" placeholder="Seu endereço de e-mail" onChange={e => setEmail(e.target.value)} />
          <Input className="inputperfil" name="numberphone" placeholder="número de telefone" onChange={e => setNumberphone(e.target.value)} />
          <hr />
          <h4> Configurações de Endereço </h4>
          <Input className="inputperfil" name="cep" placeholder="CEP" onChange={e => setCep(e.target.value)} />
          <Input className="inputperfil" name="city" placeholder="Cidade" onChange={e => setCity(e.target.value)} />
          <select
            name="uf"
            // defaultValue={profile.uf}
            className="select"
            onChange={e => setUf(e.target.value)}
          // onChange={e => console.log(e.target.value)}
          >
            <option value="AC">AC</option>
            <option value="AL">AL</option>
            <option value="AP">AP</option>
            <option value="AM">AM</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="DF">DF</option>
            <option value="ES">ES</option>
            <option value="GO">GO</option>
            <option value="MA">MA</option>
            <option value="MT">MT</option>
            <option value="MS">MS</option>
            <option value="MG">MG</option>
            <option value="PA">PA</option>
            <option value="PB">PB</option>
            <option value="PR">PR</option>
            <option value="PE">PE</option>
            <option value="PI">PI</option>
            <option value="RJ">RJ</option>
            <option value="RN">RN</option>
            <option value="RS">RS</option>
            <option value="RO">RO</option>
            <option value="RR">RR</option>
            <option value="SC">SC</option>
            <option value="SP">SP</option>
            <option value="SE">SE</option>
            <option value="TO">TO</option>
          </select>
          <Input className="inputperfil" name="neighborhood" placeholder="Bairro" onChange={e => setNeighborhood(e.target.value)} />
          <Input className="inputperfil" name="street" placeholder="Rua" onChange={e => setStreet(e.target.value)} />
          <Input className="inputperfil" name="number" placeholder="número" onChange={e => setNumber(e.target.value)} />
          <Input className="inputperfil" name="reference" placeholder="Referência" onChange={e => setReference(e.target.value)} />
          <Input className="inputperfil" name="complement" placeholder="Complemento" onChange={e => setComplement(e.target.value)} />
          <hr />
          <h4> Configurações de Senha </h4>
          <Input className="inputperfil" type="password" name="oldPassword" placeholder="Sua senha atual" />
          <Input className="inputperfil" type="password" name="password" placeholder="Nova senha" />
          <Input className="inputperfil" type="password" name="confirmPassword" placeholder="Confirmação de senha" />
          <button className="buttonperfil" type="submit">Atualizar Perfil</button>
        </Form>
      </div>
    </>
  )
}