import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ModalPropsType } from '../../../shared/types/modal';
import {
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { SIZES } from '../../../shared/constants/sizes';
import { Category } from '../../Categories/types/category';
import { FieldValues, useForm } from 'react-hook-form';

function ModalAddAddress(props: ModalPropsType) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

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
    console.log(data);
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Address
        </Typography>

        <div>
          <p className="font-bold mt-4">{props.data.client.name}</p>
          <p className="font-bold">{props.data.client.phone}</p>
        </div>

        <div>
          <form onSubmit={handleSubmit(onFormSubmit)}>
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
            </FormControl>
            <div className="mt-4">
              <Button sx={{ mr: 2 }} variant="outlined" type="submit">
                Save New Address
              </Button>
              <Button variant="outlined" onClick={props.onDismiss}>
                Dismiss
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalAddAddress;

// TODO: criar um componente reutilizavel para os textfield. objetivo: diminuir numeros de linhas de codigo
