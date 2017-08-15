import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { map } from 'lodash/fp';
import { ALL_LINKS_QUERY } from '~/gql-queries';
import FlexElement from '~/views/components/flex-element';
import Link from '~/views/components/link';
import actions from '~/store/actions';

class Links extends PureComponent {
  componentDidMount() {
    const { handleClick } = this.props;

    handleClick('item_1');
  }

  render() {
    const { allLinksQuery } = this.props;

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
  }
}

Links.propTypes = {
  allLinksQuery: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
};

Links.defaultProps = {
  allLinksQuery: {},
};

const mapDispatchToProps = dispatch => ({
  handleClick: key => dispatch(actions.app.selectTab([key])),
});

export default graphql(
  ALL_LINKS_QUERY, { name: 'allLinksQuery' },
)(connect(null, mapDispatchToProps,
)(Links));
