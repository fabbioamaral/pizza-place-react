import { Size } from '../../../shared/types/size';

export type Product = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  size: Size;
};
