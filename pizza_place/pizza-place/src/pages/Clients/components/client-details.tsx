import { AddCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import AddressCard from '../../Addresses/components/AddressCard';
import ClientInfo from './client-info';
import { Client } from '../types/client';
import { Address } from '../../Addresses/types/address';
import { useState } from 'react';
import ModalAddAddress from '../../Addresses/components/modal-add-new-address';

function ClientDetails(props: {
  client: Client;
  onAddressSelected: (data?: any) => void;
}) {
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  return (
    <>
      <div className="rounded border p-6 mx-10">
        <div className="flex">
          <ClientInfo client={props.client} />
          <div className="p-4 w-full">
            <p className="font-bold mb-1">Please pick an address:</p>
            {props.client.addresses &&
              props.client.addresses.map((address: Address) => (
                <div onClick={() => props.onAddressSelected(address.id)}>
                  <AddressCard
                    key={address.id}
                    addressSummaryText={`${address.street}, ${address.number},${address.suburbId}, ${address.city} `}
                    selected={address.isSelected}
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

// TODO: criar função para quando clicar em um AddressCard, alterar a propriedad daquele endereço para selected, e definir como false a propriedade selected do AddressCard que estava selecionado anteriormente.

// TODO: desenvolver lógica para adicionar cliente em caso que não se encontra o número informado na busca. Talvez deixar pra fazer isso quando tiver desenvolvendo a parte de cliente
