import React, {Fragment, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import {updateStone, fetchStone} from "../../store/actions/stonesActions";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {Alert} from "reactstrap";

const EditStone = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchStone(id));
  }, [dispatch, id]);

  const error = useSelector(state => state.stones.error);
  const generalError = useSelector(state => state.stones.generalError);
  const stone = useSelector(state => state.stones.currentStone);

  const memoizedUpdateStone = useCallback(
    stoneData => {
      dispatch(updateStone(stoneData)).then((result) => {
        if (result === 'success') {
          history.push('/stones-table');
        }
      });
    }, [dispatch, history]
  );

  return (
    <div>
      { generalError && (<Alert color="danger">
        {generalError}
      </Alert>) }
      { stone && <Fragment>
        <CategoryForm
          title='Форма редактирования камня'
          onSubmit={memoizedUpdateStone}
          error={error}
          item={stone}
        />
      </Fragment> }
    </div>
  );
};

export default EditStone;