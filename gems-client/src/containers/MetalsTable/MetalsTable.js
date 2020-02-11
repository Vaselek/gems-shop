import React from 'react';
import {useSelector} from 'react-redux';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { fetchMetals, deleteMetal } from "../../store/actions/metalsActions";
import BasicTable from "../BasicTable/BasicTable";


const MetalsTable = () => {
  const metals = useSelector(state => state.metals.metals) || [];
  const shouldMetalsBeUpdated = useSelector(state => state.metals.shouldMetalsBeUpdated);

  return (
    <BasicTable items={metals}
                shouldItemsBeUpdated={shouldMetalsBeUpdated}
                fetchItems={fetchMetals}
                deleteItem={deleteMetal}
                pathToEdit={'/edit-metal/'}/>
  );
};

export default MetalsTable;