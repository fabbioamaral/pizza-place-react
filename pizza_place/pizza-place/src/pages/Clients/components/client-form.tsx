import { Button, FormControl, FormLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Client } from '../types/client';

function ClientForm({ client }: { client?: Client }) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm();

  return (
    <>
      <form>
        <FormControl className="w-full">
          <div className="flex">
            <div className="flex flex-col w-5/12 mr-2">
              <FormLabel sx={{ mb: 1, mt: 2 }}>Name</FormLabel>
              <TextField
                variant="outlined"
                required
                sx={{ mb: 2 }}
                defaultValue={client?.name}
                {...register('name')}
              ></TextField>
            </div>

            <div className="flex flex-col w-2/12">
              <FormLabel sx={{ mb: 1, mt: 2 }}>Phone Number</FormLabel>
              <TextField
                variant="outlined"
                required
                sx={{ mb: 2 }}
                type="tel"
                {...register('phone')}
                defaultValue={client?.phone}
              ></TextField>
            </div>
          </div>
          <div className="flex flex-col w-7/12">
            <FormLabel sx={{ mb: 1, mt: 2 }}>Notes About This Client</FormLabel>
            <TextField
              variant="outlined"
              sx={{ mb: 2 }}
              {...register('notes')}
              multiline
              minRows={3}
              defaultValue={client?.notes}
            ></TextField>
          </div>
        </FormControl>
      </form>
    </>
  );
}

export default ClientForm;
