import { FormControl, FormLabel, TextField, Typography } from '@mui/material';
import Header from '../../shared/components/header';
import { useForm } from 'react-hook-form';
import AddressForm from '../Addresses/components/address-form';
import { Address } from '../Addresses/types/address';
import { useMutation } from '@apollo/client';
import { CREATE_CLIENT } from './graphql/create-client';

function CreateClient() {
  const { register, getValues } = useForm();

  const [createClient] = useMutation(CREATE_CLIENT);

  const addClient = async (address: Address): Promise<void> => {
    try {
      const result = await createClient({
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
    } catch (error) {
      console.error('[CreateClient] Error adding a new client');
    }
  };

  const getValuesFromPersonalDataForm = (): {
    name: string;
    phone: string | number;
    notes: string;
  } => {
    return {
      name: getValues('name'),
      phone: getValues('phone'),
      notes: getValues('notes'),
    };
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
