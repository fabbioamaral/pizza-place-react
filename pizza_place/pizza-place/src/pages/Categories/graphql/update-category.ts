import { gql } from 'apollo-boost';

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String!) {
    updateCategory(
      input: { updateCategoryAttributes: { id: $id, name: $name } }
    ) {
      status
    }
  }
`;
