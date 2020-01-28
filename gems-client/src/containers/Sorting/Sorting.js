import React, {useCallback} from 'react';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import './Sorting.css';
import {fetchGems} from "../../store/actions/gemsActions";

const Sorting = () => {
  const filter = useSelector(state => state.gems.filter);
  const categoryId = useSelector(state => state.gems.categoryId);
  const dispatch = useDispatch();

  const memoizedHandleClick = useCallback((event) => {
    dispatch(fetchGems(categoryId, filter, event.target.id))
  }, [filter, dispatch, categoryId]);

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