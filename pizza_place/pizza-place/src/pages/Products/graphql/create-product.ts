import { gql } from 'apollo-boost';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $price: Float!
    $categoryId: ID!
    $size: String!
  ) {
    createProduct(
      input: {
        addProductsAttributes: {
          name: $name
          price: $price
          categoryId: $categoryId
          size: $size
        }
      }
    ) {
      status
      id
    }
  }
`;
