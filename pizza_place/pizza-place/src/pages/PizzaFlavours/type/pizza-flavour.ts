import { Size } from '../../../shared/types/size';

export type PizzaFlavour = {
  id: number;
  name: string;
  size: Size;
  categoryFlavour?: CategoryPizzaFlavour;
};

export type CategoryPizzaFlavour = {
  id: number;
  name: string;
  price: number;
};
