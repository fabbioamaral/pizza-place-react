import { ClientDetailsProps } from '../types/client-details-props';

function ClientDetails(props: ClientDetailsProps) {
  return (
    <>
      <div className="flex mb-1">
        <p>Client name:</p>
        <p className="ml-1">{props.clientName || 'Joao da Silva'}</p>
      </div>
      <p>Notes:</p>
      <p className="bg-gray-300 p-2 pb-6 mt-1">
        {props.notes || 'Cliente costuma pedir para tirar cebola'}
      </p>
    </>
  );
}

export default ClientDetails;
