import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from '../../../components/FormatDate/index'
import "./styles.css";
import CreateIcon from "@material-ui/icons/Create";

function Pedido2(props) {
  const [url, seturl] = useState();
  function createStatusBox(status) {
    switch (status.toLowerCase()) {
      case "delivered": {
        return (
          <div className="status-box" style={{ backgroundColor: "#00CC00" }}>
            {" "}
            ENTREGUE{" "}
          </div>
        );
      }

      case "paid": {
        return (
          <div className="status-box" style={{ backgroundColor: "#FF8000" }}>
            {" "}
            PAGO{" "}
          </div>
        );
      }
      case "mailed": {
        return (
          <div className="status-box" style={{ backgroundColor: "#CCCC00" }}>
            {" "}
            POSTADO{" "}
          </div>
        );
      }
      case "pending": {
        return (
          <div className="status-box" style={{ backgroundColor: "#BF3838" }}>
            {" "}
            PENDENTE{" "}
          </div>
        );
      }
      default:
    }
  }
  useEffect(() => {
  console.log(props);
  if (props.dashboard) {
    seturl( `admin/pendingorder/${props.pedido.id}`);
  } else{
    seturl(`pendingorder/${props.pedido.id}`);
  }
}, []);
  return (
    <div className="orders-content">
      <h6>Dados do Pedido ID:{props.pedido.id}</h6>
      <div className="orders-data">
        <div className="orders-info">
          <div className="orders-item">
            <strong>Nome:</strong>
            <p>{props.pedido.user.name}</p>
          </div>
          <div className="orders-item">
            <strong>E-mail</strong>
            <p>{props.pedido.user.email}</p>
          </div>
          <div className="orders-item">
            <strong>Tipo de Usuario:</strong>
            <p>{props.pedido.user.type}</p>
          </div>
          <div className="orders-item">
            <strong>Data:</strong>
            <p>{formatDate(props.pedido.created_at)}</p>
          </div>
          <div className="orders-item">
            <strong>Valor:</strong>
            <p>{`R$${Number(props.pedido.totalPrice).toFixed(2)}`}</p>
          </div>
          <div className="orders-item">
            <strong>Status:</strong>
            <p>{createStatusBox(props.pedido.order_status)}</p>
          </div>
          <div className="orders-item-edit">
            <strong>Editar:</strong>

            <Link to={
    { 
        pathname: url,
        myCustomProps: props.pedido
    }
}>
              <CreateIcon size={20} color="#15425" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pedido2;
