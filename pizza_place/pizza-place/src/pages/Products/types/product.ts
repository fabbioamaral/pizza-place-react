import { Size } from '../../../shared/types/size';
import { PizzaCrust } from '../../PizzaCrusts/types/pizza-crust';
import { PizzaFlavour } from '../../PizzaFlavours/type/pizza-flavour';

export type Product = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  size: Size;
  pizzaFlavour1?: PizzaFlavour;
  pizzaFlavour2?: PizzaFlavour;
  pizzaCrust?: PizzaCrust;
};
