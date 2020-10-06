import React, { useContext } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import { LoginContext } from '../../Contexts/LoginContext';

import './styles.css';

const addresses = [
  {
    street: 'Rua wilson modesto ribeiro da silva rodrigues de paula',
    number: 215,
    complement: 'ap 301',
    neighborhood: 'Ipiranga',
    city: 'Belo Horizonte',
    state: 'MG',
    zip: '31160430'
  },
  {
    street: 'Rua joao modesto ribeiro',
    number: 215,
    complement: 'ap 301',
    neighborhood: 'Ipiranga',
    city: 'Belo Horizonte',
    state: 'MG',
    zip: '31160430'
  },
  {
    street: 'Rua marcelo modesto ribeiro',
    number: 215,
    complement: 'ap 301',
    neighborhood: 'Ipiranga',
    city: 'Belo Horizonte',
    state: 'MG',
    zip: '31160430'
  },
];
const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];


function Addresses() {

  const [addressList, setAddressList] = useState(addresses);
  const [selected, setSelected] = useState(-1);

  const [newAddress, setNewAddress] = useState({});

  const loginContext = useContext(LoginContext);
  const history = useHistory();

  if (!loginContext.loggedIn) {
    history.push('login?return-to-addresses');
  }

  function handleSubmitExistingAddress() {
    if(selected >= 0) {

    } else {
      alert('Selecione um dos seus endereços cadastrados!');
    }
  }

  function handleSubmitNewAddress(e) {
    e.preventDefault();

    if(newAddress.street
      &&newAddress.number
      &&newAddress.complement
      &&newAddress.neighborhood
      &&newAddress.state
      &&newAddress.city
      &&newAddress.zip) {

    } else {
      alert("Preencha todos os campos para enviar um novo e-mail!")
    }
  }
  return (

    <div>
      <Header />
      <div className="main-addresses-wrapper">
        <div className="addresses-content">
          <h2>Para qual endereço você gostaria de enviar a sua compra, {loginContext.name}?</h2>
          <div className="addresses">
            {addressList.map((address, index) => <Address onClick={() => { setSelected(index) }} address={address} selected={index == selected} key={`address-${index}`} />)}
          </div>
          <button onClick={handleSubmitExistingAddress}>Continuar com o endereço selecionado</button>
          <div className="new-address">
            <h3>Se preferir, cadastre um novo endereço</h3>
            <form onSubmit={handleSubmitNewAddress}>
              <label htmlFor="street">Rua ou Avenida</label>
              <input type="text" name="street" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />

              <label htmlFor="number">Número</label>
              <input className="short" type="number" name="number" value={newAddress.number} step='1' onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />

              <label htmlFor="complement">Complemento</label>
              <input type="text" name="complement" value={newAddress.complement} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />

              <label htmlFor="neighborhood">Bairro</label>
              <input type="text" name="neighborhood" value={newAddress.neighborhood} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />

              <label htmlFor="state">Estado</label>
              <select type="text" name="state" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} defaultValue="">
                <option value="" disabled>Estado</option>
                {states.map(state => <option value={state}>{state}</option>)}
              </select>

              <label htmlFor="city">Cidade</label>
              <input type="text" name="city" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />

              <label htmlFor="zip">CEP</label>
              <input type="text" name="zip" value={newAddress.zip} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />

              <button type="submit">Continuar com o novo endereço</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Address({ onClick, address, selected }) {
  return (
    <div className={`address-box ${selected && 'selected'}`} onClick={onClick}>
      <p>{`${address.street}, ${address.number}, ${address.complement}`}</p>
      <p>{address.neighborhood}</p>
      <p>{`${address.city} - ${address.state}`}</p>
      <p>{address.zip}</p>
    </div>
  );
}

export default Addresses;