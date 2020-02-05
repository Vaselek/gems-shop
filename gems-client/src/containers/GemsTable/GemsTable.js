import React, {useEffect, useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {useSelector, useDispatch} from 'react-redux';
import {fetchGems} from "../../store/actions/gemsActions";
import {apiURL, defaultGemParams} from "../../constants";
import './GemsTable.css';
import Octicon, {Pencil, Trashcan} from '@primer/octicons-react'
import {useHistory} from "react-router";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
import {fetchStones} from "../../store/actions/stonesActions";
import {fetchMetals} from "../../store/actions/metalsActions";
import {fetchCoatings} from "../../store/actions/coatingsActions";
import {fetchCategories} from "../../store/actions/categoriesActions";
import { isEmpty, cloneDeep, startCase, toLower } from 'lodash';


const GemsTable = () => {
  const gems = useSelector(state => state.gems.gems);
  const totalCount = useSelector(state => state.gems.totalCount);
  const gemParams = cloneDeep(defaultGemParams);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ page,setPage ] = useState(1);
  const stones = useSelector(state => state.stones.stones);
  const metals = useSelector(state => state.metals.metals);
  const coatings = useSelector(state => state.coatings.coatings);
  const categories = useSelector(state => state.categories.categories);


  useEffect(() => {
    dispatch(fetchGems(gemParams));
    if (isEmpty(stones)) dispatch(fetchStones());
    if (isEmpty(metals)) dispatch(fetchMetals());
    if (isEmpty(coatings)) dispatch(fetchCoatings());
    if (isEmpty(categories)) dispatch(fetchCategories());
  }, [dispatch, stones, metals, coatings, categories]);

  function categoryFormatter(cell, row, rowIndex, formatExtraData) {
    const content = cell.length === 0 ? '' : cell.map(item => item.title).join(', ');

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

  const itemSelectOptions = (items) => {
    const selectOptions = {};
    items && items.map(item => {
      const key = item['id'];
      const value = item['title']
      selectOptions[key] = startCase(toLower(value));
    });
    return selectOptions;
  }

  const columns = [{
    dataField: 'id',
    text: 'ID',
    classes: 'gems-table-id-column',
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '6%' };
    }
  }, {
    dataField: 'title',
    text: 'Имя',
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '7%' };
    },
  }, {
    dataField: 'description',
    text: 'Детали',
    headerStyle: (column, colIndex) => {
      return { width: '8%' };
    },
  }, {
    dataField: 'price',
    text: 'Цена',
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '8%' };
    }
  }, {
    dataField: 'weight',
    text: 'Вес',
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '7%' };
    }
  }, {
    dataField: 'image',
    text: 'Рис.',
    classes: 'gems-table-image-column',
    formatter: imageFormatter,
    headerStyle: (column, colIndex) => {
      return { width: '6%' };
    },
  }, {
    dataField: 'categories',
    formatter: categoryFormatter,
    text: 'Вид',
    filter: selectFilter({
      options: itemSelectOptions(categories),
      placeholder: 'Выбрать категорию',
      defaultValue: 2,
    }),
    headerStyle: (column, colIndex) => {
      return { width: '7%' };
    },
  }, {
    dataField: 'stones',
    text: 'Камни',
    formatter: categoryFormatter,
    filter: multiSelectFilter({
      options: itemSelectOptions(stones),
      placeholder: 'Фильтр',
    }),
    headerStyle: (column, colIndex) => {
      return { width: '6%' };
    },
  }, {
    dataField: 'metals',
    text: 'Металл',
    formatter: categoryFormatter,
    filter: multiSelectFilter({
      options: itemSelectOptions(metals),
      placeholder: 'Фильтр'
    }),
    headerStyle: (column, colIndex) => {
      return { width: '8%' };
    },
  }, {
    dataField: 'coatings',
    text: 'Покрытие',
    formatter: categoryFormatter,
    filter: multiSelectFilter({
      options: itemSelectOptions(coatings),
      placeholder: 'Фильтр'
    }),
    headerStyle: (column, colIndex) => {
      return { width: '10%' };
    },
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
  const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder, filters}) => {
    if (gemParams) {
      const newGemParams = { ...gemParams };
      if (type === 'pagination') {
        setPage(page);
        newGemParams.pagination.limit = sizePerPage;
        newGemParams.pagination.offset = (page - 1) * sizePerPage;
      }
      if (type === 'sort') {
        newGemParams.sort = {field: sortField, order: sortOrder}
      }
      if (type === 'filter') {
        if (filters.stones) {
          newGemParams.filter['stoneIds'] = [];
          filters.stones.filterVal.map(val => newGemParams.filter.stoneIds.push(val))
        }
        if (filters.metals) {
          newGemParams.filter['metalIds'] = [];
          filters.metals.filterVal.map(val => newGemParams.filter.metalIds.push(val))
        }
        if (filters.coatings) {
          newGemParams.filter['coatingIds'] = [];
          filters.coatings.filterVal.map(val => newGemParams.filter.coatingIds.push(val))
        }
        if (filters.categories) {
          newGemParams['categoryId'] = filters.categories.filterVal;
        }
      }
      dispatch(fetchGems(newGemParams))
    }
  };

  const paginationOptions = {
    page: page,
    sizePerPage: gemParams.pagination ? gemParams.pagination.limit || 10 : 10,
    totalSize: totalCount
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
                      pagination={ paginationFactory(paginationOptions) }
                      filter={ filterFactory() }
                      remote={ { pagination: true, sort: true, filter: true } }
                      onTableChange={ handleTableChange }
                      columns={ columns } />
    </div>
  );
};

export default GemsTable;