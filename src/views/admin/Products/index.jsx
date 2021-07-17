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

function Products() {
  const history = useHistory();  
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data } = await api.get(`/66063904-d43c-49ed-9329-d69ad44b885e`);      
      setProducts(data.products);
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

  return (
    <>
      <Header />
      {loading && <Loading />}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Row>
              <Col className="card-container">            
                
                  {
                    products && products.length === 0 ?
                      <li className="mt-3 text-center">Nenhum registro foi encontrado...</li> :
                      products.map((product) => (
                        <Card key={product.id} className="bg-gradient-secondary shadow">
                          
                        <CardBody >
                        <Row className="d-flex justify-content-between">
                            <Col xs="8" className="p-0">
                              <div className="list-image-product mt-1">
                                {
                                  <img 
                                    className="list-image-product" 
                                    src={product.image ? product.image : "https://www.inovegas.com.br/site/wp-content/uploads/2017/08/sem-foto.jpg"} 
                                    alt="avatar">
                                  </img>
                                }
                              </div>
                              <div className="pl-1">                            
                                <small>{product.title}</small><br />
                                <small>{formatCurrency(product.price)}</small><br />
                                
                              </div>
                            </Col>
                            <Col xs="4" className="favorite-button p-0">
                              <Button
                                className="table-action-button-danger"
                                onClick={() => addWishlist(product.codigo)}
                              >
                                <i className="fa fa-heart" />
                              </Button>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                      
                      ))
                  }
                
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Products;
