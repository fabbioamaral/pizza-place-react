import { gql } from 'apollo-boost';

export const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID!) {
    deleteClient(input: { id: $id }) {
      status
    }
  }
`;
