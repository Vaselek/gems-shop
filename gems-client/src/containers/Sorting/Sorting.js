import React, {useCallback} from 'react';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import './Sorting.css';
import {fetchGems} from "../../store/actions/gemsActions";

const Sorting = () => {
  const gemParams = useSelector(state => state.gems.gemParams);
  const dispatch = useDispatch();

  const memoizedHandleClick = useCallback((event) => {
    gemParams.sortBy = event.target.id;
    dispatch(fetchGems(gemParams))
  }, [dispatch, gemParams]);

  return (
    <UncontrolledDropdown className='sorting-dropdown'>
      <DropdownToggle className='btn-light'>
        Сортировка...
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem id='cost-increase' onClick={memoizedHandleClick}>По увеличению цены</DropdownItem>
        <DropdownItem id='cost-decrease' onClick={memoizedHandleClick}> По убыванию цены</DropdownItem>
        <DropdownItem id='new-first' onClick={memoizedHandleClick}>Вначале новинки</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Sorting;