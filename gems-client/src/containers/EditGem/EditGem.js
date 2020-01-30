import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {fetchMetals} from "../../store/actions/metalsActions";
import {fetchCoatings} from "../../store/actions/coatingsActions";
import {fetchStones} from "../../store/actions/stonesActions";
import {updateGem, fetchGem} from "../../store/actions/gemsActions";
import GemForm from "../../components/GemForm/GemForm";

const EditGem = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMetals());
    dispatch(fetchCoatings());
    dispatch(fetchStones());
    dispatch(fetchGem(id));
  }, [dispatch, id]);

  const categories = useSelector(state => state.categories.categories);
  const metals = useSelector(state => state.metals.metals);
  const coatings = useSelector(state => state.coatings.coatings);
  const stones = useSelector(state => state.stones.stones);
  const error = useSelector(state => state.gems.error);
  const gem = useSelector(state => state.gems.currentGem);


  const getFormData = (gem) => {
    const {categories, stones, metals, coatings, createdAt, updatedAt, ...gemFormData} = gem;
    gemFormData['stoneIds'] = stones ? stones.map(item => item.id) : [];
    gemFormData['metalIds'] = metals ? metals.map(item => item.id) : [];
    gemFormData['coatingIds'] = coatings ? coatings.map(item => item.id) : [];
    gemFormData['categoryIds'] = categories ? categories.map(item => item.id) : [];
    return gemFormData;
  };


  const memoizedUpdateGem = useCallback(
    gemData => {
      dispatch(updateGem(gemData)).then((result) => {
        if (result === 'success') {
          history.push('/');
        }
      });
    }, [dispatch, history]
  );

  const gemFormData = gem ? getFormData(gem) : null;

  return (
    <div className='gem-form'>
      <h4 className='gem-form-header'>Форма добавления украшения</h4>
      <GemForm
        className='gem-form'
        onSubmit={memoizedUpdateGem}
        categories={categories}
        metals={metals}
        stones={stones}
        coatings={coatings}
        error={error}
        gem={gemFormData}
      />
    </div>
  );
};

export default EditGem;