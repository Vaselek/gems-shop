import React, {useState, useEffect, useCallback} from 'react';
import {fetchStones} from "../../store/actions/stonesActions";
import {fetchMetals} from "../../store/actions/metalsActions";
import {fetchCoatings} from "../../store/actions/coatingsActions";
import {fetchGems} from "../../store/actions/gemsActions";
import './GemFilter.css';
import GemFilterCard from "../../components/GemFilterCard/GemFilterCard";
import { useDispatch, useSelector } from "react-redux";


function GemFilter () {

  const [stoneIds, setStoneIds] = useState([]);
  const [metalIds, setMetalIds] = useState([]);
  const [coatingIds, setCoatingIds] = useState([]);

  const stones = useSelector(state => state.stones.stones);
  const categoryId = useSelector(state => state.gems.categoryId);
  const metals = useSelector(state => state.metals.metals);
  const coatings = useSelector(state => state.coatings.coatings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStones());
    dispatch(fetchMetals());
    dispatch(fetchCoatings());
  }, [dispatch]);

  const createGemsFilter = (stoneIds, metalIds, coatingIds) => {
    const filter = {};
    filter.stoneIds = [...stoneIds];
    filter.metalIds = [...metalIds];
    filter.coatingIds = [...coatingIds];
    return filter
  };

  const mapEventNameToItemIdsAndStateSetter = {
      'stoneIds': [[...stoneIds], setStoneIds],
      'metalIds': [[...metalIds], setMetalIds],
      'coatingIds': [[...coatingIds], setCoatingIds]
  };

  const getItemId = event => event.target.id.split('_').slice(1).join();

  const memoizedHandleClick = useCallback(
    (event) => {
      const id = getItemId(event);
      const filter = createGemsFilter(stoneIds, metalIds, coatingIds);
      let [ids, setter] = mapEventNameToItemIdsAndStateSetter[event.target.name];
      if (event.target.checked === true) {
        ids.push(id);
      } else {
        ids = ids.filter(e => e !== id);
      }
      setter(ids);
      filter[event.target.name] = ids;
      dispatch(fetchGems(categoryId, filter));
    },
    [categoryId, stoneIds, metalIds, coatingIds, dispatch, mapEventNameToItemIdsAndStateSetter], // Tells React to memoize regardless of arguments.
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