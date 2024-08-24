import { gql } from '@apollo/client';

export const GET_PAYMENT_METHODS = gql`
  query GetPaymentMethods {
    paymentMethods {
      id
      name
    }
  }
`;
