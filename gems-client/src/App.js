import React, {Component, Fragment} from 'react';
import {Container} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Toolbar from "./components/UI/Toolbar/Toolbar";
import {logoutUser} from "./store/actions/usersActions";
import Routes from "./Routes";

import "./App.css"
import Sidebar from "./components/UI/Sidebar/Sidebar";
import {fetchCategories} from "./store/actions/categoriesActions";


class App extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <Fragment>
        <header>
          <Toolbar
            user={this.props.user}
            logout={this.props.logoutUser}
            categories={this.props.categories}
          />
        </header>
        <Container className='app-container'>
          <Sidebar/>
          <div className='app-main-column'>
            <Routes user={this.props.user} />
          </div>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  categories: state.categories.categories
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  fetchCategories: () => dispatch(fetchCategories())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
