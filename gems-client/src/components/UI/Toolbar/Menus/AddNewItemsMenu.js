import React, {Fragment} from 'react';
import {DropdownItem} from "reactstrap";
import {Link} from "react-router-dom";

const AddNewItemsMenu = () => (
  <Fragment>
    <DropdownItem tag={Link} to='/gems-table'>Таблица продуктов</DropdownItem>
    <DropdownItem tag={Link} to='/stones-table'>Таблица камней</DropdownItem>
    <DropdownItem tag={Link} to='/metals-table'>Таблица металлов</DropdownItem>
    <DropdownItem tag={Link} to='/coatings-table'>Таблица покрытий</DropdownItem>
    <DropdownItem tag={Link} to='/categories-table'>Таблица категорий</DropdownItem>
    <DropdownItem divider />
    <DropdownItem tag={Link} to='/gems/new'>Добавить украшение</DropdownItem>
    <DropdownItem tag={Link} to='/stones/new'>Добавить камень</DropdownItem>
    <DropdownItem tag={Link} to='/metals/new'>Добавить металл</DropdownItem>
    <DropdownItem tag={Link} to='/coatings/new'>Добавить покрытие</DropdownItem>
    <DropdownItem tag={Link} to='/categories/new'>Добавить категорию</DropdownItem>
  </Fragment>
);

export default AddNewItemsMenu;
