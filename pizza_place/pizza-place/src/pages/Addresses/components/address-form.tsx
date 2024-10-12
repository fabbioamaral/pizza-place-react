import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import { FieldValues, useForm } from 'react-hook-form';
import { Address } from '../types/address';

function AddressForm({
  displayControlProperties,
  clientProperties,
  onFormSubmit,
}: {
  displayControlProperties?: {
    shouldShowSetAddress: boolean;
    shouldShowHeader: boolean;
    shouldShowClientInfo: boolean;
    shouldShowSaveAddressButton: boolean;
  };
  clientProperties?: {
    id: number | string;
    name: string;
    phone: string | number;
    notes?: string;
    address?: Address;
  };
  onFormSubmit?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm();

  const onButtonSubmit = async (data: FieldValues) => {
    // checks validity of address data
    if (!isValid) return;

    let parameterRequest: Object = {
      street: getValues('street'),
      number: getValues('number'),
      suburb_id: 1,
      city: getValues('city'),
      additionalInfo: getValues('additionalInfo'),
    };

    if (clientProperties?.id) {
      parameterRequest = {
        ...parameterRequest,
        default: getValues('default') === 'true' ? true : false,
        clientId: clientProperties.id,
      };
    }

    onFormSubmit(parameterRequest);
  };

  return (
    <>
      {displayControlProperties?.shouldShowHeader ? (
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Address
        </Typography>
      ) : (
        ''
      )}
      {displayControlProperties?.shouldShowClientInfo ? (
        <div>
          <p className="font-bold mt-4">{clientProperties?.name}</p>
          <p className="font-bold">{clientProperties?.phone}</p>
        </div>
      ) : (
        ''
      )}

      <div>
        <form onSubmit={handleSubmit(onButtonSubmit)}>
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
            {displayControlProperties?.shouldShowSetAddress ? (
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
            ) : (
              ''
            )}
          </FormControl>

          <div className="mt-4">
            <Button sx={{ mr: 2 }} variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddressForm;
