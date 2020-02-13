import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import './GemPagination.css';
import {fetchGems} from "../../store/actions/gemsActions";
import {useSelector, useDispatch} from 'react-redux';
import {cloneDeep} from 'lodash';
import {defaultGemsLimit} from "../../constants";


const GemsPagination = () => {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage]  = useState(0);

  const totalCount = useSelector(state => state.gems.totalCount);
  const gemParams = useSelector(state => state.gems.gemParams);

  const pageCount = Math.ceil(totalCount/defaultGemsLimit);

  useEffect(() => {
    const offset = gemParams.pagination.offset;
    if (!offset) {
      setCurrentPage(0)
    }
  }, [gemParams.pagination.offset]);

  const getActiveLinkClassName = () => {
    let activeLinkClassName = '';
    if (currentPage === pageCount - 1)
      activeLinkClassName += ' last-page-is-active';
    if (currentPage === 0) {
      activeLinkClassName += ' first-page-is-active';
    }
    return activeLinkClassName;
  };

  const handlePageClick = data => {
    setCurrentPage(data.selected);
    if (gemParams) {
      const newGemParams = cloneDeep(gemParams);
      newGemParams.pagination.limit = defaultGemsLimit;
      newGemParams.pagination.offset = Math.ceil(data.selected * defaultGemsLimit);
      dispatch(fetchGems(newGemParams))
    }
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        subContainerClassName={'pages pagination'}
        containerClassName={totalCount ? 'pagination' : 'hide-pagination'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
        activeLinkClassName={getActiveLinkClassName()}
        forcePage={currentPage}
      />
    </div>
  );
};

export default GemsPagination;