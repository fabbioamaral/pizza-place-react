import { Button, FormControl, FormLabel, TextField } from '@mui/material';
import Header from '../../shared/components/header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Client } from './types/client';
import ClientDetails from './components/client-details';

function SearchClient() {
  const [clientNumber, setClientNumber] = useState('');
  const [client, setClient] = useState();

  useEffect(() => {}, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!clientNumber) return;
    console.log(clientNumber);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/clients/${clientNumber}`
      );
      console.log(response.data);
      setClient(response.data.data);
    } catch (error) {
      // TODO: exibir snack alert informando ao usuario que o cliente nao foi encontrado, mostrando a opcao de cadastra-lo.
      console.error('error retriveing client', error);
      setClient(undefined);
    }
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
      {client ? <ClientDetails client={client} /> : ''}
    </>
  );
}

export default SearchClient;
