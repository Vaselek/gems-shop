import React from 'react';
import {useSelector} from 'react-redux';
import './StonesTable.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { fetchStones, deleteStone } from "../../store/actions/stonesActions";
import BasicTable from "../BasicTable/BasicTable";


const StonesTable = () => {
  const stones = useSelector(state => state.stones.stones) || [];
  const shouldStonesBeUpdated = useSelector(state => state.stones.shouldStonesBeUpdated);

  return (
    <BasicTable items={stones}
                shouldItemsBeUpdated={shouldStonesBeUpdated}
                fetchItems={fetchStones}
                deleteItem={deleteStone}
                pathToEdit={'/edit-stone/'}/>
  );
};

export default StonesTable;