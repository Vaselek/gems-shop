import React, {useEffect, useCallback} from 'react';
import {fetchStones} from "../../store/actions/stonesActions";
import {fetchMetals} from "../../store/actions/metalsActions";
import {fetchCoatings} from "../../store/actions/coatingsActions";
import {fetchGems} from "../../store/actions/gemsActions";
import './GemFilter.css';
import GemFilterCard from "../../components/GemFilterCard/GemFilterCard";
import { useDispatch, useSelector } from "react-redux";
import {cloneDeep} from 'lodash';


function GemFilter () {

  const stones = useSelector(state => state.stones.stones);
  const metals = useSelector(state => state.metals.metals);
  const coatings = useSelector(state => state.coatings.coatings);
  const gemParams = useSelector(state => state.gems.gemParams);
  const shouldStonesBeUpdated = useSelector(state => state.stones.shouldStonesBeUpdated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStones());
    dispatch(fetchMetals());
    dispatch(fetchCoatings());
    if (shouldStonesBeUpdated) dispatch(fetchStones());
  }, [dispatch, shouldStonesBeUpdated]);

  const getItemId = event => event.target.id.split('_').slice(1).join();

  const memoizedHandleClick = useCallback(
    (event, gemParams) => {
      const newGemParams = cloneDeep(gemParams);
      const id = getItemId(event);
      if (event.target.checked === true) {
        newGemParams.filter[event.target.name].push(id)
      } else {
        newGemParams.filter[event.target.name] = newGemParams.filter[event.target.name].filter(e => e !== id);
      }
      dispatch(fetchGems(newGemParams));
    },
    []
  );

  return (
    <div>
      <GemFilterCard title='Камни' filter='stone' items={stones} handleFilter={(e) => memoizedHandleClick(e, gemParams)}/>
      <GemFilterCard title='Металлы' filter='metal' items={metals} handleFilter={(e) => memoizedHandleClick(e, gemParams)}/>
      <GemFilterCard title='Покрытие' filter='coating' items={coatings} handleFilter={(e) => memoizedHandleClick(e, gemParams)}/>
    </div>
  );
}


export default GemFilter;