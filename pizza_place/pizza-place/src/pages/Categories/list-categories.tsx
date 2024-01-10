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

function ListCategories() {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  console.log('data');
  console.log(data);

  // reading cache
  const categories: Category[] = client.readQuery({
    query: GET_CATEGORIES,
  })?.categories;
  console.log('categories cache');
  console.log(categories);

  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  // modal logic
  const [deleteModalData, setDeleteModalData] =
    React.useState<CategoryModalState>({
      isOpen: false,
      categoryId: undefined,
    });
  const handleOpenDeleteModal = (categoryId: number) =>
    setDeleteModalData({ isOpen: true, categoryId });
  const handleCloseDeleteModal = () =>
    setDeleteModalData({ isOpen: false, categoryId: undefined });

  const onDeleteCategory = async () => {
    try {
      console.log('deleteModalData.categoryId');
      console.log(deleteModalData.categoryId);
      if (!deleteModalData.categoryId) return;
      await deleteCategory({ variables: { id: deleteModalData.categoryId } });
      handleRemoveItem(deleteModalData.categoryId as number);
      console.log('category deleted!');
      handleCloseDeleteModal();
    } catch (error) {}
  };

  const handleRemoveItem = (categoryId: number) => {
    cache.updateQuery({ query: GET_CATEGORIES }, (data) => ({
      categories: data.categories.filter(
        (category: Category) => category.id !== categoryId
      ),
    }));
  };

  // if (loading) return 'Loading...';
  // if (error) return <pre>{error.message}</pre>;

  return (
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
            {categories?.map((category: any) => (
              <TableRow
                key={category.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="left">
                  <DeleteIcon
                    className="mr-4 cursor-pointer"
                    onClick={() => handleOpenDeleteModal(category.id)}
                  ></DeleteIcon>
                  <EditIcon className="cursor-pointer"></EditIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalDeleteCategory
        isOpen={deleteModalData.isOpen}
        onClose={handleCloseDeleteModal}
        onDeleteClick={onDeleteCategory}
        onDismissClick={handleCloseDeleteModal}
      ></ModalDeleteCategory>
    </div>
  );
}

export default ListCategories;
