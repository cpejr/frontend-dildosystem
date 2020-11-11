import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FiFilter, FiHeart } from 'react-icons/fi';
import ImageLoader from 'react-loading-image';
import { FaHeart } from 'react-icons/fa';

import api from '../../services/api';
import cart from "../../services/cart"
import CardProduct from './ProductCard';

import { LoginContext } from '../../Contexts/LoginContext';
import './styles.css'
import loading from '../../images/Loading.gif';

export default withRouter(function ProductCard(props) {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [queries, setQueries] = useState('');

    const [requiring, setRequiring] = useState(false);
    const alreadyRequiring = useRef(false);
    const user = useContext(LoginContext);

    const accessToken = localStorage.getItem('accessToken');

    const config = {
        headers: { authorization: `Bearer ${accessToken}` }
    }

    function handleScroll() {
        const shouldUpdate = window.pageYOffset > (document.documentElement.scrollHeight - 1300)
        if (shouldUpdate && !requiring.current) {
            alreadyRequiring.current = true;
            setRequiring(true);
            console.log(requiring);
        }
    }

    useEffect(() => {
        if (!props.featuredOnly) {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }


        return (() => {
            if (!props.featuredOnly) {
                window.removeEventListener('scroll', handleScroll);
            }
        });
    }, []);

    useEffect(() => {
        if (!requiring) {
            alreadyRequiring.current = false;
        }

        if (alreadyRequiring.current && requiring) {
            loadFollowingPage();
        }
    }, [requiring])

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken')

        const config = {
            headers: { 'authorization': `Bearer ${accessToken}` }
        }

        let queries = props.location.search;

        queries ? queries += '&' : queries = '?';

        setQueries(queries);

        let url = `/products/${queries}page=${page}`

        if (props.featuredOnly) url += '&featured=true';

        console.log('url when loading products', url);

        if (accessToken) {
            api.get(url, config).then(response => {
                setProducts(response.data)
                console.log(response.data)
            });
        } else {
            api.get(url).then(response => {
                setProducts(response.data)
                console.log(response.data)
            });
        }
    }, [props.location.search])

    useEffect(() => {
        console.log('novo array de products', products);
    }, [products])

    async function loadFollowingPage() {
        const currentPos = window.pageYOffset;

        let reqQueries = queries;

        reqQueries ? reqQueries += '' : reqQueries = '?';

        let url = `/products/${reqQueries}page=${page + 1}`

        if (props.featuredOnly) url += '&featured=true';

        console.log(url);

        let nextPage;

        const accessToken = localStorage.getItem('accessToken')

        const config = {
            headers: { 'authorization': `Bearer ${accessToken}` }
        }

        if (accessToken) {
            nextPage = await api.get(url, config);
        } else {
            nextPage = await api.get(url);
        }

        setProducts(products.concat(nextPage.data));
        setPage(page + 1);
        setRequiring(false);
        window.scrollTo(0, currentPos);
    }

    return (
        <div className={`products-container-wrapper ${props.className}`}>
            <div className="products-container">
                {products.map(product => (
                    <CardProduct product={product} />
                    // <div className="Card" key={`product-${product.id}`}>
                    //     <Link to={`/product/${product.id}`} className="image-text-container">
                    //         <ImageLoader
                    //             src={`https://docs.google.com/uc?id=${product.image_id}`}
                    //             loading={() => <img src={loading} alt="Loading..." />}
                    //             error={() => <div>Error</div>} />
                    //         <p id="titulo-card">
                    //             {product.name}
                    //         </p>
                    //     </Link>
                    //     <div className="fiheartDiv">
                    //         {!isWish && <FiHeart className="fiheart" onClick={() => handleAddWishList(product.id)} />}
                    //         {isWish && <FaHeart className="fiheart" onClick={() => handleRemoveWishList(product.id)} />}
                    //     </div>

                    //     <PriceElement product={product} />

                    //     <Link id="botao-comprar" to="/cart">
                    //         <span onClick={(e) => cart.addItem(product)}>COMPRAR</span>
                    //     </Link>

                    // </div>
                ))}
            </div>
            {/* <button className="loader-button" onClick={loadFollowingPage}>Carregar mais produtos</button> */}
        </div>

    )
});