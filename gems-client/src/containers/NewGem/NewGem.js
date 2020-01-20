import React, {Component, Fragment} from 'react';
import GemForm from "../../components/GemForm/GemForm";
import {createGem} from "../../store/actions/gemsActions";
import {connect} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {fetchMetals} from "../../store/actions/metalsActions";
import {fetchCoatings} from "../../store/actions/coatingsActions";
import {fetchStones} from "../../store/actions/stonesActions";

class NewGem extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchMetals();
    this.props.fetchCoatings();
    this.props.fetchStones();
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
          metals={this.props.metals}
          stones={this.props.stones}
          coatings={this.props.coatings}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  user: state.users.user,
  metals: state.metals.metals,
  coatings: state.coatings.coatings,
  stones: state.stones.stones
});

const mapDispatchToProps = dispatch => ({
  onGemCreated: (gemData) => dispatch(createGem(gemData)),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchMetals: () => dispatch(fetchMetals()),
  fetchCoatings: () => dispatch(fetchCoatings()),
  fetchStones: () => dispatch(fetchStones())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGem);
