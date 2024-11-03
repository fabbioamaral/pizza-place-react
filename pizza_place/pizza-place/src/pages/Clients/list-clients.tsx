import { useMutation, useQuery } from '@apollo/client';
import TableComponent from '../../shared/components/table';
import { GET_CLIENTS } from './graphql/get-clients';
import Header from '../../shared/components/header';
import ModalDelete from '../../shared/components/ModalDelete';
import React, { useEffect, useState } from 'react';
import { DELETE_CLIENT } from './graphql/delete-client';
import ModalUpdateClient from './components/modal-update-client';
import { Client } from './types/client';
import { UPDATE_CLIENT } from './graphql/update-client';
import { useForm } from 'react-hook-form';
import { SNACK_INITIAL_CONTENT } from '../../shared/constants/snack-initial-content';
import { Alert, Snackbar } from '@mui/material';

function ListClients() {
  const { data, refetch } = useQuery(GET_CLIENTS);
  const { register, getValues, setValue, reset } = useForm();

  const [deleteClient] = useMutation(DELETE_CLIENT);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientIdToBeDeleted, setClientIdToBeDeleted] = useState('');
  const onDeleteClient = async () => {
    try {
      await deleteClient({ variables: { id: clientIdToBeDeleted } });
      await refetch();
      setSnackContent({
        shouldDisplay: true,
        message: 'Client has been deleted successfully!',
        typeOfSnack: 'success',
      });
      setIsDeleteModalOpen(false);
    } catch (error) {
      setSnackContent({
        shouldDisplay: true,
        message: 'Error trying to delete client',
        typeOfSnack: 'error',
      });
      console.error(error);
    }
  };
  const onClickDelete = (clientId: string) => {
    setIsDeleteModalOpen(true);
    setClientIdToBeDeleted(clientId);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [clientToBeUpdated, setClientToBeUpdated] = useState<Client>();
  const onClickUpdate = (clientId: string | number) => {
    const clientToBeUpdated = data?.clients?.find(
      (client: Client) => client.id === clientId
    );
    setClientToBeUpdated(clientToBeUpdated);
    setIsUpdateModalOpen(true);
  };

  const [updateClient] = useMutation(UPDATE_CLIENT);

  const onUpdateClient = async (name: string, phone: string, notes: string) => {
    try {
      const clientUpdated = {
        id: clientToBeUpdated!.id,
        name: name || clientToBeUpdated!.name,
        phone: phone || clientToBeUpdated!.phone,
        notes: notes || clientToBeUpdated!.notes,
      };
      await updateClient({
        variables: clientUpdated,
      });
      setSnackContent({
        shouldDisplay: true,
        message: 'Client has been updated successfully!',
        typeOfSnack: 'success',
      });

      await refetch();

      setIsUpdateModalOpen(false);
    } catch (error) {
      setSnackContent({
        shouldDisplay: true,
        message: 'Error trying to update client',
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

  return (
    <>
      <Header></Header>
      <TableComponent
        headerTitles={['id', 'Client Name', 'Phone Number']}
        ariaLabel="clients"
        data={data?.clients?.map((clientObject: any) => {
          return {
            id: clientObject.id,
            name: clientObject.name,
            phone: clientObject.phone,
          };
        })}
        onClickDelete={onClickDelete}
        onClickUpdate={onClickUpdate}
      />
      {isDeleteModalOpen && (
        <ModalDelete
          title="Delete Client"
          description="Are you sure you want to delete this client?"
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDismiss={() => setIsDeleteModalOpen(false)}
          onAction={onDeleteClient}
        ></ModalDelete>
      )}
      {isUpdateModalOpen && (
        <ModalUpdateClient
          data={{
            client: clientToBeUpdated,
            register,
            getValues,
            reset,
          }}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onDismiss={() => setIsUpdateModalOpen(false)}
          onAction={onUpdateClient}
        ></ModalUpdateClient>
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

export default ListClients;
