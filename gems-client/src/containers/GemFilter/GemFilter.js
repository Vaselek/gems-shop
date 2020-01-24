import React, {Component} from 'react';
import {fetchStones} from "../../store/actions/stonesActions";
import {fetchMetals} from "../../store/actions/metalsActions";
import {fetchCoatings} from "../../store/actions/coatingsActions";
import {connect} from 'react-redux';
import {fetchGems} from "../../store/actions/gemsActions";
import './GemFilter.css';
import GemFilterCard from "../../components/GemFilterCard/GemFilterCard";

class GemFilter extends Component {
  state = {
    stoneIds: [],
    metalIds: [],
    coatingIds: []
  };

  componentDidMount() {
    this.props.fetchStones();
    this.props.fetchMetals();
    this.props.fetchCoatings();
  }

  handleSelection = event => {
    let ids = [...this.state[event.target.name]];
    const id = event.target.id.split('_').slice(1).join();
    if (event.target.checked === true ){
      ids.push(id)
    } else {
      ids = ids.filter(e => e !== id)
    }
    this.setState({[event.target.name]: ids},
      () => {
        const filter = {};
        filter.stoneIds = this.state.stoneIds;
        filter.metalIds = this.state.metalIds;
        filter.coatingIds = this.state.coatingIds;
        this.props.fetchGems(this.props.categoryId, filter)
      });
  };

  render() {
    return (
      <div>
        <GemFilterCard title='Камни' filter='stone' items={this.props.stones} handleFilter={this.handleSelection}/>
        <GemFilterCard title='Металлы' filter='metal' items={this.props.metals} handleFilter={this.handleSelection}/>
        <GemFilterCard title='Покрытие' filter='coating' items={this.props.coatings} handleFilter={this.handleSelection}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stones: state.stones.stones,
  categoryId: state.gems.categoryId,
  metals: state.metals.metals,
  coatings: state.coatings.coatings
});

const mapDispatchToProps = dispatch => ({
  fetchStones: () => dispatch(fetchStones()),
  fetchMetals: () => dispatch(fetchMetals()),
  fetchCoatings: () => dispatch(fetchCoatings()),
  fetchGems: (categoryId, filter) => dispatch(fetchGems(categoryId, filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(GemFilter);