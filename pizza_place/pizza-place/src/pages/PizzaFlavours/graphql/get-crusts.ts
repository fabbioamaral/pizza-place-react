import { gql } from '@apollo/client';

export const GET_PIZZA_FLAVOURS = gql`
  query GetPizzaFlavours($size: String!) {
    pizzaFlavours(size: $size) {
      name
      price
      categoryFlavourId
      categoryFlavourName
    }
  }
`;
