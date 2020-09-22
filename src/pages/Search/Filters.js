import React, { useState, useEffect, useContext } from 'react';
import { GrClose } from 'react-icons/gr';

import { SearchContext } from '../../Contexts/SearchContext';
import api from '../../services/api';

import './styles.css';


function Filters(props) {

  const searchContext = useContext(SearchContext);

  const [max_price, setMax_Price] = useState('');
  const [min_price, setMin_Price] = useState('');
  const [order_by, setOrder_by] = useState('');
  const [search, setSearch] = useState(searchContext.rawSearch || '');
  const [categoryId, setCategoryId] = useState('');
  const [subcategory_id, setSubcategory_id] = useState('');

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);


  useEffect(() => {
    api.get('categories').then(response => {
      setCategories(response.data);
      console.log(response.data);
    })
  }, []);

  useEffect(() => {
    setSearch(searchContext.rawSearch);
  }, [searchContext.rawSearch])

  function handleSubmit(e) {
    e.preventDefault();
    const searchConfig = {
      minPrice: min_price,
      maxPrice: max_price,
      orderBy: order_by,
      search: search,
      categoryId: categoryId,
      subcategoryId: subcategory_id
    }

    if(props.visible) {
      props.setVisible(false);
    }

    searchContext.handleSearch(searchConfig);

  }

  function handleCategorySelection(event) {
    const newCat = categories.find(cat => cat.id == event.target.value);
    if (newCat) {
      setCategoryId(Number(newCat.id));
      setSubcategories(newCat.subcategories);
    }
    else {
      setCategoryId(0);
      setSubcategories('');
    }

  }

  return (
    <div className={`filters-container ${props.visible && 'visible slide-in-left'}`}>
      <div className="close-icon-container">
        <GrClose className="close-icon" onClick={()=>{props.setVisible(!props.visible)}}/>
      </div>
      
      <form onSubmit={handleSubmit}>
        <h4>Filtros</h4>
        <strong>Faixa de preço</strong>
        <div className='price-range'>
          De
          <input type="number" name="min-price" id="min-price" value={min_price} onChange={e => setMin_Price(e.target.value)} step="0.01" />
          até
          <input type="number" name="max-price" id="max-price" value={max_price} onChange={e => setMax_Price(e.target.value)} step="0.01" />
        </div>

        <strong>Ordernar por</strong>
        <select name="order-by" id="order-by" value={order_by} onChange={e => setOrder_by(e.target.value)}>
          <option default value="default"> </option>
          <option value="price-ascending">Preço: do mais baixo para o mais alto</option>
          <option value="price-descending">Preço: do mais alto para o mais baixo</option>
        </select>

        <strong>Termo de pesquisa</strong>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />

        <strong>Categoria</strong>
        <select name="category" id="category" value={categoryId} onChange={handleCategorySelection}>
          <option value="0" default>Nenhuma</option>
          {categories.length > 0 && categories.map(cat => {
            return <option value={cat.id} key={`cat-${cat.id}`}>{cat.name}</option>
          })}
        </select>
        <strong>Subcategoria</strong>
        <select name="subcategory" id="subcategory" value={subcategory_id} onChange={e => setSubcategory_id(e.target.value)}>
          <option value="0" default>Nenhuma</option>
          {subcategories.length > 0 && subcategories.map(subcat => {
            return <option value={subcat.id} key={`subcat-${subcat.id}`}>{subcat.name}</option>
          })}
        </select>

        <button type="submit">Aplicar filtros</button>

      </form>
    </div>
  )
}

export default Filters;