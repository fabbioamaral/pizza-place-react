import { Client } from '../types/client';

export default function ClientInfo(props: { client: Client }) {
  return (
    <>
      <div>
        <div className="flex mb-1 pt-2 pl-2">
          <p className="font-bold">Client name:</p>
          <p className="ml-1">{props.client.name}</p>
        </div>
        <div className="flex mb-1 pt-2 pl-2">
          <p className="font-bold">Phone:</p>
          <p className="ml-1">{props.client.phone}</p>
        </div>
        <div>
          <p className="pl-2 font-bold">Notes:</p>
          <p className="bg-gray-300 p-2 pb-6 mt-1 mx-2 mb-3">
            {props.client.notes || '-'}
          </p>
        </div>
      </div>
    </>
  );
}
