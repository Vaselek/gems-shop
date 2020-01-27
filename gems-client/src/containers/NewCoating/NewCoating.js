import React, {useCallback, Fragment} from 'react';
import {createCoating, fetchCoatings} from "../../store/actions/coatingsActions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router';

import CategoryForm from "../../components/CategoryForm/CategoryForm";

function NewCoating () {

  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector(state => state.coatings.error);

  const memoizedCreateCoating = useCallback(
    coatingData => {
      dispatch(createCoating(coatingData)).then((result) => {
        if (result === 'success') {
          history.push('/');
          dispatch(fetchCoatings())
        }
      });
    }, [dispatch, history]);

  return (
    <Fragment>
      <CategoryForm
        title='Форма добавления покрытия'
        className='coating-form'
        onSubmit={memoizedCreateCoating}
        error={error}
      />
    </Fragment>
  );
}


export default NewCoating;
