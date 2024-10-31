import { FormControl, FormLabel, TextField } from '@mui/material';
import { FieldValues, UseFormRegister, UseFormReset } from 'react-hook-form';
import { Client } from '../types/client';
import { useEffect } from 'react';

function ClientForm({
  client,
  register,
  reset,
}: {
  client?: Client;
  register: UseFormRegister<FieldValues>;
  reset: UseFormReset<FieldValues>;
}) {
  useEffect(() => {
    if (client) {
      reset({ name: client.name, phone: client.phone, notes: client.notes });
    }
  }, [client]);

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
              ></TextField>
            </div>
          </div>
          <div className="flex flex-col w-7/12">
            <FormLabel sx={{ mb: 1, mt: 2 }}>Notes About This Client</FormLabel>
            <TextField
              variant="outlined"
              sx={{ mb: 2 }}
              multiline
              minRows={3}
              {...register('notes')}
            ></TextField>
          </div>
        </FormControl>
      </form>
    </>
  );
}

export default ClientForm;
