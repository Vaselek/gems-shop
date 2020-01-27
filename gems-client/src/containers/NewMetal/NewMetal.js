import React, {useCallback, Fragment} from 'react';
import {createMetal, fetchMetals} from "../../store/actions/metalsActions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router';

import'./NewMetal.css';
import CategoryForm from "../../components/CategoryForm/CategoryForm";

function NewMetal () {

  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector(state => state.metals.error);

  const memoizedCreateMetal = useCallback(
    metalData => {
      dispatch(createMetal(metalData)).then((result) => {
        if (result === 'success') {
          history.push('/')
          dispatch(fetchMetals())
        }
      });
    }, [dispatch, history]);

  return (
    <Fragment>
      <CategoryForm
        title='Форма добавления металла'
        className='metal-form'
        onSubmit={memoizedCreateMetal}
        error={error}
      />
    </Fragment>
  );
}


export default NewMetal;
