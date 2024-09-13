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

function AddressForm({
  shouldShowSetAddress,
  shouldShowHeader,
  shouldShowClientInfo,
  shouldShowSaveAddressButton,
  clientName,
  clientPhone,
  onSubmitForm,
}: {
  shouldShowSetAddress?: boolean;
  shouldShowHeader?: boolean;
  shouldShowClientInfo?: boolean;
  shouldShowSaveAddressButton?: boolean;
  clientName?: string;
  clientPhone?: string;
  onSubmitForm?: () => {};
}) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  //   const onFormSubmit = async (data: FieldValues) => {
  //     if (!isValid) return;
  //     //if (!props?.data?.client?.id) return;
  //   };

  return (
    <>
      {shouldShowHeader ? (
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Address
        </Typography>
      ) : (
        ''
      )}
      {shouldShowClientInfo ? (
        <div>
          <p className="font-bold mt-4">{clientName}</p>
          <p className="font-bold">{clientPhone}</p>
        </div>
      ) : (
        ''
      )}

      <div>
        <form onSubmit={() => console.log('hello')}>
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
            {shouldShowSetAddress ? (
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
          {shouldShowSaveAddressButton ? (
            <div className="mt-4">
              <Button sx={{ mr: 2 }} variant="outlined" type="submit">
                Save New Address
              </Button>
            </div>
          ) : (
            ''
          )}
        </form>
      </div>
    </>
  );
}

export default AddressForm;
