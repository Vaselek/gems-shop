import React, {useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {useSelector, useDispatch} from 'react-redux';
import {fetchGems} from "../../store/actions/gemsActions";
import {apiURL} from "../../constants";
import './GemsTable.css';
import Octicon, {Pencil, Trashcan} from '@primer/octicons-react'
import {useHistory} from "react-router";


const GemsTable = () => {
  const gems = useSelector(state => state.gems.gems);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchGems())
  });

  function categoryFormatter(cell, row, rowIndex, formatExtraData) {
    const content = cell.length === 0 ? '' : cell.map(item => item.title).join(', ')
    return (
      <i>{content}</i>
    );
  }

  function imageFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <img className="img-fluid table-img" src={apiURL + '/' + cell} alt=""/>
    )
  }

  function editFormatter(cell,row, rowIndex, formatExtraData) {
    return(
      <div className='table-icon-container'>
        <Octicon id={'edit_' + cell} icon={Pencil} className='table-icon' size='small' ariaLabel='Edit'/>
      </div>
    )
  }

  function deleteFormatter(cell,row, rowIndex, formatExtraData) {
    return(
      <div className='table-icon-container'>
        <Octicon id={'delete_' + cell} icon={Trashcan} className='table-icon' size='small' ariaLabel='Edit'/>
      </div>
    )
  }

  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'title',
    text: 'Название'
  }, {
    dataField: 'description',
    text: 'Описание'
  }, {
    dataField: 'price',
    text: 'Цена'
  }, {
    dataField: 'weight',
    text: 'Вес'
  }, {
    dataField: 'image',
    text: 'Рис.',
    formatter: imageFormatter
  }, {
    dataField: 'categories',
    formatter: categoryFormatter,
    text: 'Категория'
  }, {
    dataField: 'stones',
    text: 'Камни',
    formatter: categoryFormatter
  }, {
    dataField: 'metals',
    text: 'Металл',
    formatter: categoryFormatter
  }, {
    dataField: 'coatings',
    text: 'Покрытие',
    formatter: categoryFormatter
  }, {
    dataField: 'id1',
    text: 'Изменить',
    isDummyField: true,
    formatter: editFormatter,
    events: {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        history.push('/edit-gem/' + row.id);
      }
    }
  }, {
    dataField: 'id2',
    text: 'Удалить',
    isDummyField: true,
    formatter: deleteFormatter,
    events: {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        console.log(column);
        console.log(columnIndex);
        console.log(row);
        console.log(rowIndex);
      }
    }
  }];

  return (
    <div>
      <BootstrapTable keyField='id' data={ gems } columns={ columns } />
    </div>
  );
};

export default GemsTable;