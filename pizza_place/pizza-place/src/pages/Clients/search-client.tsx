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

function SearchClient() {
  const [clientNumber, setClientNumber] = useState('');
  const [client, setClient] = useState();
  const [snackContent, setSnackContent] = useState(SNACK_INITIAL_CONTENT);

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
      {client ? <ClientDetails client={client} /> : ''}
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
