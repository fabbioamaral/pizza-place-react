import { Address } from '../../Addresses/types/address';

export interface Client {
  id: number;
  name: string;
  phone: string;
  notes: string;
  addresses: Address[];
}
