import {
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import Header from '../../shared/components/header';
import { FieldValues, useForm } from 'react-hook-form';
import AddressForm from '../Addresses/components/address-form';

function CreateClient() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  return (
    <>
      <Header></Header>
      <div className="p-10">
        <Typography variant="h5" component="h1">
          Add New Client
        </Typography>
        <h2>Personal Data</h2>
        <form onSubmit={() => console.log('onSubmit!')}>
          <FormControl className="w-full">
            <div className="flex">
              <div className="flex flex-col w-3/12 mr-2">
                <FormLabel sx={{ mb: 1, mt: 2 }}>Name</FormLabel>
                <TextField
                  variant="outlined"
                  required
                  sx={{ mb: 2 }}
                  {...register('name')}
                ></TextField>
              </div>

              <div className="flex flex-col w-1/12">
                <FormLabel sx={{ mb: 1, mt: 2 }}>Phone Number</FormLabel>
                <TextField
                  variant="outlined"
                  required
                  sx={{ mb: 2 }}
                  type="tel"
                  {...register('phone')}
                ></TextField>
              </div>
            </div>
            <div className="flex flex-col w-4/12">
              <FormLabel sx={{ mb: 1, mt: 2 }}>
                Notes About This Client
              </FormLabel>
              <TextField
                variant="outlined"
                sx={{ mb: 2 }}
                {...register('name')}
                multiline
                minRows={3}
              ></TextField>
            </div>
          </FormControl>
          <h2>Address</h2>
          <div className="w-4/12">
            <AddressForm />
          </div>
          <div className="mt-4">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
        {/* 
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
        </Snackbar> */}
      </div>
    </>
  );
}

export default CreateClient;
