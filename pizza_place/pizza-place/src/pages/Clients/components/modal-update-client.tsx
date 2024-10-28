import { useForm } from 'react-hook-form';
import { ModalPropsType } from '../../../shared/types/modal';
import ClientForm from './client-form';
import AddressCard from '../../Addresses/components/address-card';
import { Box, Button, Modal, Typography } from '@mui/material';
import { STYLE_MODAL } from '../../../shared/constants/style-modal-css';
import { Address } from '../../Addresses/types/address';

function ModalUpdateClient(props: ModalPropsType) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

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
          <ClientForm client={props.data} />
          <h3
            className="mb-2"
            style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 400 }}
          >
            Addresses
          </h3>
          {props.data?.addresses?.length > 0 ? (
            props.data.addresses.map((address: Address) => (
              <AddressCard
                key={address.id}
                addressSummaryText={`${address.street}, ${address.number},${address.suburb_id}, ${address.city} `}
                selected={address.default}
              />
            ))
          ) : (
            <p>No address registered.</p>
          )}
          <div className="mt-6">
            <Button sx={{ mr: 2 }} variant="outlined">
              Update
            </Button>
            <Button variant="outlined" onClick={props.onDismiss}>
              Dismiss
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default ModalUpdateClient;
