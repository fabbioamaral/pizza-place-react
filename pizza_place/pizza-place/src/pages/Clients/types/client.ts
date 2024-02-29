import { Address } from '../../Addresses/types/address';

export interface Client {
  name: string;
  phone: string;
  notes: string;
  addresses: Address[];
}
