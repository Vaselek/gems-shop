import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Label, CustomInput} from "reactstrap";
import FormElement from "../UI/Form/FormElement";
import { isEmpty } from 'lodash';


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
      const arrayKeys = ['categoryIds', 'metalIds', 'coatingIds', 'stoneIds']
      if (arrayKeys.includes(key)) {
        for (let i = 0; i < this.state[key].length; i++) {
          formData.append(key + '[]', this.state[key][i]);
        }
      } else {
        formData.append(key, this.state[key]);
      }
    });
    this.props.onSubmit(formData);
  };

  inputChangeHandler = event => {
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

  getErrorFor = (field) => {
    if (isEmpty(this.props.error)) return false;
    const allErrors = [...this.props.error]
    const error = allErrors.filter(error => error.field === field).shift();
    if (!error) return null;
    return error.text;
  }

  render() {
    return (
      <Form style={{width: '100%'}} onSubmit={this.submitFormHandler}>
        <FormElement
          propertyName='categoryIds'
          title='Категория'
          type='select'
          value={this.state.categoryIds}
          error={this.getErrorFor('categoryIds')}
          onChange={this.inputChangeHandler2}>
          <option value=''>Пожалуйста, выберите одну категорию</option>
          {this.props.categories.map(category => (
            <option key={category.id} value={category.id}>{category.title}</option>
          ))}
        </FormElement>
        <FormElement
          propertyName='title'
          title='Наименование'
          type='text'
          value={this.state.title}
          error={this.getErrorFor('title')}
          onChange={this.inputChangeHandler}/>
        <FormElement
          propertyName='price'
          title='Цена'
          type='number'
          min='0'
          value={this.state.price}
          error={this.getErrorFor('price')}
          onChange={this.inputChangeHandler}/>
        <FormElement
          propertyName='description'
          title='Описание'
          type='textarea'
          value={this.state.description}
          onChange={this.inputChangeHandler}/>
        <FormElement
          propertyName='weight'
          title='Вес'
          type='number'
          min="0"
          step="0.1"
          value={this.state.weight}
          onChange={this.inputChangeHandler}/>
        <FormElement
          propertyName='image'
          title='Изображение'
          type='file'
          error={this.getErrorFor('image')}
          data-buttonText="Your label here."
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
