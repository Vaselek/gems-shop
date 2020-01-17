import React, {Component, Fragment} from 'react';
import GemForm from "../../components/GemForm/GemForm";
import {createGem} from "../../store/actions/gemsActions";
import {connect} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";

class NewGem extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  createGem = gemData => {
    this.props.onGemCreated(gemData).then(() => {
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <Fragment>
        <h2>New gem</h2>
        <GemForm
          onSubmit={this.createGem}
          categories={this.props.categories}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  onGemCreated: (gemData) => dispatch(createGem(gemData)),
  fetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGem);
