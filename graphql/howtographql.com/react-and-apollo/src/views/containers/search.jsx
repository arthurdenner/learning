import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { Button, Input } from 'antd';
import FlexElement from '~/views/components/flex-element';
import { ALL_LINKS_SEARCH_QUERY } from '~/gql-queries';
import actions from '~/store/actions';
import Link from './link';
import styles from './search.less';

class Search extends PureComponent {
  static propTypes = {
    client: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
  };

  state = {
    links: [],
    search: '',
  };

  componentDidMount() {
    const { handleClick } = this.props;

    handleClick('search');
  }

  resetLinks = () => this.setState({ links: [] });

  handleSearch = async (searchText) => {
    const { client } = this.props;

    const result = await client.query({
      query: ALL_LINKS_SEARCH_QUERY,
      variables: { searchText },
    });

    const links = result.data.allLinks;

    this.setState({ links });
  }

  render() {
    const { links } = this.state;
    return (
      <div>
        <FlexElement>
          <Input.Search
            placeholder="Type something and hit Enter..."
            onSearch={this.handleSearch}
            className={styles.search}
          />
          <Button
            onClick={this.resetLinks}
            className={styles.reset}
          >
            Clear results
          </Button>
        </FlexElement>
        <FlexElement full column>
          {links.map((link, index) => (
            <Link
              link={link}
              key={link.id}
              index={index + 1}
              updateStoreAfterVote={this.updateCacheAfterVote}
            />
          ))}
        </FlexElement>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleClick: key => dispatch(actions.app.selectTab([key])),
});

export default connect(null, mapDispatchToProps)(withApollo(Search));
