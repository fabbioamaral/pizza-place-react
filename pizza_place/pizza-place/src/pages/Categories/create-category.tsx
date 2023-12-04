import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CATEGORY } from './graphql/category-graphql';

function CreateCategory() {
    const [categoryName, setCategoryName] = useState('');
    const [createCategory] = useMutation(CREATE_CATEGORY);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const res = await createCategory({variables: {name: categoryName}});
            // TODO: display success toast message
            // TODO: redirect user to list-category page
        } catch (error) {
            // TODO: display fail toast message
        }
    }

    return (
        <div className='p-10'>
        <h1 className='font-bold mb-10'>Create a new product category</h1>
            <form onSubmit={handleSubmit}>
                <FormControl className="w-80">
                    <FormLabel sx={{mb: 1}}>Enter new category name</FormLabel>
                    <TextField variant='outlined' required sx={{mb: 2}} onChange={e => setCategoryName(e.target.value)}></TextField>
                    <Button variant="contained" type='submit'>Submit</Button>
                </FormControl>
            </form>
        </div>

    );
  }
  
  export default CreateCategory;
  