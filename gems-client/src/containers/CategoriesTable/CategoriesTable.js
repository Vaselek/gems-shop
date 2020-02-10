import React from 'react';
import {useSelector} from "react-redux";
import BasicTable from "../BasicTable/BasicTable";
import {deleteCategory, fetchCategories} from "../../store/actions/categoriesActions";

const CategoriesTable = () => {
  const categories = useSelector(state => state.categories.categories) || [];
  const shouldCategoriesBeUpdated = useSelector(state => state.categories.shouldCategoriesBeUpdated);

  return (
    <BasicTable items={categories}
                shouldItemsBeUpdated={shouldCategoriesBeUpdated}
                fetchItems={fetchCategories}
                deleteItem={deleteCategory}
                deleteMessage='Вы действительно хотите удалить данную категорию? Все связанные с нею изделия будут также удалены без возможности восстановления.'
                pathToEdit={'/edit-category/'}/>
  );
};

export default CategoriesTable;