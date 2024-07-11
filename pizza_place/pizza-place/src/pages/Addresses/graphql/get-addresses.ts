import { gql } from '@apollo/client';

export const GET_ADDRESSES = gql`
  query GetAddresses($clientId: ID!) {
    addresses(clientId: $clientId) {
      additionalInfo
      city
      clientId
      default
      id
      number
      street
      suburbId
    }
  }
`;
