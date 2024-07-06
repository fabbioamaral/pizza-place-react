import { AddCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import AddressCard from '../../Addresses/components/AddressCard';
import ClientInfo from './client-info';
import { Client } from '../types/client';
import { Address } from '../../Addresses/types/address';
import { useState } from 'react';
import ModalAddAddress from '../../Addresses/components/modal-add-new-address';

function ClientDetails(props: { client: Client }) {
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState(props.client.addresses);

  const setIsSelectedAddressProperty = () => {
    props.client.addresses.map(
      (address) => (address.selected = address.default ? true : false)
    );
  };
  setIsSelectedAddressProperty();

  const onAddressSelected = (addressId: string | number) => {
    const addressesCopy: Address[] = JSON.parse(JSON.stringify(addresses));
    const indexPreviousSelectedAddress: number = addressesCopy.findIndex(
      (address: Address) => address.selected === true
    );
    addressesCopy[indexPreviousSelectedAddress].selected = false;

    const indexNewlySelectedAddress = addressesCopy.findIndex(
      (address) => address.id === addressId
    );
    addressesCopy[indexNewlySelectedAddress].selected = true;
    setAddresses(addressesCopy);
  };

  return (
    <>
      <div className="rounded border p-6 mx-10">
        <div className="flex">
          <div className="w-3/12">
            <ClientInfo client={props.client} />
          </div>
          <div className="p-4 w-9/12">
            <p className="font-bold mb-1">Please pick an address:</p>
            {addresses &&
              addresses.map((address: Address) => (
                <div
                  key={address.id}
                  onClick={() => onAddressSelected(address.id)}
                >
                  <AddressCard
                    addressSummaryText={`${address.street}, ${address.number},${address.suburb_id}, ${address.city} `}
                    selected={address.selected}
                  />
                </div>
              ))}
            <div className="flex flex-col items-center mt-4">
              <Button
                variant="contained"
                sx={{ mb: 1 }}
                type="submit"
                startIcon={<AddCircle />}
                onClick={() => setIsAddAddressModalOpen(true)}
              >
                Add New Address
              </Button>
            </div>
          </div>
        </div>

        {isAddAddressModalOpen && (
          <ModalAddAddress
            isOpen={isAddAddressModalOpen}
            onClose={() => setIsAddAddressModalOpen(false)}
            onAction={() => {
              // a definir
            }}
            onDismiss={() => setIsAddAddressModalOpen(false)}
            data={{ client: props.client }}
          ></ModalAddAddress>
        )}
      </div>
    </>
  );
}

export default ClientDetails;

// TODO: desenvolver lógica para adicionar cliente em caso que não se encontra o número informado na busca. Talvez deixar pra fazer isso quando tiver desenvolvendo a parte de cliente
