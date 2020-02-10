import React, {useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {useSelector, useDispatch} from 'react-redux';
import './BasicTable.css';
import Octicon, {Pencil} from '@primer/octicons-react'
import {useHistory} from "react-router";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { fetchStones, deleteStone } from "../../store/actions/stonesActions";
import { isEmpty, cloneDeep, startCase, toLower } from 'lodash';
import moment from "moment";
import DeleteModal from "../../components/DeleteModal/DeleteModal";


const BasicTable = ({items, shouldItemsBeUpdated, fetchItems, deleteItem, pathToEdit}) => {
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    if (isEmpty(items) || shouldItemsBeUpdated) dispatch(fetchItems());
  }, [dispatch, items, shouldItemsBeUpdated]);

  function editFormatter(cell) {
    return(
      <div className='basic-table-icon-wrapper'>
        <Octicon id={'edit_' + cell} icon={Pencil} className='basic-table-icon' size='small' ariaLabel='Edit'/>
      </div>
    )
  }

  function deleteFormatter(cell, row) {
    return(
      <div className='basic-table-icon-wrapper'>
        <DeleteModal itemId={ row.id } deleteItem={ () => dispatch(deleteItem(row.id)) }/>
      </div>
    )
  }

  const columns = [{
    dataField: 'title',
    text: 'Имя',
    sort: true,
    formatter: (cell) => (startCase(toLower(cell)))
  }, {
    dataField: 'description',
    text: 'Описание'
  }, {
    dataField: 'createdAt',
    text: 'Создан',
    sort: true,
    formatter: (cell) => moment(cell).format('D/M/Y')
  }, {
    dataField: 'updatedAt',
    text: 'Изменен',
    sort: true,
    formatter: (cell) => moment(cell).format('D/M/Y')
  }, {
    dataField: 'id1',
    text: 'Изменить',
    isDummyField: true,
    formatter: editFormatter,
    events: {
      onClick: (e, column, columnIndex, row) => {
        history.push(pathToEdit + row.id);
      }
    }
  }, {
    dataField: 'id2',
    text: 'Удалить',
    isDummyField: true,
    formatter: deleteFormatter
  }];

  const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder}) => {
    let sort;
    if (type === 'sort') {
      sort = { sortField, sortOrder }
    }
    dispatch(fetchItems(sort))
  };


  return (
    <div className='basic-table-wrapper'>
      <div className='table-total-count'>Всего наименований: <span>{items && items.length}</span></div>
      <BootstrapTable headerClasses='basic-table-header'
                      striped
                      hover
                      condensed
                      keyField='id'
                      data={ items }
                      remote={ { sort: true } }
                      onTableChange={ handleTableChange }
                      columns={ columns } />
    </div>
  );
};

export default BasicTable;