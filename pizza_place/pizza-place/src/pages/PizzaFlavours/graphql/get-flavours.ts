import { gql } from '@apollo/client';

export const GET_PIZZA_FLAVOURS = gql`
  query GetPizzaFlavours($size: String!) {
    pizzaFlavours(size: $size) {
      id
      name
      price
      categoryFlavourId
      categoryFlavourName
    }
  }
`;
