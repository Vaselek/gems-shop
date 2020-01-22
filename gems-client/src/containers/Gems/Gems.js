import React, {Component} from 'react';
import {Button, Col, Row} from "reactstrap";
import {fetchGems} from "../../store/actions/gemsActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import GemListItem from "../../components/GemListItem/GemListItem";
import './Gems.css';


class Gems extends Component {
  componentDidMount() {
    this.props.fetchGems(this.props.match.params.id);
    // this.props.fetchCategories();
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
          <h2>
            Gems
            { this.props.user && this.props.user.role === 'admin' && (
              <Link to="/gems/new">
                <Button
                  color="primary"
                  className="float-right">
                  Add gem
                </Button>
              </Link>
            )}
          </h2>
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
