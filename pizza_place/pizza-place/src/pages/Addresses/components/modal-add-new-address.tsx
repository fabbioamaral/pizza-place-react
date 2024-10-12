import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ModalPropsType } from '../../../shared/types/modal';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import { FieldValues, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_ADDRESS } from '../graphql/create-address';
import AddressForm from './address-form';
import { Address } from '../types/address';

function ModalAddAddress(props: ModalPropsType) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const [createAddress] = useMutation(CREATE_ADDRESS);

  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const addAddress = async (address: Address) => {
    if (!isValid) return;
    if (!props?.data?.client?.id) return;

    try {
      await createAddress({
        variables: {
          street: address.street,
          number: address.number,
          suburbId: 1, // this field must be a menu dropdown
          clientId: props.data.client.id,
          city: address.city,
          additionalInfo: address.additionalInfo,
          isDefault: address.default,
        },
      });

      props.onAction();
      props.onClose();
    } catch (error) {
      console.error('[ModalAddAddress] Error adding a new address');
      props.onAction(false);
      // TODO: add snack error message
    }
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <div>
          <AddressForm
            displayControlProperties={{
              shouldShowSetAddress: true,
              shouldShowHeader: true,
              shouldShowClientInfo: true,
              shouldShowSaveAddressButton: false,
            }}
            clientProperties={{
              name: props.data.client.name,
              phone: props.data.client.phone,
              id: props.data.client.id,
            }}
            onFormSubmit={addAddress}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default ModalAddAddress;

// TODO: criar um componente reutilizavel para os textfield. objetivo: diminuir numeros de linhas de codigo
