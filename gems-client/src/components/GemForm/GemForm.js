import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../UI/Form/FormElement";

class GemForm extends Component {
  state = {
    title: '',
    price: '',
    description: '',
    image: '',
    categoryIds: [],
    weight: ''
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      if (key === "categoryIds") {
        for (let i = 0; i < this.state.categoryIds.length; i++) {
          formData.append('categoryIds[]', this.state.categoryIds[i]);
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
          <Col sm={{offset: 2, size: 10}}>
            <Button type="submit" color="primary">Save</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default GemForm;
