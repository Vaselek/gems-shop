import React, {Component} from 'react';
import {Button, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {fetchGems} from "../../store/actions/gemsActions";
import {connect} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import GemListItem from "../../components/GemListItem/GemListItem";
import {fetchCategories} from "../../store/actions/categoriesActions";


class Gems extends Component {
  componentDidMount() {
    this.props.fetchGems(this.props.match.params.id);
    this.props.fetchCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchGems(this.props.match.params.id);
    }
  }

  render() {
    return (
      <Row>
        <Col sm={3}>
          <h2>Categories</h2>
          <ListGroup>
            <ListGroupItem tag={NavLink} exact to='/'>All categories</ListGroupItem>
            {this.props.categories.map(category => (
              <ListGroupItem key={category._id} tag={NavLink} to={'/category/' + category._id}>{category.title}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col sm={9}>
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
          {/*{this.props.gems.map(gem => (*/}
            {/*<GemListItem*/}
              {/*key={gem._id}*/}
              {/*_id={gem._id}*/}
              {/*title={gem.title}*/}
              {/*price={gem.price}*/}
              {/*image={gem.image}*/}
            {/*/>*/}
          {/*))}*/}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  // gems: state.gems.gems,
  user: state.users.user,
  categories: state.categories.categories
});

const mapDispatchToProps = dispatch => ({
  fetchGems: (categoryId) => dispatch(fetchGems(categoryId)),
  fetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Gems);
