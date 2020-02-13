import React, {Component, Fragment} from 'react';
import {Col, Row} from "reactstrap";
import {fetchGems} from "../../store/actions/gemsActions";
import {connect} from "react-redux";
import GemListItem from "../../components/GemListItem/GemListItem";
import Sorting from "../Sorting/Sorting";
import './Gems.css';
import {cloneDeep} from 'lodash';
import {defaultGemParams} from "../../constants";
import GemsPagination from "../../components/GemsPagination/GemsPagination";


class Gems extends Component {
  componentDidMount() {
    let newGemParams = cloneDeep(defaultGemParams);
    newGemParams.categoryId = this.props.match.params.id;
    this.props.fetchGems(newGemParams);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      let newGemParams = cloneDeep(this.props.gemParams);
      newGemParams.categoryId = this.props.match.params.id;
      newGemParams.pagination.offset = 0;
      this.props.fetchGems(newGemParams);
    }
  }

  render() {
    return (
      <Fragment>
        <Row className='gems-sorting-pagination-wrapper'>
          <Sorting />
          <GemsPagination />
        </Row>
        <Row>
          <Col>
            <div className='gems-list'>
              {this.props.gems && this.props.gems.map(gem => (
                <GemListItem
                  key={gem.id}
                  id={gem.id}
                  title={gem.title}
                  price={gem.price}
                  image={gem.image}
                  stones={gem.stones}
                  metals={gem.metals}
                  coatings={gem.coatings}
                  description={gem.description}
                  code={gem.code}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  gems: state.gems.gems,
  user: state.users.user,
  gemParams: state.gems.gemParams
});

const mapDispatchToProps = dispatch => ({
  fetchGems: (gemParams) => dispatch(fetchGems(gemParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gems);
