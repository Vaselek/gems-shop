import React, {Fragment, useEffect, useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {useSelector, useDispatch} from 'react-redux';
import {fetchGems, deleteGem} from "../../store/actions/gemsActions";
import {apiURL, defaultGemParams, defaultGemsLimit} from "../../constants";
import './GemsTable.css';
import Octicon, {Pencil} from '@primer/octicons-react'
import {useHistory} from "react-router";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
import {fetchStones} from "../../store/actions/stonesActions";
import {fetchMetals} from "../../store/actions/metalsActions";
import {fetchCoatings} from "../../store/actions/coatingsActions";
import {fetchCategories} from "../../store/actions/categoriesActions";
import { isEmpty, cloneDeep, startCase, toLower } from 'lodash';
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import moment from 'moment';
import {endPrice} from "../../Utils";


const GemsTable = () => {

  const gemParams = cloneDeep(defaultGemParams);

  const dispatch = useDispatch();
  const history = useHistory();

  const [ page,setPage ] = useState(1);
  const [ sizePerPage, setSizePerPage ] = useState(defaultGemsLimit);

  const gems = useSelector(state => state.gems.gems);
  const totalCount = useSelector(state => state.gems.totalCount);
  const stones = useSelector(state => state.stones.stones);
  const metals = useSelector(state => state.metals.metals);
  const coatings = useSelector(state => state.coatings.coatings);
  const categories = useSelector(state => state.categories.categories);
  const deletedGemId = useSelector(state => state.gems.deletedGemId);


  useEffect(() => {
    dispatch(fetchGems(gemParams));
    if (isEmpty(stones)) dispatch(fetchStones());
    if (isEmpty(metals)) dispatch(fetchMetals());
    if (isEmpty(coatings)) dispatch(fetchCoatings());
    if (isEmpty(categories)) dispatch(fetchCategories());
  }, [dispatch, stones, metals, coatings, categories, deletedGemId, gemParams.categoryId]);

  function categoryFormatter(cell, row, rowIndex, formatExtraData) {
    const content = cell.length === 0 ? '' : cell.map(item => item.title).join(', ');

    return (
      <span>{content}</span>
    );
  }

  function priceFormatter(cell, row, rowIndex, formatExtraData) {
    let content = cell;
    if (row.discount) content = <Fragment>{ endPrice(row.price, row.discount) } <span style={{textDecoration: 'line-through'}}>{cell}</span></Fragment>;
    return (
      <span>{content}</span>
    );
  }

  function discountFormatter(cell, row, rowIndex, formatExtraData) {
    let content = cell;
    if (row.discount) content = <Fragment>{ endPrice(row.price, row.discount) } <span style={{textDecoration: 'line-through'}}>{cell}</span></Fragment>;
    return (
      <span>{content}</span>
    );
  }

  function dateFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <span className='gems-table-date'>{ moment(cell).format('D/M/Y') }</span>
    )
  }

  function imageFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className='gems-table-img-wrapper'><img className="img-fluid img-thumbnail table-img" src={apiURL + '/' + cell} alt=""/></div>
    )
  }

  function editFormatter(cell,row, rowIndex, formatExtraData) {
    return(
      <div className='basic-table-icon-wrapper'>
        <Octicon id={'edit_' + cell} icon={Pencil} className='basic-table-icon' size='small' ariaLabel='Edit'/>
      </div>
    )
  }

  function deleteFormatter(cell, row, rowIndex, formatExtraData) {
    return(
      <div className='basic-table-icon-wrapper'>
        <DeleteModal itemId={ row.id } deleteItem={ () => dispatch(deleteGem(row.id)) }/>
      </div>
    )
  }

  const itemSelectOptions = (items) => {
    const selectOptions = {};
    items && items.map(item => {
      const key = item['id'];
      const value = item['title']
      return selectOptions[key] = startCase(toLower(value));
    });
    return selectOptions;
  };

  const columns = [{
    dataField: 'code',
    text: '??????',
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '7%' };
    },
  }, {
    dataField: 'title',
    text: '????????????????',
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '7%' };
    },
  }, {
    dataField: 'description',
    text: '????????????',
    headerStyle: (column, colIndex) => {
      return { width: '10%' };
    },
  }, {
    dataField: 'price',
    text: '????????',
    sort: true,
    formatter: priceFormatter,
    headerStyle: (column, colIndex) => {
      return { width: '7%' };
    }
  },{
    dataField: 'discount',
    text: '????????????',
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '7%' };
    }
  }, {
    dataField: 'weight',
    text: '??????',
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '7%' };
    }
  }, {
    dataField: 'image',
    text: '??????.',
    classes: 'gems-table-image-column',
    formatter: imageFormatter,
    headerStyle: (column, colIndex) => {
      return { width: '7%' };
    },
  }, {
    dataField: 'categories',
    formatter: categoryFormatter,
    text: '??????',
    filter: selectFilter({
      options: itemSelectOptions(categories),
      placeholder: '?????????????? ??????????????????'
    }),
    headerStyle: (column, colIndex) => {
      return { width: '10%' };
    },
  }, {
    dataField: 'stones',
    text: '??????????',
    formatter: categoryFormatter,
    filter: multiSelectFilter({
      options: itemSelectOptions(stones),
      placeholder: '????????????',
      withoutEmptyOption: true
    }),
    headerStyle: (column, colIndex) => {
      return { width: '10%' };
    },
  }, {
    dataField: 'metals',
    text: '????????????',
    formatter: categoryFormatter,
    filter: multiSelectFilter({
      options: itemSelectOptions(metals),
      placeholder: '????????????',
      withoutEmptyOption: true
    }),
    headerStyle: (column, colIndex) => {
      return { width: '10%' };
    },
  }, {
    dataField: 'coatings',
    text: '????????????????',
    formatter: categoryFormatter,
    filter: multiSelectFilter({
      options: itemSelectOptions(coatings),
      placeholder: '????????????',
      withoutEmptyOption: true
    }),
    headerStyle: (column, colIndex) => {
      return { width: '10%' };
    },
  }, {
    dataField: 'createdAt',
    text: '????????????',
    sort: true,
    formatter: dateFormatter,
    headerStyle: (column, colIndex) => {
      return { width: '6%' };
    }
  }, {
    dataField: 'updatedAt',
    text: '??????????????',
    sort: true,
    formatter: dateFormatter,
    headerStyle: (column, colIndex) => {
      return { width: '6%' };
    }
  }, {
    dataField: 'id1',
    text: '????????????????',
    isDummyField: true,
    formatter: editFormatter,
    headerStyle: (column, colIndex) => {
      return { width: '6%' };
    },
    events: {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        history.push('/edit-gem/' + row.id);
      }
    }
  }, {
    dataField: 'id2',
    text: '??????????????',
    isDummyField: true,
    formatter: deleteFormatter,
    headerStyle: (column, colIndex) => {
      return { width: '6%' };
    }
  }];

  const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder, filters}) => {
    if (gemParams) {
      const newGemParams = { ...gemParams };
      if (type === 'pagination') {
        setPage(page);
        setSizePerPage(sizePerPage);
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
    sizePerPage: sizePerPage,
    totalSize: totalCount
  };


  return (
    <div className='gems-table-wrapper'>
      <div className='table-total-count'>?????????? ????????????????????????: <span>{totalCount}</span></div>
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