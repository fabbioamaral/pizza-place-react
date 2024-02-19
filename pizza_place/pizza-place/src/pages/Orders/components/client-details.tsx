import { ClientDetailsProps } from '../types/client-details-props';

function ClientDetails(props?: ClientDetailsProps) {
  return (
    <>
      <div className="flex mb-1 pt-2 pl-2">
        <p className="font-bold">Client name:</p>
        <p className="ml-1">{props?.clientName || 'Joao da Silva'}</p>
      </div>
      <div className="border-b-2 border-gray-600">
        <p className="pl-2 font-bold">Notes:</p>
        <p className="bg-gray-300 p-2 pb-6 mt-1 mx-2 mb-3">
          {props?.notes || 'Cliente costuma pedir para tirar cebola'}
        </p>
      </div>
    </>
  );
}

export default ClientDetails;
