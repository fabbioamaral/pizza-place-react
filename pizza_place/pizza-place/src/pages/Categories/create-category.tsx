import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { FormControl, FormLabel, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';
import { CREATE_CATEGORY } from './graphql/create-category';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SnackContent } from '../../shared/types/snack';
import { cache } from '../..';
import { GET_CATEGORIES } from './graphql/get-categories';
import Header from '../../shared/components/header';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const snackInitialContent: SnackContent = {
    shouldDisplay: false,
    message: '',
    typeOfSnack: undefined,
  };
  const [snackContent, setSnackContent] = useState(snackInitialContent);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const result = await createCategory({
        variables: { name: categoryName },
      });
      handleAddItem(result.data.id);

      setSnackContent({
        shouldDisplay: true,
        message: 'Product Category has been added successfully!',
        typeOfSnack: 'success',
      });
      setTimeout(() => navigate('/list-categories'), 1000);
    } catch (error) {
      setSnackContent({
        shouldDisplay: true,
        message: 'Error trying to add Product Category',
        typeOfSnack: 'error',
      });
      console.error(error);
    }
  };

  const handleAddItem = (categoryId: number) => {
    cache.updateQuery({ query: GET_CATEGORIES }, (data) => {
      console.log(data);
      if (!data) {
        return {
          categories: [{ id: categoryId, name: categoryName }],
        };
      } else {
        const categoriesCopy = JSON.parse(JSON.stringify(data.categories));
        return {
          categories: categoriesCopy.push({
            id: categoryId,
            name: categoryName,
          }),
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
        <h1 className="font-bold mb-10">Create a new product category</h1>
        <form onSubmit={handleSubmit}>
          <FormControl className="w-80">
            <FormLabel sx={{ mb: 1 }}>Enter new category name</FormLabel>
            <TextField
              variant="outlined"
              required
              sx={{ mb: 2 }}
              onChange={(e) => setCategoryName(e.target.value)}
            ></TextField>
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

export default CreateCategory;
