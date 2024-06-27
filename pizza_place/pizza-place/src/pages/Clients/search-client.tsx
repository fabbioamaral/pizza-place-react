import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Snackbar,
  TextField,
} from '@mui/material';
import Header from '../../shared/components/header';
import { useState } from 'react';
import axios from 'axios';
import ClientDetails from './components/client-details';
import { SNACK_INITIAL_CONTENT } from '../../shared/constants/snack-initial-content';
import { useNavigate } from 'react-router-dom';
import { Client } from './types/client';

function SearchClient() {
  const [clientNumber, setClientNumber] = useState('');
  const [client, setClient] = useState<Client>();
  const [snackContent, setSnackContent] = useState(SNACK_INITIAL_CONTENT);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!clientNumber) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/clients/${clientNumber}`
      );
      setClient(response.data.data);
      handleCloseSnack();
    } catch (error) {
      console.error('error retriveing client', error);
      setClient(undefined);
      setSnackContent({
        shouldDisplay: true,
        message: 'Client has not been found.',
        typeOfSnack: 'error',
      });
      console.error(error);
    }
  };

  const handleCloseSnack = () => {
    setSnackContent({
      shouldDisplay: false,
      message: '',
      typeOfSnack: snackContent.typeOfSnack,
    });
  };

  const addClientButton = (
    <Button
      size="small"
      variant="outlined"
      onClick={
        () => console.log('add client!')
        // TODO: add logic do add client here
      }
    >
      Add Client?
    </Button>
  );

  const selectAddress = (addressId: number) => {
    const clientObject = client;
    const indexPreviousSelectedAddress: number = client!.addresses.findIndex(
      (address) => address.isSelected === true
    );
    clientObject!.addresses[indexPreviousSelectedAddress].isSelected = false;

    const indexNewlySelectedAddress = client!.addresses.findIndex(
      (address) => address.id === addressId
    );
    clientObject!.addresses[indexNewlySelectedAddress].isSelected = true;

    setClient(clientObject);
  };

  const goToOrderPage = () => {
    navigate('/create-order', {
      state: {
        client,
      },
    });
  };

  return (
    <>
      <Header></Header>
      <div className="p-10">
        <h1 className="font-bold mb-10">Search Client</h1>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel sx={{ mb: 1 }}>
              Please insert client phone number
            </FormLabel>
            <TextField
              variant="outlined"
              required
              sx={{ mb: 2 }}
              onChange={(e) => setClientNumber(e.target.value)}
            ></TextField>
            <Button variant="contained" type="submit">
              Search
            </Button>
          </FormControl>
        </form>
      </div>
      {client ? (
        <>
          <ClientDetails client={client} onAddressSelected={selectAddress} />
          <div className="flex justify-center mt-10">
            <Button
              variant="contained"
              sx={{ mb: 1, width: 0.4 }}
              type="submit"
              color="success"
              onClick={goToOrderPage}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        ''
      )}
      <Snackbar
        open={snackContent.shouldDisplay}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snackContent.typeOfSnack}
          sx={{ width: '100%' }}
          action={addClientButton}
        >
          {snackContent.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SearchClient;
