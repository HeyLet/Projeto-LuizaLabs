import React, { useState } from "react";

import formatCurrency from "common/mask/maskCurrency";
import Swal from 'sweetalert2';

import "./styles.scss";
import {
  Row,
  Col,
  Button, 
  Card,
  CardBody,
} from "reactstrap";

function Products({ product, setLoading }) {
  const [productFavorite, setProductFavorite] = useState(false);

  async function addWishlist(){
    setLoading(true);
    try {      
      setProductFavorite(productFavorite => !productFavorite);
      if(!productFavorite)
        Swal.fire('Sucesso!', 'O produto foi adicionado na sua lista de favoritos!', 'success');
    } catch (error) {
      Swal.fire('Alerta!', 'Produto já está na wishlist do cliente!', 'error');
    }
    setLoading(false);
  }

  return (
    <>
      <Card key={product.id} className="bg-gradient-secondary shadow">
        
        <CardBody className="card-itens-center">
        <Row className="d-flex justify-content-between">
            <Col className="p-0">
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
            <Col xs="4" className="favorite-button p-0">
              <Button
                className="table-action-button-danger"
                onClick={() => addWishlist(product.codigo)}
              >
                <i className={"fa fa-heart " + (productFavorite ? "text-danger" : "")} />
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}

export default Products;
