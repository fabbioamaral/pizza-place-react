import { Client } from '../types/client';

export default function ClientInfo(props: { client: Client }) {
  return (
    <>
      <div>
        <p className="mb-1">{props.client.name || 'Joao da Silva'}</p>
        <p className="mb-1">{props.client.phone || '(31) 9999-9999'}</p>
        <div className="p-2 rounded bg-gray-200">
          <p>
            {props.client.notes || 'Cliente costuma pedir para tirar cebola'}
          </p>
        </div>
      </div>
    </>
  );
}
