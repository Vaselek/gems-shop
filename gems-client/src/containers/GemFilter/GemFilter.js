import React, {useState, useEffect, useCallback} from 'react';
import {fetchStones} from "../../store/actions/stonesActions";
import {fetchMetals} from "../../store/actions/metalsActions";
import {fetchCoatings} from "../../store/actions/coatingsActions";
import {fetchGems} from "../../store/actions/gemsActions";
import './GemFilter.css';
import GemFilterCard from "../../components/GemFilterCard/GemFilterCard";
import { useDispatch, useSelector } from "react-redux";


function GemFilter () {

  const stones = useSelector(state => state.stones.stones);
  const metals = useSelector(state => state.metals.metals);
  const coatings = useSelector(state => state.coatings.coatings);
  const gemParams = useSelector(state => state.gems.gemParams);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStones());
    dispatch(fetchMetals());
    dispatch(fetchCoatings());
  }, [dispatch]);

  const getItemId = event => event.target.id.split('_').slice(1).join();

  const memoizedHandleClick = useCallback(
    (event) => {
      const newGemParams = { ...gemParams }
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
      <GemFilterCard title='Камни' filter='stone' items={stones} handleFilter={memoizedHandleClick}/>
      <GemFilterCard title='Металлы' filter='metal' items={metals} handleFilter={memoizedHandleClick}/>
      <GemFilterCard title='Покрытие' filter='coating' items={coatings} handleFilter={memoizedHandleClick}/>
    </div>
  );
}


export default GemFilter;