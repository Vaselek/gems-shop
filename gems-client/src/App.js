import React, {Component, Fragment} from 'react';
import {Container} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Toolbar from "./components/UI/Toolbar/Toolbar";
import {logoutUser} from "./store/actions/usersActions";
import Routes from "./Routes";

import "./App.css"
import {fetchCategories} from "./store/actions/categoriesActions";
import Footer from "./components/Footer/Footer";


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
          <Routes user={this.props.user} />
        </Container>
        <Footer  />
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
