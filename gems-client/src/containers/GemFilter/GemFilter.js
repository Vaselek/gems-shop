import React, {Component} from 'react';
import {fetchStones} from "../../store/actions/stonesActions";
import {connect} from 'react-redux';
import {Col, CustomInput, Form, FormGroup} from "reactstrap";

class GemFilter extends Component {
  state = {
    stoneIds: []
  };

  componentDidMount() {
    this.props.fetchStones();
  }

  handleSelection = event => {
    let ids = [...this.state[event.target.name]];
    const id = event.target.id.split('_').slice(1).join();
    if (event.target.checked === true ){
      ids.push(id)
    } else {
      ids = ids.filter(e => e !== id)
    }
    this.setState({[event.target.name]: ids});
  };

  render() {
    return (
      <div>
        <header className="card-header">
          <h6 className="title">Камни</h6>
        </header>
        <div className="filter-content">
          <div className="card-body">
            <Form>
              <FormGroup row>
                <Col sm={10}>
                  {this.props.stones.map(stone => (
                    <CustomInput key={'stone_' + stone.id} onChange={this.handleSelection} type="checkbox" name='stoneIds' id={'stone_' + stone.id} label={stone.title} />
                  ))}
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stones: state.stones.stones
})

const mapDispatchToProps = dispatch => ({
  fetchStones: () => dispatch(fetchStones())
});

export default connect(mapStateToProps, mapDispatchToProps)(GemFilter);