import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Gems from "./containers/Gems/Gems";
// import NewProduct from "./containers/NewProduct/NewProduct";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props} /> : <Redirect to='/login' />
);

const Routes = ({user}) => {
  return (
    <Switch>
      <Route path="/" exact component={Gems} />
      {/*<Route path="/category/:id" exact component={Products} />*/}
      {/*<ProtectedRoute isAllowed={user && user.role === 'admin'} path="/products/new" exact component={NewProduct} />*/}
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Routes;