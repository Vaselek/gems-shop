import React, {useEffect, useCallback} from 'react';
import GemForm from "../../components/GemForm/GemForm";
import {createGem} from "../../store/actions/gemsActions";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {fetchMetals} from "../../store/actions/metalsActions";
import {fetchCoatings} from "../../store/actions/coatingsActions";
import {fetchStones} from "../../store/actions/stonesActions";
import {useHistory} from 'react-router';

import'./NewGem.css';

function NewGem () {

  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMetals());
    dispatch(fetchCoatings());
    dispatch(fetchStones());
  }, [dispatch]);

  const categories = useSelector(state => state.categories.categories);
  // const user = useSelector(state => state.users.user);
  const  metals = useSelector(state => state.metals.metals);
  const  coatings = useSelector(state => state.coatings.coatings);
  const  stones = useSelector(state => state.stones.stones);
  const  error = useSelector(state => state.gems.error);


  const memoizedCreateGem = useCallback(
    gemData => {
    dispatch(createGem(gemData)).then((result) => {
      if (result === 'success') {
        history.push('/category/' + gemData.get('categoryIds[]'));
      }
    });
  }, [dispatch, history]);

  return (
        <div className='gem-form'>
          <h4 className='gem-form-header'>Форма добавления украшения</h4>
          <GemForm
            className='gem-form'
            onSubmit={memoizedCreateGem}
            categories={categories}
            metals={metals}
            stones={stones}
            coatings={coatings}
            error={error}
          />
        </div>
  );
}


export default NewGem;
