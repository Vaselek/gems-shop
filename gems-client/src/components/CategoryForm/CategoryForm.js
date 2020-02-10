import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../UI/Form/FormElement";
import './CategoryForm.css';

function CategoryForm (props) {

  const getFormData = (item) => {
    if (item) {
      const id = item.id;
      const title = item.title;
      const description = item.description ? item.description : '';
      return {id, title, description};
    }
  };

  const emptyForm = {
    title: '',
    description: ''
  };
  
  const [form, setState] = useState(emptyForm);

  useEffect(() => {
    if (props.item) {
      const newForm = getFormData(props.item);
      setState(newForm)
    }
  }, [props.item]);

  const submitFormHandler = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
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

  return (
    <div className='category-form'>
      <h4 className='category-form-header'>{props.title}</h4>
      <Form style={{width: '100%'}} onSubmit={submitFormHandler}>
        <FormElement
          propertyName='title'
          title='Наименование'
          type='text'
          value={form.title}
          error={props.error}
          onChange={inputChangeHandler}/>
        <FormElement
          propertyName='description'
          title='Описание'
          type='textarea'
          value={form.description}
          onChange={inputChangeHandler}/>
        <FormGroup row>
          <Col sm={{offset: 2, size: 10}}>
            <Button type="submit" color="primary">Save</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default CategoryForm;
