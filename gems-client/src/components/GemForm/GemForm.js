import React, {useCallback, useState, useEffect} from 'react';
import {Button, Col, Form, FormGroup, Label, CustomInput, Input, FormFeedback} from "reactstrap";
import FormElement from "../UI/Form/FormElement";
import { isEmpty } from 'lodash';
import {apiURL} from "../../constants";
import {startCase, toLower} from 'lodash';

function GemForm (props) {
  const emptyForm = {
    title: '',
    price: '',
    description: '',
    image: '',
    categoryIds: [],
    weight: '',
    metalIds: [],
    coatingIds: [],
    stoneIds: [],
    code: '',
    error: [],
    discount: ''
  };
  const [form, setState] = useState(emptyForm);

  useEffect(() => {
    if (props.gem) {
      const newForm = {...props.gem};
      setState(newForm)
    }
  }, [props.gem]);

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
    [form, props],
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
      setState({...form, [event.target.name]: Array.from(event.target.selectedOptions, (item) => parseInt(item.value))});
    },
    [form]
  );

  const itemsInputChangeHandler = useCallback(
    event => {
      let ids = form[event.target.name];
      const id = parseInt(event.target.id.split('_').slice(1).join());
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
      if (isEmpty(props.error)) return null;
      const allErrors = [...props.error];
      const error = allErrors.filter(error => error.field === field).shift();
      if (!error) return null;
      return error.text;
    },
    [props.error]
  );

  const url = form.image.name ? URL.createObjectURL(form.image) : apiURL + '/' + form.image;

  return (
    <Form style={{width: '100%'}} onSubmit={submitFormHandler}>
      <FormElement
        propertyName='categoryIds'
        title='??????????????????'
        type='select'
        value={form.categoryIds[0]}
        error={getErrorFor('categoryIds')}
        onChange={categoryInputChangeHandler}>
        <option value=''>????????????????????, ???????????????? ???????? ??????????????????</option>
        {props.categories && props.categories.map(category => (
          <option key={category.id} value={category.id}>{ startCase(toLower(category.title)) }</option>
        ))}
      </FormElement>
      <FormElement
        propertyName='title'
        title='????????????????????????'
        type='text'
        value={form.title}
        error={getErrorFor('title')}
        onChange={inputChangeHandler}/>
      <FormElement
        propertyName='code'
        title='??????'
        type='text'
        value={form.code}
        error={getErrorFor('code')}
        onChange={inputChangeHandler}/>
      <FormElement
        propertyName='price'
        title='????????'
        type='number'
        min='0'
        value={form.price}
        error={getErrorFor('price')}
        onChange={inputChangeHandler}/>
      <FormElement
        propertyName='description'
        title='????????????????'
        type='textarea'
        value={form.description}
        onChange={inputChangeHandler}/>
      <FormElement
        propertyName='weight'
        title='??????'
        type='number'
        min="0"
        step="0.1"
        value={form.weight}
        onChange={inputChangeHandler}/>
      <FormElement
        propertyName='discount'
        title='????????????'
        placeholder='???????????? ???????????? ?? ??????????????????. ???????????????? ???????????? ?????? ???????????????????????? ????????????.'
        type='number'
        min="0"
        step="0.1"
        value={form.discount}
        onChange={inputChangeHandler}/>
      <FormGroup row>
        <Label sm={2} for='image'>??????????????????????</Label>
        {form.image && (<Col sm={2}>
          <img src={url} className="img-thumbnail" alt=""/>
        </Col>)}
        <Col sm={8}>
        <Input
          name='image' id='image'
          invalid={!!getErrorFor('image')}
          onChange={fileChangeHandler}
          type='file'
        >
        </Input>
        {getErrorFor('image') && (
          <FormFeedback>
            {getErrorFor('image')}
          </FormFeedback>
        )}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2} for={'metalIds'}>??????????????</Label>
        <Col sm={10}>
          {props.metals && props.metals.map(metal => (
            <CustomInput key={'form-metal_' + metal.id} checked={form.metalIds.includes(metal.id)} type="checkbox" name='metalIds' onChange={itemsInputChangeHandler} id={'form-metal_' + metal.id} label={ startCase(toLower(metal.title)) } />
          ))}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2} for={'coatingIds'}>????????????????</Label>
        <Col sm={10}>
          {props.coatings && props.coatings.map(coating => (
            <CustomInput key={'form-coating_' + coating.id} checked={form.coatingIds.includes(coating.id)} type="checkbox" name='coatingIds' onChange={itemsInputChangeHandler} id={'form-coating_' + coating.id} label={ startCase(toLower(coating.title)) } />
          ))}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2} for={'stoneIds'}>??????????</Label>
        <Col sm={10}>
          {props.stones && props.stones.map(stone => (
            <CustomInput key={'form-stone_' + stone.id} checked={form.stoneIds.includes(stone.id)} type="checkbox" name='stoneIds' onChange={itemsInputChangeHandler} id={'form-stone_' + stone.id} label={ startCase(toLower(stone.title)) } />
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
