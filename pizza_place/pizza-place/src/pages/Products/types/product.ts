import { Category } from '../../Categories/types/category';

export type Product = {
  id: number;
  name: string;
  price: number;
  category: Category;
};
