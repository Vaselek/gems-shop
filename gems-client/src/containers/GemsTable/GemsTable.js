import React, {useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {useSelector, useDispatch} from 'react-redux';
import {fetchGems} from "../../store/actions/gemsActions";
import {apiURL} from "../../constants";
import './GemsTable.css';
import Octicon, {Pencil, Trashcan} from '@primer/octicons-react'
import {useHistory} from "react-router";
import paginationFactory from 'react-bootstrap-table2-paginator';


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
      <span>{content}</span>
    );
  }

  function imageFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className='gems-table-img-wrapper'><img className="img-fluid img-thumbnail table-img" src={apiURL + '/' + cell} alt=""/></div>
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
    text: 'ID',
    classes: 'gems-table-id-column',
    headerStyle: (column, colIndex) => {
      return { width: '5%' };
    }
  }, {
    dataField: 'title',
    text: 'Название'
  }, {
    dataField: 'description',
    text: 'Описание'
  }, {
    dataField: 'price',
    text: 'Цена',
    headerStyle: (column, colIndex) => {
      return { width: '5%' };
    }
  }, {
    dataField: 'weight',
    text: 'Вес',
    headerStyle: (column, colIndex) => {
      return { width: '5%' };
    }
  }, {
    dataField: 'image',
    text: 'Рис.',
    classes: 'gems-table-image-column',
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
    headerStyle: (column, colIndex) => {
      return { width: '5%' };
    },
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
    headerStyle: (column, colIndex) => {
      return { width: '5%' };
    },
    events: {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        console.log(column);
        console.log(columnIndex);
        console.log(row);
        console.log(rowIndex);
      }
    }
  }];

  const options = {
    onSizePerPageChange: (sizePerPage, page) => {
      console.log('Size per page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    },
    onPageChange: (page, sizePerPage) => {
      console.log('Page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    }
  };

  return (
    <div>
      <BootstrapTable classes='gems-table'
                      headerClasses='gems-table-header'
                      rowClasses='gems-table-row'
                      striped
                      hover
                      condensed
                      keyField='id'
                      data={ gems }
                      pagination={ paginationFactory(options) }
                      columns={ columns } />
    </div>
  );
};

export default GemsTable;