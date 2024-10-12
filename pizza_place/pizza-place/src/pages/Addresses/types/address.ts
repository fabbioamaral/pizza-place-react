export interface Address {
  id?: number;
  street: string;
  number: string;
  suburb_id: number;
  city: string;
  selected?: boolean; // exists only on FE
  default: boolean;
  additionalInfo?: string;
  clientId?: number;
}
