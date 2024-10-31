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

function ListClients() {
  const { data, refetch } = useQuery(GET_CLIENTS);
  const { register, getValues, setValue, reset } = useForm();

  const [deleteCategory] = useMutation(DELETE_CLIENT);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientIdToBeDeleted, setClientIdToBeDeleted] = useState('');
  const deleteClient = async () => {
    try {
      await deleteCategory({ variables: { id: clientIdToBeDeleted } });
      await refetch();
      setIsDeleteModalOpen(false);
    } catch (error) {}
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
      await refetch();

      setIsUpdateModalOpen(false);
    } catch (error) {}
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
          onAction={deleteClient}
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
    </>
  );
}

export default ListClients;
