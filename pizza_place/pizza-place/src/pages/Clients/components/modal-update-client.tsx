import { ModalPropsType } from '../../../shared/types/modal';
import ClientForm from './client-form';
import AddressCard from '../../Addresses/components/address-card';
import { Alert, Box, Button, Modal, Snackbar, Typography } from '@mui/material';
import { Address } from '../../Addresses/types/address';
import ModalAddAddress from '../../Addresses/components/modal-add-new-address';
import { AddCircle } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ADDRESSES } from '../../Addresses/graphql/get-addresses';
import { DELETE_ADDRESS } from '../../Addresses/graphql/delete-address';
import { SNACK_INITIAL_CONTENT } from '../../../shared/constants/snack-initial-content';

function ModalUpdateClient(props: ModalPropsType) {
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adressIdToDelete, setAdressIdToDelete] = useState<number | string>();

  const { loading, data, error, refetch } = useQuery(GET_ADDRESSES, {
    variables: { clientId: props.data.client.id },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [deleteAddress] = useMutation(DELETE_ADDRESS);
  const onDeleteAddress = async () => {
    try {
      await deleteAddress({ variables: { id: adressIdToDelete } });
      await refetch();
      setSnackContent({
        shouldDisplay: true,
        message: 'Client address has been deleted successfully!',
        typeOfSnack: 'success',
      });
      setIsDeleteModalOpen(false);
    } catch (error) {
      setSnackContent({
        shouldDisplay: true,
        message: 'Error trying to delete client address',
        typeOfSnack: 'error',
      });
      console.error(error);
    }
  };

  const [snackContent, setSnackContent] = useState(SNACK_INITIAL_CONTENT);

  const handleCloseSnack = () => {
    setSnackContent({
      shouldDisplay: false,
      message: '',
      typeOfSnack: undefined,
    });
  };

  const STYLE_MODAL = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    maxHeight: '90%',
  };
  return (
    <>
      <Modal
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={STYLE_MODAL}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Client
          </Typography>
          <ClientForm
            client={props.data.client}
            register={props.data.register}
            reset={props.data.reset}
          />
          <h3
            className="mb-2"
            style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 400 }}
          >
            Addresses
          </h3>
          {data?.addresses?.length > 0 ? (
            data.addresses.map((address: Address) => (
              <div
                key={address.id}
                onClick={() => setAdressIdToDelete(address.id)}
              >
                <AddressCard
                  addressSummaryText={`${address.street}, ${address.number},${address.suburb_id}, ${address.city} `}
                  selected={address.default}
                  deleteAddress={onDeleteAddress}
                />
              </div>
            ))
          ) : (
            <p>No address registered.</p>
          )}
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            type="submit"
            size="small"
            startIcon={<AddCircle />}
            onClick={() => setIsAddAddressModalOpen(true)}
          >
            Add New Address
          </Button>
          <div className="mt-6">
            <Button
              sx={{ mr: 2 }}
              variant="outlined"
              onClick={() =>
                props.onAction(
                  props.data.getValues('name'),
                  props.data.getValues('phone'),
                  props.data.getValues('notes')
                )
              }
            >
              Update
            </Button>
            <Button variant="outlined" onClick={props.onDismiss}>
              Dismiss
            </Button>
          </div>
        </Box>
      </Modal>
      {isAddAddressModalOpen && (
        <ModalAddAddress
          isOpen={isAddAddressModalOpen}
          onClose={() => setIsAddAddressModalOpen(false)}
          onAction={refetch}
          onDismiss={() => setIsAddAddressModalOpen(false)}
          data={{ client: props.data.client }}
        ></ModalAddAddress>
      )}
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
    </>
  );
}

export default ModalUpdateClient;

/**
 *
 * CONTINUAR:
 *
 * 2) Alterar o AddressCard para ter um ícone para edição e exclusão de endereço
 * 3) Implementar lógica de edição de endereço default
 *
 */
