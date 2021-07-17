import React from "react";

// reactstrap components
import {  Container } from "reactstrap";
import "./styles.scss"

class Header extends React.Component {
  render() {
    return (
      <>
        <div  className="header header-background pb-6 pb-md-5 pt-5 pt-md-8">
          <Container fluid className="navbar-header">
            <div className="header-body">
            <nav className="navbar navbar-expand navbar-purple">
              <a className="navbar-brand text-white" href="#">MagaNets</a>              

              <div className="collapse navbar-collapse" id="navbarsExample02">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <span className="text-white" href="#"><i className="fas fa-map-marker-alt"></i> Cidade: São Paulo</span>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#"><i className="fas fa-phone"></i> Central de atendimentos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#"><i className="fas fa-heart"></i> Lista de desejos</a>
                  </li>
                </ul>

              </div>
            </nav>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
