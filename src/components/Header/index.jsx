import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import {  Container } from "reactstrap";
import "./styles.scss"
import SearchBar from "components/SearchBar";

export default function Header({ searchProduct }){
  const history = useHistory();
  const [search, setSearch] = useState("");

  async function changeSearch(value){
    setSearch(value);
    await searchProduct(value);
  }

  return (
    <>
      <div  className="header header-background width-total pb-6 pb-md-5 pt-5 pt-md-8">
        <Container fluid className="navbar-header width-total">
          <div className="header-body">
            <nav className="navbar navbar-expand">
              <a className="navbar-brand text-white" onClick={() => history.push(`/`)}>MagaNets</a>              

              <div className="collapse navbar-collapse" id="navbarsExample02">
                <ul className="navbar-nav mr-auto navbar-link">
                  <li className="nav-item">
                    <span className="text-white" href="#"><i className="fas fa-map-marker-alt"></i> Cidade: São Paulo</span>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#"><i className="fas fa-phone"></i> Central de atendimentos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" onClick={() => history.push(`/wishlist`)}><i className="fas fa-heart"></i> Lista de desejos</a>
                  </li>
                </ul>

              </div>
              
            </nav>
            <SearchBar 
              onChange={(e) => changeSearch(e.target.value)}
              value={search}
            /> 
          </div>
        </Container>
      </div>
    </>
  );
}