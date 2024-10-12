import { gql } from 'apollo-boost';

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(input: { id: $id }) {
      status
    }
  }
`;
