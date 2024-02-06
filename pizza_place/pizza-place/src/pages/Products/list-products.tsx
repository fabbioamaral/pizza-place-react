import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ModalDelete from '../../shared/components/ModalDelete';
import Header from '../../shared/components/header';
import { GET_PRODUCTS } from './graphql/get-products';
import { cache, client } from '../..';
import { useMutation, useQuery } from '@apollo/client';
import { Product } from './types/product';
import { DELETE_PRODUCT } from './graphql/delete-product';
import { DeleteModalState } from '../../shared/types/delete-modal-state';
import React from 'react';
import { UPDATE_PRODUCT } from './graphql/update-product';
import { Size } from '../../shared/types/size';
import { GET_CATEGORIES } from '../Categories/graphql/get-categories';
import { Category } from '../Categories/types/category';

function ListProducts() {
  useQuery(GET_PRODUCTS);
  useQuery(GET_CATEGORIES);

  // reading cache
  const products: Product[] = client.readQuery({
    query: GET_PRODUCTS,
  })?.products;

  // reading cache
  const categories: Category[] = client.readQuery({
    query: GET_CATEGORIES,
  })?.categories;

  const handleOpenModal = (
    id: number,
    isDeleteModal: boolean,
    product?: Product
  ) => {
    if (isDeleteModal) setDeleteModalData({ isOpen: true, id });
    else setUpdateModalData({ isOpen: true, product });
  };
  const handleCloseModal = (isDeleteModal: boolean) => {
    if (isDeleteModal) setDeleteModalData({ isOpen: false, id: undefined });
    else setUpdateModalData({ isOpen: false, product: undefined });
  };

  // delete modal logic
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [deleteModalData, setDeleteModalData] =
    React.useState<DeleteModalState>({
      isOpen: false,
      id: undefined,
    });

  const onDeleteCategory = async () => {
    try {
      if (!deleteModalData.id) return;
      await deleteProduct({ variables: { id: deleteModalData.id } });
      handleRemoveItem(deleteModalData.id as number);
      handleCloseModal(true);
    } catch (error) {
      console.error('Deleting product failed' + error);
    }
  };

  const handleRemoveItem = (id: number) => {
    cache.updateQuery({ query: GET_PRODUCTS }, (data) => ({
      products: data.products.filter((product: Product) => product.id !== id),
    }));
  };

  // update modal logic
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [updateModalData, setUpdateModalData] = React.useState<{
    isOpen: boolean;
    product?: Product | undefined;
  }>({
    isOpen: false,
    product: undefined,
  });

  const onUpdateProduct = async (productUpdated: Product) => {
    try {
      setUpdateModalData({
        isOpen: updateModalData.isOpen,
        product: productUpdated,
      });

      const productBeforeUpdate: Product | undefined = products.find(
        (product) => product.id === productUpdated.id
      );

      const productAfterUpdate = {
        id: productUpdated.id,
        name: productUpdated.name || productBeforeUpdate?.name,
        price: productUpdated.price || productBeforeUpdate?.price,
        categoryId:
          productUpdated.categoryId || productBeforeUpdate?.categoryId,
        size: productUpdated.size || productBeforeUpdate?.size,
      };

      await updateProduct({
        variables: productAfterUpdate,
      });
      handleUpdateItem(productAfterUpdate);
      handleCloseModal(false);
    } catch (error) {
      console.error('Updating product failed' + error);
    }
  };

  const handleUpdateItem = (productAfterUpdate: any) => {
    const productIndex = products.findIndex(
      (product) => product.id === productAfterUpdate.id
    );

    // deep copy
    const productsCopy = JSON.parse(JSON.stringify(products));
    productsCopy[productIndex] = productAfterUpdate;
    cache.updateQuery({ query: GET_PRODUCTS }, () => ({
      products: productsCopy,
    }));
  };

  return (
    <>
      <Header></Header>
      <div className="p-8">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="category table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Size</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product: Product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.price}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {
                      categories.find(
                        (category) => category.id === product.categoryId
                      )?.name
                    }
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.size}
                  </TableCell>
                  <TableCell align="left">
                    <DeleteIcon
                      className="mr-4 cursor-pointer"
                      onClick={() => handleOpenModal(product.id, true)}
                    ></DeleteIcon>
                    <EditIcon
                      className="cursor-pointer"
                      onClick={() =>
                        handleOpenModal(product.id, false, product)
                      }
                    ></EditIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ModalDelete
          title="Delete Product"
          description="Are you sure you want to delete this prodct?"
          isOpen={deleteModalData.isOpen}
          onClose={() => handleCloseModal(true)}
          onAction={onDeleteCategory}
          onDismiss={() => handleCloseModal(true)}
        ></ModalDelete>
        {/* <ModalUpdateCategory
          isOpen={updateModalData.isOpen}
          onClose={() => handleCloseModal(false)}
          onAction={onUpdateCategory}
          onDismiss={() => handleCloseModal(false)}
          data={updateModalData.name}
        ></ModalUpdateCategory> */}
      </div>
    </>
  );
}

export default ListProducts;
