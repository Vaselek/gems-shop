import React, {useCallback, Fragment} from 'react';
import {createCategory, fetchCategories} from "../../store/actions/categoriesActions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router';

import CategoryForm from "../../components/CategoryForm/CategoryForm";

function NewCategory () {

  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector(state => state.categories.error);

  const memoizedCreateCategory = useCallback(
    categoryData => {
      dispatch(createCategory(categoryData)).then((result) => {
        if (result === 'success') {
          history.push('/categories-table');
          dispatch(fetchCategories())
        }
      });
    }, [dispatch, history]
  );

  return (
    <Fragment>
      <CategoryForm
        title='Форма добавления категории'
        className='category-form'
        onSubmit={memoizedCreateCategory}
        error={error}
      />
    </Fragment>
  );
}


export default NewCategory;
