import { gql } from 'react-apollo';

export const ALL_LINKS_QUERY = gql`
  query allLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`;

export const CREATE_LINK_MUTATION = gql`
  mutation createLinkMutation($description: String!, $url: String!) {
      createLink(
        description: $description,
        url: $url,
      ) {
        id
        createdAt
        url
        description
      }
    }
`;
