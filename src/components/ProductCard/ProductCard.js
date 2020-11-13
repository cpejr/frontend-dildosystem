import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FiFilter, FiHeart } from 'react-icons/fi';
import ImageLoader from 'react-loading-image';
import { FaHeart } from 'react-icons/fa';

import { LoginContext } from '../../Contexts/LoginContext';
import './styles.css'
import loading from '../../images/Loading.gif';

import api from '../../services/api';
import cart from "../../services/cart"

function PriceElement(props) {

    const product = props.product;

    if (product.wholesaler_price) {
        if (product.on_sale_wholesaler) {
            return (
                <div className="price-container">
                    <p className="preco-card cortado">{`R$ ${Number(props.product.wholesaler_price).toFixed(2)}`}</p>

                    <p className="preco-promocao">
                        {`R$ ${Number(props.product.wholesaler_sale_price).toFixed(2)}`}
                    </p>
                </div>
            )
        } else {
            return (
                <div className="price-container">
                    <span className="preco-card">{`R$ ${Number(props.product.wholesaler_price).toFixed(2)}`}</span>
                </div>)

        }
    } else {
        if (product.on_sale_client) {
            return (
                <div className="price-container">
                    <p className="preco-card cortado">{`R$ ${Number(props.product.client_price).toFixed(2)}`}</p>

                    <p className="preco-promocao">
                        {`R$ ${Number(props.product.client_sale_price).toFixed(2)}`}
                    </p>
                </div>
            )
        } else {
            return (
                <span className="preco-card">{`R$ ${Number(props.product.client_price).toFixed(2)}`}</span>
            )
        }
    }
}

export default function CardProduct(props) {
    const [isWish, setIsWish] = useState(false);
    const user = useContext(LoginContext);
    const accessToken = localStorage.getItem('accessToken');
    const product = props.product;

    const config = {
        headers: { authorization: `Bearer ${accessToken}` }
    }

    const handleAddWishList = (product_id) => {
        const user_id = user.id
        const data = {
            user_id,
            product_id
        }
        api.post(`userwishlist/${user_id}`, data, config).then((response) => {
            console.log(response)
            setIsWish(true);
        })
    }
    const handleRemoveWishList = (product_id) => {
        const user_id = user.id
        const config_2 = {
            headers: { authorization: `Bearer ${accessToken}` },
            data: { user_id: user_id, product_id }
        };
        api.delete('userwishlist', config_2).then((response) => {
            console.log(response)
            setIsWish(false);
        })
    }

    useEffect(() => {
        console.log("productData: ",product)
        if (product) {
          const user_id = user.id;
          console.log("User: ", user)
          console.log("User_id: ", user_id)
          api.get(`userwishlist/${user_id}`, config).then((response) => {
            const result = response.data.find(p => p.id === product.id);
            if(result){
              setIsWish(true);
            }
          });
        }
      }, [product])

    console.log("Product Card Props: ", props)
    return (
        <div className="Card" key={`product-${product.id}`}>
            <Link to={`/product/${product.id}`} className="image-text-container">
                <ImageLoader
                    src={`https://docs.google.com/uc?id=${product.image_id}`}
                    loading={() => <img src={loading} alt="Loading..." />}
                    error={() => <div>Error</div>} />
                <p id="titulo-card">
                    {product.name}
                </p>
            </Link>
            <div className="fiheartDiv">
                {!isWish && <FiHeart className="fiheart" onClick={() => handleAddWishList(product.id)} />}
                {isWish && <FaHeart className="fiheart" onClick={() => handleRemoveWishList(product.id)} />}
            </div>

            <PriceElement product={product} />

            <Link id="botao-comprar" to="/cart">
                <span onClick={(e) => cart.addItem(product)}>COMPRAR</span>
            </Link>

        </div>
    )
}