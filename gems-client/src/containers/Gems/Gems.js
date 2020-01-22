import React, {Component} from 'react';
import {Col, Row} from "reactstrap";
import {fetchGems} from "../../store/actions/gemsActions";
import {connect} from "react-redux";
import GemListItem from "../../components/GemListItem/GemListItem";
import './Gems.css';


class Gems extends Component {
  componentDidMount() {
    this.props.fetchGems(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchGems(this.props.match.params.id);
    }
  }

  render() {
    return (
      <Row>
        <Col>
          <div className='gems-list'>
            {this.props.gems.map(gem => (
              <GemListItem
                key={gem.id}
                id={gem.id}
                title={gem.title}
                price={gem.price}
                image={gem.image}
                stones={gem.stones}
                metals={gem.metals}
                coatings={gem.coatings}
              />
            ))}
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  gems: state.gems.gems,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  fetchGems: (categoryId) => dispatch(fetchGems(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gems);
