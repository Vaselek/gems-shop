import React, {useCallback} from 'react';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import './Sorting.css';
import {fetchGems} from "../../store/actions/gemsActions";

const Sorting = () => {
  const gemParams = useSelector(state => state.gems.gemParams);
  const dispatch = useDispatch();

  const memoizedHandleClick = useCallback((event) => {
    const [ field, order ] = event.target.id.split('-');
    const newGemParams = { ...gemParams }
    newGemParams.sort = { field, order };
    dispatch(fetchGems(newGemParams))
  }, [dispatch, gemParams]);

  return (
    <UncontrolledDropdown className='sorting-dropdown'>
      <DropdownToggle className='btn-light'>
        Сортировка...
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem id='price-asc' onClick={memoizedHandleClick}>По увеличению цены</DropdownItem>
        <DropdownItem id='price-desc' onClick={memoizedHandleClick}> По убыванию цены</DropdownItem>
        <DropdownItem id='createdAt-desc' onClick={memoizedHandleClick}>Вначале новинки</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Sorting;