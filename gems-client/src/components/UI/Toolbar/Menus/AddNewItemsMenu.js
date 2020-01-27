import React, {Fragment} from 'react';
import {DropdownItem} from "reactstrap";
import {Link} from "react-router-dom";

const AddNewItemsMenu = () => (
  <Fragment>
    <DropdownItem tag={Link} to='/gems/new'>Добавить украшение</DropdownItem>
    <DropdownItem divider />
    <DropdownItem tag={Link} to='/stones/new'>Добавить камень</DropdownItem>
    <DropdownItem divider />
    <DropdownItem tag={Link} to='/metals/new'>Добавить металл</DropdownItem>
    <DropdownItem divider />
    <DropdownItem tag={Link} to='/coatings/new'>Добавить покрытие</DropdownItem>
    <DropdownItem divider />
    <DropdownItem tag={Link} to='/categories/new'>Добавить категорию</DropdownItem>
  </Fragment>
);

export default AddNewItemsMenu;