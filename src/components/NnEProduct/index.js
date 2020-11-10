import React, { useState, useEffect } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import api from "../../services/api";
import "./styles.css";
import SimpleInput from "./SimpleInput";
import SimpleSwitch from "./SimpleSwitch";
import ImageUpload from '../../components/ImageUpload';
import MultipleUploader from '../../components/MultipleUploader';

export default function NewProduct(props, { id, className, fileName, onSubmit, witchOne }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [client_price, setClientPrice] = useState();
  const [client_sale_price, setClientSalePrice] = useState();
  const [wholesaler_price, setWholesalerPrice] = useState();
  const [wholesaler_sale_price, setWholesalerSalePrice] = useState();
  const [on_sale_client, setOnsaleClient] = useState(true);
  const [on_sale_wholesaler, setOnsaleWholesaler] = useState(true);
  const [featured, setFeatured] = useState(true);
  const [visible, setVisible] = useState(true);
  const [stock_quantity, setQuantity] = useState();
  const [min_stock, setMinimum] = useState();
  const [weight, setWeight] = useState();
  const [image_id, setImage] = useState();
  const [images, setImages] = useState(null)
  const [subcategory_id, setSubcategory] = useState(0);
  const [category_id, setCategoryId] = useState(0);
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [length, setLength] = useState();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);


  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
  });
  const [editar, setEditar] = useState();

  useEffect(() => {
    api.get('categories').then(response => {
      setCategories(response.data);
      console.log(response.data);
    })
  }, []);

  useEffect(() => {
    if (witchOne === "editar") {
      setEditar(true);
    }
  }, []);

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

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    // setVisible(!visible);
    const source = event.target.name
    switch (source) {
      case "checkedA":
        setVisible(!visible);
        break;
      case "checkedB":
        setOnsaleClient(!on_sale_client);
        break;
      case "checkedC":
        setOnsaleWholesaler(!on_sale_wholesaler);
        break;
      case "checkedD":
        setFeatured(!featured);
        break;
      default: console.log("erro")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let data = new FormData();
    function addToData(key, value) {
      if (value !== undefined && value !== '')
        data.append(key, value);
    }

    addToData('name', name);
    addToData('description', description);
    addToData('client_price', client_price);
    addToData('client_sale_price', client_sale_price);
    addToData('wholesaler_price', wholesaler_price);
    addToData('wholesaler_sale_price', wholesaler_sale_price);
    addToData('stock_quantity', stock_quantity);
    addToData('min_stock', min_stock);
    addToData('visible', visible);
    addToData('on_sale_client', on_sale_client);
    addToData('on_sale_wholesaler', on_sale_wholesaler);
    addToData('featured', featured);
    addToData('imageFile', image_id);
    if (images) {
      images.forEach(image => {
        addToData('imageFiles', image);
      })
    }
    addToData('subcategory_id', subcategory_id);
    // addToData('weight', weight);

    addToData('weight', weight);
    addToData('height', height);
    addToData('width', width);
    addToData('length', length);

    try {
      const response = await api.post("newProduct", data, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.accessToken,
        }
      })
      alert(`Registro concluído!`, response);
    } catch (err) {
      console.log(JSON.stringify(err));
      console.log(err.response);
      alert("Register error");
    }
  }

  function handleImage(img) {
    setImage(img);
  }

  function handleImages(images) {
    setImages(images)
  }

  return (
    <div>
      <div className="new-product-all">


        <form onSubmit={handleSubmit}>
          <div className="product-title-page">
            <h3>Novo Produto</h3>

            <div className="form-wrapper">
              <div className="divisor-teste">
                <div className="left-form">
                  <div className="general-form">
                    <p className="productTitle">Geral</p>
                    <label htmlFor="name">Nome do produto</label>
                    <input
                      className="product-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="description">Descrição</label>
                    <textarea
                      className="description"
                      type="text"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <p className="productTitle"> Preço</p>
                  <div className="price-form">
                    <div className="left-side">
                      <label htmlFor="client">Cliente</label>
                      <SimpleInput name="R$" value={client_price} setValue={setClientPrice} />
                      
                      <label htmlFor="promotional-price-r">
                        Preço Promocional (opcional)
                      </label>
                      <SimpleInput name="R$" value={client_sale_price} setValue={setClientSalePrice} 
                        optional={true} promotion={true}
                      />
                    </div>
                    <div className="right-side">
                      <label htmlFor="wholesale">Atacado</label>
                      <SimpleInput name="R$" value={wholesaler_price} setValue={setWholesalerPrice} />
                     
                      <label htmlFor="promotional-price-l">
                        Preço Promocional (opcional)
                      </label>
                      <SimpleInput name="R$" value={wholesaler_sale_price} setValue={setWholesalerSalePrice}
                        optional={true} promotion={true}
                      />
                    </div>
                  </div>

                  <div className="images-form">
                    <p className="productTitle">Imagens</p>
                    <label className="images-label" htmlFor="main">
                      Principal
                  </label>
                    <div className="input-group mb-3">

                      <ImageUpload onChange={handleImage} fileName={'imageFile'} />

                    </div>

                    <label className="images-label" htmlFor="secondary">
                      Secudárias
                  </label>
                    <div className="input-group mb-3">

                      <MultipleUploader onChange={handleImages} images={images} />

                      <div className="file-names">
                        {images ? images.map((image) => { return <h6>{image.name}</h6> }) : <h1></h1>}
                      </div>

                    </div>
                    <span className="images-label">
                      Formatos aceitos: JPG, PNG
                  </span>
                  </div>
                </div>
                <div className="separator-ne"></div>
                <div className="right-form-dois">
                  <div className="right-form">
                    <div className="config-form" >
                      <p className="productTitle">Configuração</p>
                      <SimpleSwitch
                        value={visible} checked={state.checkedA}
                        handleChange={handleChange}
                        name="checkedA"
                        id="switch_1"
                        label="Visível para compradores"
                      />
                      <SimpleSwitch
                        value={on_sale_client}
                        checked={state.checkedB}
                        handleChange={handleChange}
                        name="checkedB"
                        id="switch_2"
                        label="Em promoção (clientes)"
                      />
                      <SimpleSwitch
                        value={on_sale_wholesaler}
                        checked={state.checkedC}
                        handleChange={handleChange}
                        name="checkedC"
                        id="switch_3"
                        label="Em promoção (Atacadista)"
                      />
                      <SimpleSwitch
                        value={featured}
                        checked={state.checkedD}
                        handleChange={handleChange}
                        name="checkedD"
                        id="switch_4"
                        label="Em destaque"
                      />
                    </div>
                    <div className="stock-form">
                      <p className="productTitle">Estoque</p>
                      <SimpleInput name="Unidades" value={stock_quantity} setValue={setQuantity} />
                      <SimpleInput name="Mínimo" value={min_stock} setValue={setMinimum} />
                      <SimpleInput name="Peso" value={weight} setValue={setWeight} unit="g" />
                      <SimpleInput name="Altura" value={height} setValue={setHeight} unit="cm" />
                      <SimpleInput name="Largura" value={width} setValue={setWidth} unit="cm" />
                      <SimpleInput name="Comprimento" value={length} setValue={setLength} unit="cm" />
                    </div>
                    <div className="category-form">
                      <p className="productTitle">Categorias</p>
                      <div className="productCategoiries">
                        <div className="categoryLeft">
                          <div className="categoriesSelection">
                            <label
                              className="category-label"
                              htmlFor="main-category"
                            >
                              Principal:{" "}
                            </label>
                            {/*DROPDOWNS*/}
                            <select name="cars" id="cars" value={category_id} onChange={handleCategorySelection}>
                              <option value="0" disabled>Selecionar</option>
                              {categories.map(cat => {
                                return <option value={cat.id} key={`cat-${cat.id}`}>{cat.name}</option>
                              })}
                            </select>
                          </div>
                          <div className="categoriesSelection">
                            <label
                              className="category-label"
                              htmlFor="subcategory"
                            >
                              Subcategoria:
                          </label>
                            <select value={subcategory_id} onChange={(e) => setSubcategory(e.target.value)}>
                              <option value="0" disabled>Selecionar</option>
                              {subcategories.map(subcat => {
                                return <option value={subcat.id} key={`subcat-${subcat.id}`}>{subcat.name}</option>
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {editar ? (
                <div className="edit-button">
                  <button className="edit-erase" type="submit">
                    Excluir Produto
                  <DeleteForeverIcon />
                  </button>
                  <button className="edit-save" type="submit">
                    Enviar Alterações
                </button>
                </div>
              ) : (
                  <div className="product-button">
                    <button type="submit">CRIAR</button>
                  </div>
                )}
            </div>
          </div>
        </form>
      </div>
    </div >
  );
}
