import { AddCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import AddressCard from '../../Addresses/components/AddressCard';
import ClientInfo from './client-info';
import { Client } from '../types/client';
import { Address } from '../../Addresses/types/address';
import { useEffect, useState } from 'react';
import ModalAddAddress from '../../Addresses/components/modal-add-new-address';
import { GET_ADDRESSES } from '../../Addresses/graphql/get-addresses';
import { useQuery } from '@apollo/client';

function ClientDetails(props: {
  client: Client;
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address | undefined>>;
}) {
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const { loading, data, error, refetch } = useQuery(GET_ADDRESSES, {
    variables: { clientId: props.client.id },
  });
  const [addresses, setAddresses] = useState(data?.addresses);

  useEffect(() => {
    // setting the selected property to addresses
    if (!loading && !!data) {
      const addressesData = data?.addresses?.map((address: Address) => {
        return {
          ...address,
          selected: address.default ? true : false,
        };
      });
      setAddresses(addressesData);

      props.setSelectedAddress(getSelectedAddress);
    }
  }, [data, loading, props, getSelectedAddress]);

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
    props.setSelectedAddress(getSelectedAddress);
  };

  function getSelectedAddress(): Address {
    return addresses.find((address: Address) => address.selected);
  }

  return (
    <>
      <div className="rounded border p-6 mx-10">
        <div className="flex">
          <div className="w-3/12">
            <ClientInfo client={props.client} />
          </div>
          <div className="p-4 w-9/12">
            {!!addresses?.length ? (
              <p className="font-bold mb-1">Please pick an address:</p>
            ) : (
              <p className="font-bold mb-1">Please add an address:</p>
            )}
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
            onAction={refetch}
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
