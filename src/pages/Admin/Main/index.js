import React, { useState, useEffect } from "react";

import api from "../../../services/api";

import Pedido from "./Pedido";
import "./styles.css";



function Main() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("orders?byStatus=pending", {
        headers: {
          authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then((response) => {
        setOrders(response.data);
        console.log('orders', response.data)
      });
  }, []);

  useEffect(() => {
    api.get("lowStock", {
        headers: {
          authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then((response) => {
        setProducts(response.data.products);
      });
  }, []);

  useEffect(() => {
    api.get("users?status=pending", {
        headers: {
          authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  return (
    <div className="main-container">
      <h4 className="titulo">Dashboard</h4>
      <div className="farol">
        <div className="pendentes" key={orders.id}>
          <h4>Pedidos pendentes:</h4>
          <h3>{orders.length}</h3>
        </div>
        <div className="acabando">
          <h4>Produtos com pouco estoque:</h4>
          <h3>{products.length}</h3>
        </div>
        <div className="aguardando-aprovacao">
          <h4>Usuários aguardando aprovação</h4>
          <h3>{users.length}</h3>
        </div>
      </div>

      <div className="pedidos-pendentes">
        <h4 className="titulo">Últimos Pedidos</h4>     
        <div>
        {orders.map((pedido, index) => (
            <Pedido key={`pedido-${index}`} pedido={pedido} />
          ))}
        </div>




      </div>
    </div>
  );
}

export default Main;
