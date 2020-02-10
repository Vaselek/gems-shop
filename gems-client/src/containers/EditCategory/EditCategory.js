import React, {Fragment, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import {updateCategory, fetchCategory} from "../../store/actions/categoriesActions";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {Alert} from "reactstrap";

const EditCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const error = useSelector(state => state.categories.error);
  const generalError = useSelector(state => state.categories.generalError);
  const category = useSelector(state => state.categories.currentCategory);

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);

  const memoizedUpdateCategory = useCallback(
    categoryData => {
      dispatch(updateCategory(categoryData)).then((result) => {
        if (result === 'success') {
          history.push('/categories-table');
        }
      });
    }, [dispatch, history]
  );

  return (
    <div>
      { generalError && (<Alert color="danger">
        {generalError}
      </Alert>) }
      { category && <Fragment>
        <CategoryForm
          title='Форма редактирования категории'
          onSubmit={memoizedUpdateCategory}
          error={error}
          item={category}
        />
      </Fragment> }
    </div>
  );
};

export default EditCategory;