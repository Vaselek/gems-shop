import React, { useState } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse
} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';
import UserMenu from "./Menus/UserMenu";
import AnonymousMenu from "./Menus/AnonymousMenu";
import './Toolbar.css'
import {startCase, toLower} from "lodash";
import Search from "../../../containers/Search/Search";


const Toolbar = ({user, logout, categories}) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    return setIsOpen(!isOpen);
  };

  return (
    <div>
    <div className="nav-upper-line">
      <div className="nav-upper-line-tel">Тел.: +996 (555) 555-555</div>
      <div className="nav-upper-line-text">Эксклюзивные украшения с натуральными камнями естесственного происхождения ручной работы</div>
      <div className="nav-upper-line-address">
        <Search />
        {user ? <UserMenu user={user} logout={logout} /> : <AnonymousMenu/> }
      </div>
    </div>
    <div className="nav-shop-title">AlsaRuiz</div>
    <Navbar dark expand="md">
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar className="ml-auto mr-auto">
            <NavItem className='nav-item-discount' key={'navItem_discount'}>
              <NavLink tag={RouterNavLink} to={"/category/discount"} exact>Акции</NavLink>
            </NavItem>
            { categories && categories.map((category) =>
                <NavItem key={'navItem_' + category.id}>
                  <NavLink tag={RouterNavLink} to={"/category/" + category.id} exact>{ startCase(toLower(category.title)) }</NavLink>
                </NavItem>
              )
            }
            <NavItem key={'navItem_new_items'}>
              <NavLink tag={RouterNavLink} to={"/"} exact>Новинки</NavLink>
            </NavItem>
            {/*<NavItem>*/}
              {/*<NavLink tag={RouterNavLink} to="/sets" exact>Наборы</NavLink>*/}
            {/*</NavItem>*/}
            {/*<NavItem className="nav-discount">*/}
              {/*<NavLink tag={RouterNavLink} to="/discounts">Акции</NavLink>*/}
            {/*</NavItem>*/}
            {/*{user ? <UserMenu user={user} logout={logout} /> : <AnonymousMenu/> }*/}
          </Nav>
      </Collapse>
    </Navbar>
    </div>
  );
};

export default Toolbar;
