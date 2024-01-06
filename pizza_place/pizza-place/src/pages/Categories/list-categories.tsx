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

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_CATEGORY } from './graphql/delete-category';
import { CategoryModalState } from './types/category-modal-state';
import { Category } from './types/category';
import { cache, client } from '../..';

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

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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

      <Modal
        open={deleteModalData.isOpen}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this category?
          </Typography>
          <div className="mt-4">
            <Button
              sx={{ mr: 2 }}
              color="error"
              variant="outlined"
              onClick={onDeleteCategory}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>
              Dismiss
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ListCategories;
