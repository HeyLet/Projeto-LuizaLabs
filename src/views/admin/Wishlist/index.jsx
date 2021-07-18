import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Swal from 'sweetalert2';
import formatCurrency from "common/mask/maskCurrency";

import Loading from "components/Loading";
import Header from "components/Header";

import "./styles.scss";
import {
  Row,
  Col,
  Button, 
  Card,
  CardBody,
  Container,
} from "reactstrap";

import api from "config/api";
import errorRequest from "common/errorRequest";

function Wishlist() {
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

  async function addWishlist(){
    setLoading(true);
    try {      
      Swal.fire('Sucesso!', 'O produto foi adicionado na sua lista de favoritos!', 'success');
    } catch (error) {
      Swal.fire('Alerta!', 'Produto já está na wishlist do cliente!', 'error');
    }
    setLoading(false);
  }

  async function deleteProduct(event, idProduct) {
    event.preventDefault();

    Swal.fire({
      title: 'Atenção',
      text: 'Deseja realmente excluir esse produto da lista de favoritos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua ele!'
    }).then(async (result) => {
      if (result.value) {
        setLoading(true);

        try {          
          setProducts(products => products.filter(item => item.id !== idProduct));
          setSearchItens(searchItens => searchItens.filter(item => item.id !== idProduct))
          Swal.fire('Deletado!', 'O produto foi excluido com sucesso', 'success');
        } catch (error) {
          errorRequest(history, error);
        }

        setLoading(false);
      }
    })
  } 

  return (
    <>
      <Header searchProduct={searchProduct}/>
      {loading && <Loading />}
      <Container fluid>
          <h1 className="title-home">Home > Lista de desejos</h1>
          <Col className="mb-5 mb-xl-0" xl="12">
              <Col className="card-container">            
                  {
                    searchItens && searchItens.length === 0 ?
                      <p className="mt-3 text-center">Nenhum registro foi encontrado...</p> :
                      searchItens.map((product) => (
                        <Card key={product.id} className="bg-gradient-secondary shadow">
                          
                        <CardBody className="card-itens-center">
                        <Row className="d-flex justify-content-between">
                            <Col className="p-0 ">
                            
                              <div className="list-image-product mt-1">
                                {
                                  <img 
                                    className="list-image-product" 
                                    src={product.image ? product.image : "https://www.inovegas.com.br/site/wp-content/uploads/2017/08/sem-foto.jpg"} 
                                    alt="avatar">
                                  </img>
                                }
                              </div>
                              <div className="pl-1 mt-2">                            
                                <small>{product.title}</small><br />
                                <small className="price-text">{formatCurrency(product.price)}</small><br />
                                
                              </div>
                            </Col> 
                            <Col xs="4" className="delete-button p-0">                              
                                <i 
                                onClick={(e) => deleteProduct(e, product.id)}

                                class="far fa-times-circle"></i>
                              
                            </Col>                           
                          </Row>
                        </CardBody>
                      </Card>
                      
                      ))
                  } 
              </Col>
          </Col>
      </Container>
    </>
  );
}

export default Wishlist;