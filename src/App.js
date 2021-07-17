import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Products from "views/admin/Products/index.jsx";
import Wishlist from "views/admin/Wishlist/index.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={(props) => <Products {...props} />} />          
        <Route exact path="/wishlist" component={(props) => <Wishlist {...props} />} />          

        <Route exact path="*" render={(props) => <Products {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}
