import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import AddNewItemsMenu from "./AddNewItemsMenu";

const UserMenu = ({user, logout}) => (
  <UncontrolledDropdown nav inNavbar>
    <DropdownToggle nav caret>
      Hello, {user.username}
    </DropdownToggle>
    <DropdownMenu right>
      { user.role === 'admin' && (
        <AddNewItemsMenu />
      )}
      <DropdownItem divider />
      <DropdownItem onClick={logout}>
        Logout
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

export default UserMenu;
