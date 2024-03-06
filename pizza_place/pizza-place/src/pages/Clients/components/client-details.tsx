import { AddCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import AddressCard from '../../Addresses/components/AddressCard';
import ClientInfo from './client-info';
import { Client } from '../types/client';
import { Address } from '../../Addresses/types/address';

function ClientDetails(props: { client: Client }) {
  return (
    <>
      <div className="rounded border p-6 mx-10">
        <div className="flex">
          <ClientInfo client={props.client} />
          <div className="p-4 w-full">
            <p className="font-bold mb-1">Please pick an address:</p>
            {props.client.addresses &&
              props.client.addresses.map((address: Address) => (
                <AddressCard
                  key={address.id}
                  addressSummaryText={`${address.street}, ${address.number},${address.suburbId}, ${address.city} `}
                  selected={address.selected}
                />
              ))}
            <div className="flex flex-col items-center mt-4">
              <Button
                variant="contained"
                sx={{ mb: 1 }}
                type="submit"
                startIcon={<AddCircle />}
              >
                Add New Address
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button
            variant="contained"
            sx={{ mb: 1, width: 0.4 }}
            type="submit"
            color="success"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default ClientDetails;
