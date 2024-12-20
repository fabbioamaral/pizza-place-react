import { gql } from '@apollo/client';

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      phone
      addresses {
        street
        number
        city
        additionalInfo
        default
      }
    }
  }
`;
