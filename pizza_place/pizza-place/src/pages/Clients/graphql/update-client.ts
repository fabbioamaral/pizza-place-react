import { gql } from 'apollo-boost';

export const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $id: ID!
    $name: String
    $phone: String
    $notes: String
  ) {
    updateClient(
      input: {
        updateClientAttributes: {
          id: $id
          name: $name
          phone: $phone
          notes: $notes
        }
      }
    ) {
      status
    }
  }
`;
