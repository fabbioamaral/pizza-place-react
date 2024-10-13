import { useQuery } from '@apollo/client';
import TableComponent from '../../shared/components/table';
import { GET_CLIENTS } from './graphql/get-clients';
import Header from '../../shared/components/header';

function ListClients() {
  const clients = useQuery(GET_CLIENTS).data?.clients?.map(
    (clientObject: any) => {
      return {
        id: clientObject.id,
        name: clientObject.name,
        phone: clientObject.phone,
      };
    }
  );

  return (
    <>
      <Header></Header>
      <TableComponent
        headerTitles={['id', 'Client Name', 'Phone Number']}
        ariaLabel="clients"
        data={clients}
      />
    </>
  );
}

export default ListClients;
