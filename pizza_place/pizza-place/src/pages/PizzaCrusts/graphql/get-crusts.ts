import { gql } from '@apollo/client';

export const GET_PIZZA_CRUSTS = gql`
  query GetPizzaCrusts($size: String!) {
    pizzaCrusts(size: $size) {
      id
      name
      price
      size
    }
  }
`;
