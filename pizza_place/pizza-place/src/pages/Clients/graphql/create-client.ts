import { gql } from 'apollo-boost';

export const CREATE_CLIENT = gql`
  mutation CreateClient(
    $name: String!
    $phone: String!
    $notes: String
    $street: String!
    $number: String!
    $suburbId: ID!
    $city: String!
    $additionalInfo: String
    $default: Boolean!
  ) {
    createClient(
      input: {
        addClientAttributes: {
          name: $name
          phone: $phone
          notes: $notes
          address: {
            street: $street
            number: $number
            additionalInfo: $additionalInfo
            suburbId: $suburbId
            city: $city
            default: $default
          }
        }
      }
    ) {
      status
    }
  }
`;
