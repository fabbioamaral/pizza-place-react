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

  const onFormSubmit = async (data: FieldValues) => {
    if (!isValid) return;
    if (!props?.data?.client?.id) return;

    try {
      await createAddress({
        variables: {
          street: data.street,
          number: data.number,
          suburbId: 1, // this field must be a menu dropdown
          clientId: props.data.client.id,
          city: data.city,
          additionalInfo: data.additionalInfo,
          isDefault: data.default === 'true' ? true : false, // workaround since the radio group is return the value as string
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
          {/* <form onSubmit={handleSubmit(onFormSubmit)}>
            <FormControl className="w-full">
              <div className="flex justify-start">
                <div className="flex flex-col w-7/12 mr-2">
                  <FormLabel sx={{ mb: 1, mt: 2 }}>Street</FormLabel>
                  <TextField
                    variant="outlined"
                    required
                    sx={{ mb: 2 }}
                    {...register('street')}
                  ></TextField>
                </div>

                <div className="flex flex-col w-2/12">
                  <FormLabel sx={{ mb: 1, mt: 2 }}>Number</FormLabel>
                  <TextField
                    variant="outlined"
                    required
                    sx={{ mb: 2 }}
                    {...register('number')}
                  ></TextField>
                </div>

                <div className="flex flex-col w-3/12 ml-2">
                  <FormLabel sx={{ mb: 1, mt: 2 }}>Additional Info</FormLabel>
                  <TextField
                    variant="outlined"
                    required
                    sx={{ mb: 2 }}
                    {...register('additionalInfo')}
                  ></TextField>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="flex flex-col w-6/12 mr-2">
                  <FormLabel sx={{ mb: 1, mt: 2 }}>Suburb</FormLabel>
                  <TextField
                    variant="outlined"
                    required
                    sx={{ mb: 2 }}
                    {...register('suburb')}
                  ></TextField>
                </div>

                <div className="flex flex-col w-6/12">
                  <FormLabel sx={{ mb: 1, mt: 2 }}>City</FormLabel>
                  <TextField
                    variant="outlined"
                    required
                    sx={{ mb: 2 }}
                    {...register('city')}
                  ></TextField>
                </div>
              </div>
              <div>
                <FormLabel id="demo-radio-buttons-group-label">
                  Set this address as default?
                </FormLabel>
                <RadioGroup
                  {...register('default')}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  row
                  defaultValue={true}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                    {...register('default')}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                    {...register('default')}
                  />
                </RadioGroup>
              </div>
            </FormControl>
            <div className="mt-4">
              <Button sx={{ mr: 2 }} variant="outlined" type="submit">
                Save New Address
              </Button>
              <Button variant="outlined" onClick={props.onDismiss}>
                Dismiss
              </Button>
            </div>
          </form> */}
          <AddressForm
            shouldShowSetAddress={true}
            shouldShowHeader={true}
            shouldShowClientInfo={true}
            shouldShowSaveAddressButton={true}
            clientName={props.data.client.name}
            clientPhone={props.data.client.phone}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default ModalAddAddress;

// TODO: criar um componente reutilizavel para os textfield. objetivo: diminuir numeros de linhas de codigo
