import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardImg, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";
import './GemListItem.css'
import { isEmpty } from 'lodash';

import GemThumbnail from "../GemThumbnail/GemThumbnail";
import {apiURL} from "../../constants";

const listItems = (items) => items.map(item => item.title).join(', ');

const renderTableRowWithItems = (title, items) => (
  !isEmpty(items) &&
  (<tr>
    <td className='title'>{title}</td>
    <td>{ listItems(items) }</td>
  </tr>)
)

const renderTableRowWithItem = (title, item) => (
  !isEmpty(item) &&
  (<tr>
    <td className='title'>{title}</td>
    <td>{ item }</td>
  </tr>)
)

const renderJewelleryDescription = (description) => (
  description && (<div className='jewellery-item-detail description'>
    <p className='header'>Описание</p>
    <span>{description}</span>
  </div>)
)

const renderDetails = (jewellery) => {
  return (
    <div className='jewellery-item-details'>
      <div className='jewellery-item-detail details'>
        <span className='header'>Детали</span>
        <table>
          <tbody>
          { renderTableRowWithItems('Камни', jewellery.stones)}
          { renderTableRowWithItems('Металл', jewellery.metals)}
          { renderTableRowWithItems('Покрытие', jewellery.coats)}
          { renderTableRowWithItem('Вес', jewellery.weight)}
          </tbody>
        </table>
      </div>
      { renderJewelleryDescription(jewellery.description) }
    </div>
  )
}

const GemListItem = props => {
  return (
    <Card className='jewellery-item'>
      <CardImg top width="100%" src={apiURL + '/' + props.image} alt="Card image cap" />
      <CardBody>
        <div className='jewellery-item-main-details'>
          <CardTitle className='jewellery-item-title'>
            <Link to={'/gems/' + props._id}>
              {props.title}
            </Link>
          </CardTitle>
          <div className='jewellery-item-price'>{props.price ?  props.price  : '...'}<span>KGS</span></div>
        </div>
        {/*{renderDetails(props)}*/}
      </CardBody>
    </Card>
  );
};

GemListItem.propTypes = {
  image: PropTypes.string,
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default GemListItem;
