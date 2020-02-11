import React from 'react';
import {useSelector} from 'react-redux';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { fetchCoatings, deleteCoating } from "../../store/actions/coatingsActions";
import BasicTable from "../BasicTable/BasicTable";


const CoatingTable = () => {
  const coatings = useSelector(state => state.coatings.coatings) || [];
  const shouldCoatingsBeUpdated = useSelector(state => state.coatings.shouldCoatingsBeUpdated);

  return (
    <BasicTable items={coatings}
                shouldItemsBeUpdated={shouldCoatingsBeUpdated}
                fetchItems={fetchCoatings}
                deleteItem={deleteCoating}
                pathToEdit={'/edit-coating/'}/>
  );
};

export default CoatingTable;