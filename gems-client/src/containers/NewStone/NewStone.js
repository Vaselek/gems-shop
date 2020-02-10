import React, {useCallback, Fragment} from 'react';
import {createStone, fetchStones} from "../../store/actions/stonesActions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router';

import CategoryForm from "../../components/CategoryForm/CategoryForm";

function NewStone () {

  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector(state => state.stones.error);

  const memoizedCreateStone = useCallback(
    stoneData => {
      dispatch(createStone(stoneData)).then((result) => {
        if (result === 'success') {
          history.push('/stones-table')
          dispatch(fetchStones())
        }
      });
    }, [dispatch, history]);

  return (
    <Fragment>
      <CategoryForm
        title='Форма добавления камня'
        onSubmit={memoizedCreateStone}
        error={error}
      />
    </Fragment>
  );
}


export default NewStone;
