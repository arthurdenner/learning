import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, gql } from 'react-apollo';
import { getOr } from 'lodash/fp';
import { ALL_LINKS_QUERY } from '~/gql-queries';
import FlexElement from '~/views/components/flex-element';
import actions from '~/store/actions';
import Link from './link';

class Links extends PureComponent {
  static propTypes = {
    allLinksQuery: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    allLinksQuery: {},
  };

  componentDidMount() {
    const { handleClick } = this.props;

    this.subscribeToNewLinks();
    handleClick('links');
  }

  updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: ALL_LINKS_QUERY });
    const votedLink = data.allLinks.find(link => link.id === linkId);

    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: ALL_LINKS_QUERY, data });
  }

  subscribeToNewLinks = () => {
    const { allLinksQuery } = this.props;

    allLinksQuery.subscribeToMore({
      document: gql`
        subscription {
          Link(filter: {
            mutation_in: [CREATED]
          }) {
            node {
              id
              url
              description
              createdAt
              postedBy {
                id
                name
              }
              votes {
                id
                user {
                  id
                }
              }
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newAllLinks = [
          subscriptionData.data.Link.node,
          ...previous.allLinks,
        ];
        const result = {
          ...previous,
          allLinks: newAllLinks,
        };

        return result;
      },
    });
  }

  render() {
    const { allLinksQuery } = this.props;

    if (allLinksQuery && allLinksQuery.loading) {
      return <p>Loading...</p>;
    }

    if (allLinksQuery && allLinksQuery.error) {
      return <p>An error occured!</p>;
    }

    const allLinks = getOr([], 'allLinks', allLinksQuery);

    return (
      <FlexElement full column>
        {allLinks.map((link, index) => (
          <Link
            link={link}
            key={link.id}
            index={index + 1}
            updateStoreAfterVote={this.updateCacheAfterVote}
          />
        ))}
      </FlexElement>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleClick: key => dispatch(actions.app.selectTab([key])),
});

export default graphql(
  ALL_LINKS_QUERY, { name: 'allLinksQuery' },
)(connect(null, mapDispatchToProps,
)(Links));
