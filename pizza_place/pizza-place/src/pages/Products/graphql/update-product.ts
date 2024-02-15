import { gql } from 'apollo-boost';

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $price: Float
    $categoryId: ID
    $size: String
  ) {
    updateProduct(
      input: {
        updateProductsAttributes: {
          id: $id
          name: $name
          price: $price
          categoryId: $categoryId
          size: $size
        }
      }
    ) {
      status
    }
  }
`;
