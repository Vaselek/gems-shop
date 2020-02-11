import React, {Fragment, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import {updateCoating, fetchCoating} from "../../store/actions/coatingsActions";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {Alert} from "reactstrap";

const EditCoating = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const error = useSelector(state => state.coatings.error);
  const generalError = useSelector(state => state.coatings.generalError);
  const coating = useSelector(state => state.coatings.currentCoating);

  useEffect(() => {
    dispatch(fetchCoating(id));
  }, [dispatch, id]);

  const memoizedUpdateCoating = useCallback(
    coatingData => {
      dispatch(updateCoating(coatingData)).then((result) => {
        if (result === 'success') {
          history.push('/coatings-table');
        }
      });
    }, [dispatch, history]
  );

  return (
    <div>
      { generalError && (<Alert color="danger">
        {generalError}
      </Alert>) }
      { coating && <Fragment>
        <CategoryForm
          title='Форма редактирования покрытия'
          onSubmit={memoizedUpdateCoating}
          error={error}
          item={coating}
        />
      </Fragment> }
    </div>
  );
};

export default EditCoating;