import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardImg, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";
import './GemListItem.css'
import { isEmpty } from 'lodash';
import {apiURL} from "../../constants";
import {endPrice} from "../../Utils";

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
  description && (<div className='description-block'>Описание: <span className='description'>{description}</span></div>)
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
          { renderTableRowWithItem('Код изделия', jewellery.code)}
          </tbody>
        </table>
        {(jewellery.code || jewellery.description) &&
        (<div>
          {renderJewelleryDescription(jewellery.description)}
        </div>)
        }
      </div>
    </div>
  )
};

const renderPrice = (price, discount) => {
  if (!price) return (
    <div className='jewellery-item-price'>...<span>KGS</span></div>
  );
  if (!discount) return (
    <div className='jewellery-item-price'>{ price }<span>KGS</span></div>
  );
  return (
    <div className='jewellery-item-price'>
      <div className='jewellery-item-new-price'>{ endPrice(price, discount) }<span>KGS</span></div>
      <div className='jewellery-item-old-price'>{ price }<span>KGS</span></div>
    </div>
  );

};

const GemListItem = props => {
  return (
    <Card className='jewellery-item'>
      {
        props.price && props.discount &&
        <div className='jewellery-item-discount'>
          { '-' + props.discount + '%'}
        </div>
      }
      <div className='image-container'>
        <CardImg top width="100%" className="img img-fluid img-responsive full-width" src={apiURL + '/' + props.image} alt="Card image cap" />
      </div>
      <CardBody>
        <div className='jewellery-item-main-details'>
          <CardTitle className='jewellery-item-title'>
            <Link to={'/gems/' + props.id}>
              {props.title}
            </Link>
          </CardTitle>
          {renderPrice(props.price, props.discount)}
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
