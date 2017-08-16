import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Icon } from 'antd';
import { get } from 'lodash/fp';
import FlexElement from '~/views/components/flex-element';
import timeDifferenceForDate from '~/helpers/time-difference';
import { CREATE_VOTE_MUTATION } from '~/gql-queries';
import * as selectors from '~/store/selectors';
import styles from './link.less';

const alreadyVoted = (link, userId) => {
  const voterIds = link.votes.map(vote => vote.user.id);

  return voterIds.includes(userId);
};

class Link extends PureComponent {
  static propTypes = {
    createVoteMutation: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isUserLogged: PropTypes.bool.isRequired,
    link: PropTypes.object.isRequired,
    updateStoreAfterVote: PropTypes.func,
    userId: PropTypes.string,
  };

  static defaultProps = {
    updateStoreAfterVote: () => 0,
    userId: '',
  };

  voteForLink = async () => {
    const { createVoteMutation, link, updateStoreAfterVote, userId } = this.props;

    if (alreadyVoted(link, userId)) {
      // console.log(`User (${userId}) already voted for this link.`);
      return;
    }

    const linkId = link.id;
    await createVoteMutation({
      variables: {
        userId,
        linkId,
      },
      update: (store, { data: { createVote } }) => {
        updateStoreAfterVote(store, createVote, linkId);
      },
    });
  };

  render() {
    const { index, isUserLogged, link, userId } = this.props;
    const hasUserVoted = alreadyVoted(link, userId);

    return (
      <FlexElement className={styles.container}>
        <div>
          <span className={styles.span}>{index}.</span>
          {isUserLogged && (
            <Icon
              type="caret-up"
              className={hasUserVoted ? styles.iconVoted : styles.icon}
              onClick={hasUserVoted ? null : this.voteForLink}
            />
          )}
        </div>
        <div>
          <p>{`${link.description} - ${link.url}`}</p>
          <p>{`${link.votes.length} votes | by ${link.postedBy ? link.postedBy.name : 'Unknown'}
            - ${timeDifferenceForDate(link.createdAt)}`}</p>
        </div>
      </FlexElement>
    );
  }
}

const mapStateToProps = state => ({
  isUserLogged: selectors.isUserLogged(state),
  userId: get('user.id', selectors.getUserData(state)),
});

export default graphql(
  CREATE_VOTE_MUTATION, { name: 'createVoteMutation' },
)(connect(mapStateToProps)(Link));
