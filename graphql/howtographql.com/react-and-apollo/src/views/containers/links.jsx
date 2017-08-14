import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
import { map } from 'lodash/fp';
import FlexElement from '~/views/components/flex-element';
import Link from '~/views/components/link';

const ALL_LINKS_QUERY = gql`
  query allLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`;

const Links = ({ allLinksQuery }) => {
  if (allLinksQuery && allLinksQuery.loading) {
    return <p>Loading...</p>;
  }

  if (allLinksQuery && allLinksQuery.error) {
    return <p>An error occured!</p>;
  }

  const { allLinks } = allLinksQuery;

  return (
    <FlexElement full column>
      {map(link => (
        <Link link={link} key={link.id} />
      ), allLinks)}
    </FlexElement>
  );
};

Links.propTypes = {
  allLinksQuery: PropTypes.object,
};

Links.defaultProps = {
  allLinksQuery: {},
};

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(Links);
