import { gql } from 'apollo-boost';

export const CREATE_CATEGORY = gql`
    mutation CreateCategory($name: String!) {
        createCategory(input: {
          addCategoryAttributes:{
            name: $name
          }
        }
        ) {
      status
        }
      }     
`;