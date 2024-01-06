import { gql } from 'apollo-boost';

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(input: { id: $id }) {
      status
    }
  }
`;
