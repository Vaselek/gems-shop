import React, {Fragment} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Gems from "./containers/Gems/Gems";
import NewGem from "./containers/NewGem/NewGem";
import NewMetal from "./containers/NewMetal/NewMetal";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewStone from "./containers/NewStone/NewStone";
import NewCoating from "./containers/NewCoating/NewCoating";
import NewCategory from "./containers/NewCategory/NewCategory";
import GemsTable from "./containers/GemsTable/GemsTable";
import Sidebar from "./components/UI/Sidebar/Sidebar";
import {Container} from "reactstrap";
import EditGem from "./containers/EditGem/EditGem";

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props} /> : <Redirect to='/login' />
);

const WithSideBar = ({user}) => {
  return (
  <Fragment>
    <Sidebar/>
    <div className='app-main-column'>
    <Switch>
      <Route path="/" exact component={Gems} />
      <Route path="/category/:id" component={Gems}/>
      <ProtectedRoute isAllowed={user && user.role === 'admin'} path="/edit-gem/:id" exact component={EditGem} />
      <ProtectedRoute isAllowed={user && user.role === 'admin'} path="/gems/new" exact component={NewGem} />
      <ProtectedRoute isAllowed={user && user.role === 'admin'} path="/metals/new" exact component={NewMetal} />
      <ProtectedRoute isAllowed={user && user.role === 'admin'} path="/coatings/new" exact component={NewCoating} />
      <ProtectedRoute isAllowed={user && user.role === 'admin'} path="/stones/new" exact component={NewStone} />
      <ProtectedRoute isAllowed={user && user.role === 'admin'} path="/categories/new" exact component={NewCategory} />
      <ProtectedRoute isAllowed={user && user.role === 'admin'} path="/edit-gem/:id" exact component={EditGem} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
    </Switch>
    </div>
  </Fragment>
)};

const Routes = ({user}) => {
  return (
    <Container className='app-container'>
    <Switch>
        <ProtectedRoute isAllowed={user && user.role === 'admin'} path="/gems-table" exact component={GemsTable} />
        <Route render={(props) => <WithSideBar {...props} user={user} />} />
    </Switch>
    </Container>
  );
};

export default Routes;