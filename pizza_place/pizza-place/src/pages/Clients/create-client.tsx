import {
  FormControl,
  FormLabel,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import Header from '../../shared/components/header';
import { useForm } from 'react-hook-form';
import AddressForm from '../Addresses/components/address-form';
import { Address } from '../Addresses/types/address';
import { useMutation } from '@apollo/client';
import { CREATE_CLIENT } from './graphql/create-client';
import React, { useState } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SNACK_INITIAL_CONTENT } from '../../shared/constants/snack-initial-content';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateClient() {
  const { register, getValues } = useForm();
  const navigate = useNavigate();
  const [createClient] = useMutation(CREATE_CLIENT);
  const [snackContent, setSnackContent] = useState(SNACK_INITIAL_CONTENT);

  const addClient = async (address: Address): Promise<void> => {
    try {
      await createClient({
        variables: {
          name: getValues('name'),
          phone: getValues('phone'),
          notes: getValues('notes'),
          street: address.street,
          number: address.number,
          suburbId: 1,
          city: address.city,
          additionalInfo: address.additionalInfo,
          default: true,
        },
      });

      setSnackContent({
        shouldDisplay: true,
        message: 'Client has been added successfully!',
        typeOfSnack: 'success',
      });

      setTimeout(() => navigate('/list-clients'), 1000);
    } catch (error) {
      setSnackContent({
        shouldDisplay: true,
        message: 'Error trying to add client',
        typeOfSnack: 'error',
      });
      console.error('[CreateClient] Error adding a new client');
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
    <>
      <Header></Header>
      <div className="p-10">
        <Typography variant="h5" component="h1">
          Add New Client
        </Typography>
        <h2>Personal Data</h2>
        <form>
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
                {...register('notes')}
                multiline
                minRows={3}
              ></TextField>
            </div>
          </FormControl>

          {/* <div className="mt-4">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div> */}
        </form>
        <h2>Address</h2>
        <div className="w-4/12">
          <AddressForm onFormSubmit={addClient} />
        </div>

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

export default CreateClient;
