import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardImg, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";
import './GemListItem.css'
import { isEmpty } from 'lodash';
import {apiURL} from "../../constants";

const listItems = (items) => items.map(item => item.title).join(', ');

const renderTableRowWithItems = (title, items) => {
  items = items.filter(item => !!item);
  return !isEmpty(items) &&
  (<tr>
    <td className='title'>{title}</td>
    <td>{listItems(items)}</td>
  </tr>)
};

const renderTableRowWithItem = (title, item) => (
  !isEmpty(item) &&
  (<tr>
    <td className='title'>{title}</td>
    <td>{ item }</td>
  </tr>)
);

const renderJewelleryDescription = (description) => (
  description && (<span className='description'>{description}</span>)
);

const renderJewelleryCode = (code) => (
  code && (<span className='code'>{code}</span>)
);

const renderDetails = (jewellery) => {
  return (
    <div className='jewellery-item-details'>
      <div className='jewellery-item-detail details'>
        <table>
          <tbody>
          { renderTableRowWithItems('Камни', jewellery.stones)}
          { renderTableRowWithItems('Металл', jewellery.metals)}
          { renderTableRowWithItems('Покрытие', jewellery.coatings)}
          { renderTableRowWithItem('Вес', jewellery.weight)}
          </tbody>
        </table>
        {(jewellery.code || jewellery.description) &&
        (<div>
          {renderJewelleryCode(jewellery.code)}
          {renderJewelleryDescription(jewellery.description)}
        </div>)
        }
      </div>
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
            <Link to={'/gems/' + props.id}>
              {props.title}
            </Link>
          </CardTitle>
          <div className='jewellery-item-price'>{props.price ?  props.price  : '...'}<span>KGS</span></div>
        </div>
        {renderDetails(props)}
      </CardBody>
    </Card>
  );
};

GemListItem.propTypes = {
  image: PropTypes.string,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default GemListItem;
