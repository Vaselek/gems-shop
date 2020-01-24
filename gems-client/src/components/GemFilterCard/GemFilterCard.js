import React from 'react';
import {Col, CustomInput, Form, FormGroup} from "reactstrap";

const GemFilterCard = ({title, filter, items, handleFilter}) => {
  return (
    <div className="card card-filter">
      <article className="card-group-item">
        <header className="card-header card-header-modified">
          <h6 className="title">{title}</h6>
        </header>
        <div className="filter-content">
          <div className="card-body">
            <Form>
              <FormGroup row>
                <Col sm={10}>
                  {items.map(item => (
                    <CustomInput key={[filter] + '_' + item.id} onChange={handleFilter} type="checkbox" name={[filter] + 'Ids'} id={[filter] + '_' + item.id} label={item.title} />
                  ))}
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </article>
    </div>
  );
};

export default GemFilterCard;