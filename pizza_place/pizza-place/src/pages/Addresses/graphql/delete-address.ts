import { gql } from 'apollo-boost';

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($id: ID!) {
    deleteAddress(input: { id: $id }) {
      status
    }
  }
`;
