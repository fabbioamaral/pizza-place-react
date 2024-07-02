import { gql } from 'apollo-boost';

export const CREATE_ADDRESS = gql`
  mutation CreateAddress(
    $street: String!
    $number: String!
    $suburbId: ID!
    $clientId: ID!
    $additionalInfo: String
    $isDefault: Boolean!
  ) {
    createAddress(
      input: {
        addAddressAttributes: {
          street: $street
          number: $number
          suburbId: $suburbId
          clientId: $clientId
          additionalInfo: $additionalInfo
          default: $isDefault
        }
      }
    ) {
      status
      id
    }
  }
`;
