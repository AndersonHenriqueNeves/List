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

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState({});

  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  useEffect(() => {

    const token = localStorage.getItem('token-list')

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
    } else {
      history.push('/')
    }
    getUser();
  }, [])

  const handleSubmit = async () => {
    
    let info = {};

    if(newPassword !== '' || oldPassword !== '' || confirmPassword !== '') {
      if(newPassword === confirmPassword) {
        info = {
          name: nome,
          email: email,
          numberphone: numberphone,
          cep: cep,
          city: city,
          neighborhood: neighborhood,
          street: street,
          complement: complement,
          number: number,
          reference: reference,
          uf: uf,
          oldPassword: oldPassword,
          password: newPassword,
          confirmPassword: confirmPassword
        }
      }
    } else {
      info = {
        name: nome,
        email: email,
        numberphone: numberphone,
        cep: cep,
        city: city,
        neighborhood: neighborhood,
        street: street,
        complement: complement,
        number: number,
        reference: reference,
        uf: uf
      }
    }


    const token = localStorage.getItem('token-list');

    console.log(info);

    await api.put('/users', info, {
      headers: {
        'authorization' : `bearer ${token}`
      }
    }).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err.request);
    });
  }

  function handleSignOut() {
    localStorage.clear();
    history.push('/')
  }

  async function getUser() {
    const token = localStorage.getItem('token-list');

    console.log(token);

    await api.get('/users', { 
      headers: {
        'authorization' : `bearer ${token}`
      }
    }).then(resp => {
      setNome(resp.data.name);
      setEmail(resp.data.email);
      setUf(resp.data.uf);
      setNumberphone(resp.data.numberphone);
      setCep(resp.data.cep);
      setCity(resp.data.city);
      setNeighborhood(resp.data.neighborhood);
      setStreet(resp.data.street);
      setComplement(resp.data.complement);
      setNumber(resp.data.number);
      setReference(resp.data.reference);
    }).catch(err => {
      console.log(err.response);
    });
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
        <Form onSubmit={handleSubmit} className="containerForm">
          <h4> Configurações de Perfil </h4>
          <Input className="inputperfil" name="name" placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} />
          <Input className="inputperfil" name="email" placeholder="Seu endereço de e-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <Input className="inputperfil" name="numberphone" placeholder="número de telefone" value={numberphone} onChange={e => setNumberphone(e.target.value)} />
          <hr />
          <h4> Configurações de Endereço </h4>
          <Input className="inputperfil" name="cep" placeholder="CEP" value={cep} onChange={e => setCep(e.target.value)} />
          <Input className="inputperfil" name="city" placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
          <select
            name="uf"
            // defaultValue={profile.uf}
            className="select"
            value={uf}
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
          <Input className="inputperfil" name="neighborhood" placeholder="Bairro" value={neighborhood} onChange={e => setNeighborhood(e.target.value)} />
          <Input className="inputperfil" name="street" placeholder="Rua" value={street} onChange={e => setStreet(e.target.value)} />
          <Input className="inputperfil" name="number" placeholder="número" value={number} onChange={e => setNumber(e.target.value)} />
          <Input className="inputperfil" name="reference" placeholder="Referência" value={reference} onChange={e => setReference(e.target.value)} />
          <Input className="inputperfil" name="complement" placeholder="Complemento" value={complement} onChange={e => setComplement(e.target.value)} />
          <hr />
          <h4> Configurações de Senha </h4>
          <Input className="inputperfil" type="password" name="oldPassword" placeholder="Sua senha atual" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
          <Input className="inputperfil" type="password" name="password" placeholder="Nova senha" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
          <Input className="inputperfil" type="password" name="confirmPassword" placeholder="Confirmação de senha" value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)} />
          <button className="buttonperfil" onClick={() => handleSubmit()}   type="submit">Atualizar Perfil</button>
        </Form>
      </div>
    </>
  )
}