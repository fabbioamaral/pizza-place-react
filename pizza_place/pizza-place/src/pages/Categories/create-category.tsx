import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';

function CreateCategory() {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(categoryName);
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
  