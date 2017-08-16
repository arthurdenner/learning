import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Button } from 'antd';
import { LINKS_PER_PAGE } from '~/constants';
import { ALL_LINKS_QUERY, SUBSCRIBE_NEW_LINKS, SUBSCRIBE_NEW_VOTES } from '~/gql-queries';
import FlexElement from '~/views/components/flex-element';
import actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import Link from './link';
import styles from './links.less';

class Links extends PureComponent {
  static propTypes = {
    allLinksQuery: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    allLinksQuery: {},
  };

  componentDidMount() {
    const { handleClick, location } = this.props;

    const isNewPage = location.pathname.includes('new');

    this.subscribeToNewLinks();
    this.subscribeToNewVotes();

    if (isNewPage) {
      handleClick('links');
    } else {
      handleClick('top');
    }
  }

  getLinksToRender = (isNewPage) => {
    const { allLinksQuery } = this.props;

    if (isNewPage) {
      return allLinksQuery.allLinks;
    }

    const rankedLinks = allLinksQuery.allLinks.slice();
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);

    return rankedLinks;
  }

  updateCacheAfterVote = (store, createVote, linkId) => {
    const { location, match } = this.props;
    const isNewPage = location.pathname.includes('new');
    const page = parseInt(match.params.page, 10);
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const first = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? 'createdAt_DESC' : null;
    const data = store.readQuery({ query: ALL_LINKS_QUERY, variables: { first, skip, orderBy } });

    const votedLink = data.allLinks.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: ALL_LINKS_QUERY, data });
  }

  subscribeToNewLinks = () => {
    const { allLinksQuery } = this.props;

    allLinksQuery.subscribeToMore({
      document: SUBSCRIBE_NEW_LINKS,
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

  subscribeToNewVotes = () => {
    const { allLinksQuery } = this.props;

    allLinksQuery.subscribeToMore({
      document: SUBSCRIBE_NEW_VOTES,
      updateQuery: (previous, { subscriptionData }) => {
        const votedLinkIndex = previous.allLinks.findIndex(link =>
          link.id === subscriptionData.data.Vote.node.link.id);
        const link = subscriptionData.data.Vote.node.link;
        const newAllLinks = previous.allLinks.slice();
        newAllLinks[votedLinkIndex] = link;
        const result = {
          ...previous,
          allLinks: newAllLinks,
        };

        return result;
      },
    });
  }

  nextPage = () => {
    const { allLinksQuery, history, match } = this.props;
    const page = parseInt(match.params.page, 10);

    if (page <= allLinksQuery._allLinksMeta.count / LINKS_PER_PAGE) {
      const nextPage = page + 1;
      history.push(`/new/${nextPage}`);
    }
  }

  previousPage = () => {
    const { history, match } = this.props;
    const page = parseInt(match.params.page, 10);

    if (page > 1) {
      const previousPage = page - 1;
      history.push(`/new/${previousPage}`);
    }
  }

  render() {
    const { allLinksQuery, location, match } = this.props;

    if (allLinksQuery && allLinksQuery.loading) {
      return <p>Loading...</p>;
    }

    if (allLinksQuery && allLinksQuery.error) {
      return <p>An error occured!</p>;
    }

    const page = parseInt(match.params.page, 10);
    const isNewPage = location.pathname.includes('new');
    const allLinks = this.getLinksToRender(isNewPage);
    const numRecords = allLinksQuery._allLinksMeta.count;
    const hasMorePages = match.params.page * LINKS_PER_PAGE < numRecords;

    return (
      <FlexElement full column>
        {allLinks.map((link, index) => (
          <Link
            link={link}
            key={link.id}
            index={isNewPage ?
              (page * LINKS_PER_PAGE) + (index - (LINKS_PER_PAGE - 1)) :
              index + 1}
            updateStoreAfterVote={this.updateCacheAfterVote}
          />
        ))}
        {isNewPage && numRecords > LINKS_PER_PAGE &&
          <div>
            {match.params.page > 1 && (
              <Button onClick={this.previousPage}>
                Previous
              </Button>
            )}
            {hasMorePages && (
              <Button onClick={this.nextPage} className={styles.button}>
                Next
              </Button>
            )}
          </div>
          }
      </FlexElement>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: selectors.getUserData(state),
});

const mapDispatchToProps = dispatch => ({
  handleClick: key => dispatch(actions.app.selectTab([key])),
});

export default graphql(ALL_LINKS_QUERY, {
  name: 'allLinksQuery',
  options: ({ location, match }) => {
    const page = parseInt(match.params.page, 10);
    const isNewPage = location.pathname.includes('new');
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const first = isNewPage ? LINKS_PER_PAGE : 10;
    const orderBy = isNewPage ? 'createdAt_DESC' : null;

    return {
      variables: { first, skip, orderBy },
    };
  },
})(connect(mapStateToProps, mapDispatchToProps,
)(Links));
