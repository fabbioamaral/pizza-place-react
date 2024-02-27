import { Product } from '../../Products/types/product';

export interface SelectedProductsProps {
  products: SelectedProduct[];
  operatorName: string;
  sumPrice: number;
}

export type SelectedProduct = Product & { amount: number };
