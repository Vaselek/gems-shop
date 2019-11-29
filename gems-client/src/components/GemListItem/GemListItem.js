import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";

import GemThumbnail from "../GemThumbnail/GemThumbnail";

const GemListItem = props => {
  return (
    <Card style={{marginBottom: '10px'}}>
      <CardBody>
        <GemThumbnail image={props.image}/>
        <Link to={'/gems/' + props._id}>
          {props.title}
        </Link>
        <strong style={{marginLeft: '10px'}}>
          {props.price} KGS
        </strong>
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
