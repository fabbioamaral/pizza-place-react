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
      await createCategory({ variables: { name: categoryName } });
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
    }
  };

  const handleCloseSnack = () => {
    setSnackContent({
      shouldDisplay: false,
      message: '',
      typeOfSnack: undefined,
    });
  };

  return (
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
  );
}

export default CreateCategory;
