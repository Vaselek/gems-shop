import React, {Fragment, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import {updateMetal, fetchMetal} from "../../store/actions/metalsActions";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {Alert} from "reactstrap";

const EditMetal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const error = useSelector(state => state.metals.error);
  const generalError = useSelector(state => state.metals.generalError);
  const metal = useSelector(state => state.metals.currentMetal);

  useEffect(() => {
    dispatch(fetchMetal(id));
  }, [dispatch, id]);

  const memoizedUpdateMetal = useCallback(
    metalData => {
      dispatch(updateMetal(metalData)).then((result) => {
        if (result === 'success') {
          history.push('/metals-table');
        }
      });
    }, [dispatch, history]
  );

  return (
    <div>
      { generalError && (<Alert color="danger">
        {generalError}
      </Alert>) }
      { metal && <Fragment>
        <CategoryForm
          title='Форма редактирования металла'
          onSubmit={memoizedUpdateMetal}
          error={error}
          item={metal}
        />
      </Fragment> }
    </div>
  );
};

export default EditMetal;