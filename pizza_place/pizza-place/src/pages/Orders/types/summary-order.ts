import { Address } from '../../Addresses/types/address';

export interface SummaryOrderTyoe {
  numberOfProduct: number;
  totalProducts: number;
  deliveryFee: number;
  total: number;
  address: Address;
}
