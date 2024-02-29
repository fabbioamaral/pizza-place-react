import { Client } from '../types/client';

export default function ClientInfo(props: Client) {
  return (
    <>
      <div>
        <p className="mb-1">{props.name || 'Joao da Silva'}</p>
        <p className="mb-1">{props.phone || '(31) 9999-9999'}</p>
        <div className="p-2 rounded bg-gray-200">
          <p>{props.notes || 'Cliente costuma pedir para tirar cebola'}</p>
        </div>
      </div>
    </>
  );
}
