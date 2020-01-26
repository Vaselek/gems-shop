import React, {useCallback, useState} from 'react';
import {Button, Col, Form, FormGroup, Label, CustomInput} from "reactstrap";
import FormElement from "../UI/Form/FormElement";
import { isEmpty } from 'lodash';

function GemForm (props) {
  const [form, setState] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    categoryIds: [],
    weight: '',
    metalIds: [],
    coatingIds: [],
    stoneIds: []
  });

  const submitFormHandler = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        const arrayKeys = ['categoryIds', 'metalIds', 'coatingIds', 'stoneIds']
        if (arrayKeys.includes(key)) {
          for (let i = 0; i < form[key].length; i++) {
            formData.append(key + '[]', form[key][i]);
          }
        } else {
          formData.append(key, form[key]);
        }
      });
      props.onSubmit(formData);
    },
    [form],
  );

  const inputChangeHandler = useCallback(
    event => {
      setState({
        ...form,
        [event.target.name]: event.target.value
      })
    },
    [form]
  );

  const categoryInputChangeHandler = useCallback(
    event => {
      setState({...form, [event.target.name]: Array.from(event.target.selectedOptions, (item) => item.value)});
    },
    [form]
  );

  const itemsInputChangeHandler = useCallback(
    event => {
      let ids = form[event.target.name];
      const id = event.target.id.split('_').slice(1).join();
      if (event.target.checked === true ){
        ids.push(id)
      } else {
        ids = ids.filter(e => e !== id)
      }
      setState({...form, [event.target.name]: ids});
    },
    [form]
  );

  const fileChangeHandler = useCallback(
    event => {
      setState({
        ...form,
        [event.target.name]: event.target.files[0]
      });
    },
    [form]
  );

  const getErrorFor = useCallback (
    field => {
      if (isEmpty(props.error)) return false;
      const allErrors = [...props.error]
      const error = allErrors.filter(error => error.field === field).shift();
      if (!error) return null;
      return error.text;
    },
    [props.error]
  );

  return (
    <Form style={{width: '100%'}} onSubmit={submitFormHandler}>
      <FormElement
        propertyName='categoryIds'
        title='Категория'
        type='select'
        value={form.categoryIds}
        error={getErrorFor('categoryIds')}
        onChange={categoryInputChangeHandler}>
        <option value=''>Пожалуйста, выберите одну категорию</option>
        {props.categories.map(category => (
          <option key={category.id} value={category.id}>{category.title}</option>
        ))}
      </FormElement>
      <FormElement
        propertyName='title'
        title='Наименование'
        type='text'
        value={form.title}
        error={getErrorFor('title')}
        onChange={inputChangeHandler}/>
      <FormElement
        propertyName='price'
        title='Цена'
        type='number'
        min='0'
        value={form.price}
        error={getErrorFor('price')}
        onChange={inputChangeHandler}/>
      <FormElement
        propertyName='description'
        title='Описание'
        type='textarea'
        value={form.description}
        onChange={inputChangeHandler}/>
      <FormElement
        propertyName='weight'
        title='Вес'
        type='number'
        min="0"
        step="0.1"
        value={form.weight}
        onChange={inputChangeHandler}/>
      <FormElement
        propertyName='image'
        title='Изображение'
        type='file'
        error={getErrorFor('image')}
        data-buttonText="Your label here."
        onChange={fileChangeHandler}/>
      <FormGroup row>
        <Label sm={2} for={'metalIds'}>Металлы</Label>
        <Col sm={10}>
          {props.metals.map(metal => (
            <CustomInput key={'form-metal_' + metal.id} type="checkbox" name='metalIds' onChange={itemsInputChangeHandler} id={'form-metal_' + metal.id} label={metal.title} />
          ))}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2} for={'coatingIds'}>Покрытие</Label>
        <Col sm={10}>
          {props.coatings.map(coating => (
            <CustomInput key={'form-coating_' + coating.id} type="checkbox" name='coatingIds' onChange={itemsInputChangeHandler} id={'form-coating_' + coating.id} label={coating.title} />
          ))}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2} for={'stoneIds'}>Камни</Label>
        <Col sm={10}>
          {props.stones.map(stone => (
            <CustomInput key={'form-stone_' + stone.id} type="checkbox" name='stoneIds' onChange={itemsInputChangeHandler} id={'form-stone_' + stone.id} label={stone.title} />
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

export default GemForm;
