import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GET_CATEGORIES } from './graphql/get-categories';
import { useQuery } from '@apollo/client';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useMutation } from '@apollo/react-hooks';
import { DELETE_CATEGORY } from './graphql/delete-category';
import { CategoryModalState } from './types/category-modal-state';
import { Category } from './types/category';
import { cache, client } from '../..';
import ModalDeleteCategory from './components/ModalDeleteCategory';
import ModalUpdateCategory from './components/ModalUpdateCategory';
import { UPDATE_CATEGORY } from './graphql/update-category';
import Header from '../../shared/components/header';

function ListCategories() {
  const { data, loading, error } = useQuery(GET_CATEGORIES);

  // reading cache
  const categories: Category[] = client.readQuery({
    query: GET_CATEGORIES,
  })?.categories;

  const handleOpenModal = (
    categoryId: number,
    isDeleteModal: boolean,
    categoryName?: string
  ) => {
    if (isDeleteModal) setDeleteModalData({ isOpen: true, categoryId });
    else setUpdateModalData({ isOpen: true, categoryId, name: categoryName });
  };
  const handleCloseModal = (isDeleteModal: boolean) => {
    if (isDeleteModal)
      setDeleteModalData({ isOpen: false, categoryId: undefined });
    else setUpdateModalData({ isOpen: false, categoryId: undefined, name: '' });
  };

  // delete modal logic
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const [deleteModalData, setDeleteModalData] =
    React.useState<CategoryModalState>({
      isOpen: false,
      categoryId: undefined,
    });

  const onDeleteCategory = async () => {
    try {
      if (!deleteModalData.categoryId) return;
      await deleteCategory({ variables: { id: deleteModalData.categoryId } });
      handleRemoveItem(deleteModalData.categoryId as number);
      handleCloseModal(true);
    } catch (error) {
      console.error('Deleting category failed' + error);
    }
  };

  const handleRemoveItem = (categoryId: number) => {
    cache.updateQuery({ query: GET_CATEGORIES }, (data) => ({
      categories: data.categories.filter(
        (category: Category) => category.id !== categoryId
      ),
    }));
  };

  // update modal logic
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [updateModalData, setUpdateModalData] =
    React.useState<CategoryModalState>({
      isOpen: false,
      categoryId: undefined,
      name: '',
    });

  const onUpdateCategory = async (categoryName: string) => {
    try {
      setUpdateModalData({
        isOpen: updateModalData.isOpen,
        categoryId: updateModalData.categoryId,
        name: categoryName,
      });

      if (!updateModalData.categoryId || !categoryName?.length) return;
      await updateCategory({
        variables: {
          id: updateModalData.categoryId,
          name: categoryName,
        },
      });
      handleUpdateItem(categoryName);
      handleCloseModal(false);
    } catch (error) {
      console.error('Updating category failed' + error);
    }
  };

  const handleUpdateItem = (categoryName: string) => {
    const categoryIndex = categories.findIndex(
      (category) => category.id === updateModalData.categoryId
    );

    // deep copy
    const categoriesCopy = JSON.parse(JSON.stringify(categories));
    categoriesCopy[categoryIndex].name = categoryName;
    cache.updateQuery({ query: GET_CATEGORIES }, () => ({
      categories: categoriesCopy,
    }));
  };

  // if (loading) return 'Loading...';
  // if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <Header></Header>
      <div className="p-8">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="category table">
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((category: Category) => (
                <TableRow
                  key={category.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell align="left">
                    <DeleteIcon
                      className="mr-4 cursor-pointer"
                      onClick={() => handleOpenModal(category.id, true)}
                    ></DeleteIcon>
                    <EditIcon
                      className="cursor-pointer"
                      onClick={() =>
                        handleOpenModal(category.id, false, category.name)
                      }
                    ></EditIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ModalDeleteCategory
          isOpen={deleteModalData.isOpen}
          onClose={() => handleCloseModal(true)}
          onAction={onDeleteCategory}
          onDismiss={() => handleCloseModal(true)}
        ></ModalDeleteCategory>
        <ModalUpdateCategory
          isOpen={updateModalData.isOpen}
          onClose={() => handleCloseModal(false)}
          onAction={onUpdateCategory}
          onDismiss={() => handleCloseModal(false)}
          data={updateModalData.name}
        ></ModalUpdateCategory>
      </div>
    </>
  );
}

export default ListCategories;
