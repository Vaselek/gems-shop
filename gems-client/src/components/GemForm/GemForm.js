import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Label, CustomInput} from "reactstrap";
import FormElement from "../UI/Form/FormElement";

class GemForm extends Component {
  state = {
    title: '',
    price: '',
    description: '',
    image: '',
    categoryIds: [],
    weight: '',
    metalIds: [],
    coatingIds: [],
    stoneIds: []
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      if (key === "categoryIds") {
        for (let i = 0; i < this.state.categoryIds.length; i++) {
          formData.append('categoryIds[]', this.state.categoryIds[i]);
        }
      } else if (key === "metalIds") {
        for (let i = 0; i < this.state.metalIds.length; i++) {
          formData.append('metalIds[]', this.state.metalIds[i]);
        }
      } else if (key === "coatingIds") {
        for (let i = 0; i < this.state.coatingIds.length; i++) {
          formData.append('coatingIds[]', this.state.coatingIds[i]);
        }
      } else if (key === "stoneIds") {
        for (let i = 0; i < this.state.stoneIds.length; i++) {
          formData.append('stoneIds[]', this.state.stoneIds[i]);
        }
      } else {
        formData.append(key, this.state[key]);
      }
    });
    this.props.onSubmit(formData);
  };

  inputChangeHandler = event => {
    // debugger
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  inputChangeHandler2 = event => {
    this.setState({[event.target.name]: Array.from(event.target.selectedOptions, (item) => item.value)});
  };

  inputChangeHandler3 = event => {
    let ids = [...this.state[event.target.name]];
    const id = event.target.id.split('_').slice(1).join();
    if (event.target.checked === true ){
      ids.push(id)
    } else {
      ids = ids.filter(e => e !== id)
    }
    this.setState({[event.target.name]: ids});
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    });
  };

  render() {
    return (
      <Form onSubmit={this.submitFormHandler}>
        <FormElement
          propertyName='categoryIds'
          title='Category'
          type='select'
          value={this.state.categoryIds}
          required
          onChange={this.inputChangeHandler2}>
          multiple={true}
          <option value=''>Please select category</option>
          {this.props.categories.map(category => (
            <option key={category.id} value={category.id}>{category.title}</option>
          ))}
        </FormElement>
        <FormElement
          propertyName='title'
          title='Title'
          type='text'
          required
          value={this.state.title}
          onChange={this.inputChangeHandler}/>
        <FormElement
          propertyName='price'
          title='Price'
          type='number'
          required min='0'
          value={this.state.price}
          onChange={this.inputChangeHandler}/>
        <FormElement
          propertyName='description'
          title='Description'
          type='textarea'
          value={this.state.description}
          onChange={this.inputChangeHandler}/>
        <FormElement
          propertyName='weight'
          title='Weight'
          type='number'
          value={this.state.weight}
          onChange={this.inputChangeHandler}/>
        <FormElement
          propertyName='image'
          title='Image'
          type='file'
          onChange={this.fileChangeHandler}/>
        <FormGroup row>
          <Label sm={2} for={'metalIds'}>Металлы</Label>
          <Col sm={10}>
            {this.props.metals.map(metal => (
              <CustomInput key={'metal_' + metal.id} type="checkbox" name='metalIds' onChange={this.inputChangeHandler3} id={'metal_' + metal.id} label={metal.title} />
            ))}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for={'coatingIds'}>Покрытие</Label>
          <Col sm={10}>
            {this.props.coatings.map(coating => (
              <CustomInput key={'coating_' + coating.id} type="checkbox" name='coatingIds' onChange={this.inputChangeHandler3} id={'coating_' + coating.id} label={coating.title} />
            ))}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for={'stoneIds'}>Камни</Label>
          <Col sm={10}>
            {this.props.stones.map(stone => (
              <CustomInput key={'stone_' + stone.id} type="checkbox" name='stoneIds' onChange={this.inputChangeHandler3} id={'stone_' + stone.id} label={stone.title} />
            ))}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{offset: 2, size: 10}}>
            <Button type="submit" color="primary">Save</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default GemForm;
