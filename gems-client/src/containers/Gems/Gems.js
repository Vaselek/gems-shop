import React, {Component, Fragment} from 'react';
import {Col, Row} from "reactstrap";
import {fetchGems} from "../../store/actions/gemsActions";
import {connect} from "react-redux";
import GemListItem from "../../components/GemListItem/GemListItem";
import Sorting from "../Sorting/Sorting";
import './Gems.css';
import {cloneDeep} from 'lodash';


class Gems extends Component {
  componentDidMount() {
    let gemParams = cloneDeep(this.props.gemParams);
    gemParams.categoryId = this.props.match.params.id;
    this.props.fetchGems(gemParams);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      let gemParams = cloneDeep(this.props.gemParams);
      gemParams.categoryId = this.props.match.params.id;
      this.props.fetchGems(gemParams);
    }
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Sorting />
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
