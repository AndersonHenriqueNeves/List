import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import Logo from '../../assets/logo.png';

import { signUpRequest } from '../../store/modules/auth/actions';

import './styles.css';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import api from '../../services/api';

import { useHistory } from 'react-router-dom';

import { cpfMask, cleanMask } from '../../utils/mask';

export default function RegisterUser() {
  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const [cep, setCep] = useState();
  const [uf, setUf] = useState();
  const [city, setCity] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [complement, setComplement] = useState();
  const [number, setNumber] = useState();
  const [reference, setReference] = useState();
  const [numberphone, setNumberphone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [street, setStreet] = useState();

  function handleError(mensagem) {
    toast.error(`${mensagem}`)
  }

  const dispatch = useDispatch();

  const history = useHistory();
  
  const handleSubmit = async () => {
    var valid = false;
    if(document.getElementById("checkbox").checked) {
      valid = true;
      
      const info = {
        name,
        cpf: cleanMask(cpf),
        cep,
        uf,
        city,
        neighborhood,
        complement,
        number,
        reference,
        numberphone,
        email,
        password,
        street
      }

      if(!name || typeof name == undefined || name == null) {
        handleError('O nome é obrigatório')
      }

      if(!cpf || typeof cpf == undefined || cpf == null) {
        handleError('O cpf é obrigatório')
      }

      if(!cep || typeof cep == undefined || cep == null) {
        handleError('O cep é obrigatório')
      }

      if(!uf || typeof uf == undefined || uf == null) {
        handleError('O uf é obrigatório')
      }

      if(!city || typeof city == undefined || city == null) {
        handleError('O city é obrigatório')
      }

      if(!neighborhood || typeof neighborhood == undefined || neighborhood == null) {
        handleError('O bairro é obrigatório')
      }

      if(!complement || typeof complement == undefined || complement == null) {
        handleError('O complemento é obrigatório')
      }

      if(!number || typeof number == undefined || number == null) {
        handleError('O número é obrigatório')
      }

      if(!reference || typeof reference == undefined || reference == null) {
        handleError('A referência é obrigatória')
      }
      
      if(!numberphone || typeof numberphone == undefined || numberphone == null) {
        handleError('O número de celular é obrigatório')
      }
      
      if(!email || typeof email == undefined || email == null) {
        handleError('O email é obrigatório')
      }
      
      if(!password || typeof password == undefined || password == null) {
        handleError('A senha é obrigatória')
      }
      
      if(!street || typeof street == undefined || street == null) {
        handleError('A rua é obrigatória')
      }

      console.log(info)

      await api.post('/users', info).then(resp => {
        console.log(resp)
        history.push('/dashboard')
      }).catch(error => {
        const { data } = error.response;
        handleError(data.error);
      })

    } else {
      toast.error("Por favor, aceite os termos");
    }
  }

  return (
    <div>
    <div className="topnav">
      <img className="Logo" src={Logo} alt="Logo"/>
      <a href="/login">Login</a>
      <a href="#profissionais">Profissionais</a>
      <a href="#sobre">Sobre</a>
      <a href="/">Home</a>
    </div>
    <hr></hr>
    <div className="register-container">
      <div className="content-form">
        <h4 className="title">Por favor, preencha corretamente os campos:</h4>
        <Form onSubmit={handleSubmit}>
        <div className="inputLongo">
          <div>
          <p className="p-inputLongo">
            Nome Completo*:
          </p>
          <Input name="name" type="text" className="input-inputLongo" onChange={e => setName(e.target.value)}/>
          </div>
        </div>
        <div className="inputs">
          <div>
            <p className="p-inputs">
              CPF*:
            </p>
            <Input name="cpf" className="inputs-inputs" onChange={e => setCpf(cpfMask(e.target.value))} value={cpf}/>
          </div>
          <div>
            <p className="p-input-direita">
              CEP*:
            </p>
            <Input name="cep" className="input-direita " type="number" onChange={e => setCep(e.target.value)}/>
          </div>
        </div>
        <div className="inputLongo2">
          <div>
          <p className="p-inputLongo">
            Número do celular*:
          </p>
          <Input name="numberphone" type="number" className="input-inputLongo" onChange={e => setNumberphone(e.target.value)}/>
          </div>
        </div>
        <div className="inputs-pequenos">
          <div>
            <p className="p-input-1">
              Cidade*:
            </p>
            <Input name="city" className="input1" type="text" onChange={e => setCity(e.target.value)}/>
          </div>
          <div>
            <p className="p-input-2">
              UF*:
            </p>
            <select 
            name="uf" 
            className="input2 " 
            defaultValue="Selecionar"
            onChange={e => setUf(e.target.value)}
            >
            <option disabled value="Selecionar">Selecionar</option>
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
          </div>
          <div>
            <p className="p-input-3">
              Bairro*:
            </p>
            <Input name="neighborhood"className="input3 " type="text" onChange={e => setNeighborhood(e.target.value)}/>
          </div>
        </div>
        <div className="inputs-pequenos">
          <div>
            <p className="p-input-1">
              Rua*:
            </p>
            <Input name="street" className="input1" type="text" onChange={e => setStreet(e.target.value)}/>
          </div>
          <div>
            <p className="p-input-2">
              Número*:
            </p>
            <Input name="number" className="input2 " type="text" onChange={e => setNumber(e.target.value)}/>
          </div>
          <div>
            <p className="p-input-3">
              Complemento*:
            </p>
            <Input name="complement" className="input3 " type="text" onChange={e => setComplement(e.target.value)}/>
          </div>
        </div>
        <div className="inputLongo2">
          <div>
          <p className="p-inputLongo">
            Referência*:
          </p>
          <Input name="reference" type="text" className="input-inputLongo" onChange={e => setReference(e.target.value)}/>
          </div>
        </div>
        <div className="inputs">
          <div>
            <p className="p-inputs">
              Endereço de e-mail*:
            </p>
            <Input name="email" type="email" className="inputs-inputs" onChange={e => setEmail(e.target.value)}/>
          </div>
          <div>
            <p className="p-input-direita">
              Crie uma senha*:
            </p>
            <Input name="password" className="input-direita " type="password" onChange={e => setPassword(e.target.value)}/>
          </div>
        </div>
        <div className="checkboxdiv">
          <div>
          <Input name="checkbox" type="checkbox" className="checkbox" name="checkbox" />
          <label className="fontcolorcheckbox" for="checkbox"> Eu aceito os <a href="/termos">termos e condições</a>, e a{" "}
            <a href="/privacidade">política de privacidade</a> do ListDoctor.*</label>
          </div>
        </div>
        <div className="divButton">
        <button type="submit" className="btn"> Registrar-se</button>
        </div>
        </Form>
      </div>      
    </div>
    <footer>
        <div className="footer_copy">
          <p className="footer_text">www.listdoctor.com.br © 2020 - Agende agora sua consulta</p>
        </div>
      </footer>
    </div>
  );
}