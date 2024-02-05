import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SnackContent } from '../../shared/types/snack';
import { cache } from '../..';

import Header from '../../shared/components/header';
import { CREATE_PRODUCT } from './graphql/create-product';
import { GET_PRODUCTS } from './graphql/get-products';
import { SNACK_INITIAL_CONTENT } from '../../shared/constants/snack-initial-content';
import { Product } from './types/product';
import { GET_CATEGORIES } from '../Categories/graphql/get-categories';
import { Category } from '../Categories/types/category';
import { SIZES } from '../../shared/constants/sizes';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateProduct() {
  const [productName, setProductName] = React.useState('');
  const [productPrice, setProductPrice] = React.useState('');
  const [productSize, setProductSize] = React.useState('');
  const [productCategory, setProductCategory] = React.useState('');
  const [snackContent, setSnackContent] = useState(SNACK_INITIAL_CONTENT);

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const navigate = useNavigate();

  const categoriesData = useQuery(GET_CATEGORIES);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const category: Category = categoriesData?.data?.categories?.find(
      (category: Category) => category.name === productCategory
    );

    try {
      const result = await createProduct({
        variables: {
          name: productName,
          price: Number(productPrice),
          categoryId: category.id,
          size: productSize,
        },
      });
      handleAddItem(result.data.id);

      setSnackContent({
        shouldDisplay: true,
        message: 'Product has been added successfully!',
        typeOfSnack: 'success',
      });
      setTimeout(() => navigate('/list-products'), 1000);
    } catch (error) {
      setSnackContent({
        shouldDisplay: true,
        message: 'Error trying to add Product',
        typeOfSnack: 'error',
      });
      console.error(error);
    }
  };

  const handleAddItem = (product: Product) => {
    cache.updateQuery({ query: GET_PRODUCTS }, (data) => {
      console.log(data);
      // in case the cache is empty
      if (!data) {
        return {
          products: [{ product }],
        };
      } else {
        const productsCopy = JSON.parse(JSON.stringify(data.products));
        return {
          products: productsCopy.push(product),
        };
      }
    });
  };

  const handleCloseSnack = () => {
    setSnackContent({
      shouldDisplay: false,
      message: '',
      typeOfSnack: undefined,
    });
  };

  return (
    <>
      <Header></Header>
      <div className="p-10">
        <h1 className="font-bold mb-10">Add a new product</h1>
        <form onSubmit={handleSubmit}>
          <FormControl className="w-80">
            <FormLabel sx={{ mb: 1 }}>Enter product name</FormLabel>
            <TextField
              variant="outlined"
              required
              sx={{ mb: 2 }}
              onChange={(e) => setProductName(e.target.value)}
            ></TextField>
            <FormLabel sx={{ mb: 1 }}>Size</FormLabel>
            <Select
              id="demo-simple-select"
              value={productSize}
              required
              sx={{ mb: 2 }}
              onChange={(e) => setProductSize(e.target.value)}
            >
              {SIZES.map((size: { name: string; value: string }) => (
                <MenuItem key={size.value} value={size.value}>
                  {size.name}
                </MenuItem>
              ))}
            </Select>
            <FormLabel sx={{ mb: 1 }}>Price</FormLabel>
            <TextField
              variant="outlined"
              required
              sx={{ mb: 2 }}
              onChange={(e) => setProductPrice(e.target.value)}
            ></TextField>
            <FormLabel sx={{ mb: 1 }}>Category</FormLabel>
            <FormControl>
              <Select
                id="demo-simple-select"
                value={productCategory}
                required
                sx={{ mb: 2 }}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                {categoriesData?.data?.categories.map((category: Category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </FormControl>
        </form>

        <Snackbar
          open={snackContent.shouldDisplay}
          autoHideDuration={3000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity={snackContent.typeOfSnack}
            sx={{ width: '100%' }}
          >
            {snackContent.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default CreateProduct;
