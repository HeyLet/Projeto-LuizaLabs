import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Loading from "components/Loading";
import Header from "components/Header";

import Product from "./Product/index";

import "./styles.scss";
import {
  Col,
  Container,
} from "reactstrap";

import api from "config/api";
import errorRequest from "common/errorRequest";

function Products() {
  const history = useHistory();  
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchItens, setSearchItens] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function searchProduct(value){
    setSearchItens(products.filter(item => item.title.indexOf(value) != -1));
  }

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data } = await api.get(`/66063904-d43c-49ed-9329-d69ad44b885e`);      
      setProducts(data.products);
      setSearchItens(data.products);
    } catch (error) {
      errorRequest(history, error);
    }
    setLoading(false);
  }

  return (
    <>
      <Header searchProduct={searchProduct}/>
      {loading && <Loading />}
      <Container fluid>
          <h1 className="title-home">Home</h1>
          <Col className="mb-5 mb-xl-0" xl="12">
              <Col className="card-container">            
                  {
                    searchItens && searchItens.length === 0 ?
                      <p className="mt-3 text-center">Nenhum registro foi encontrado...</p> :
                      searchItens.map((product) => (
                        <Product product={product} setLoading={setLoading}/>
                      ))
                  } 
              </Col>
          </Col>
      </Container>
    </>
  );
}

export default Products;
