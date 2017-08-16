import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { get } from 'lodash/fp';
import { Button, Input, Form } from 'antd';
import { ALL_LINKS_QUERY, CREATE_LINK_MUTATION } from '~/gql-queries';
import FlexElement from '~/views/components/flex-element';
import actions from '~/store/actions';
import * as selectors from '~/store/selectors';

const rules = {
  rules: [{ required: true, message: 'Required field!' }],
};

class CreateLink extends PureComponent {
  static propTypes = {
    createLinkMutation: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    postedById: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { handleClick } = this.props;

    handleClick('submit');
  }

  handleSubmit = async () => {
    const { createLinkMutation, form: { validateFields }, history, postedById } = this.props;

    if (!postedById) {
      // console.error('No user logged in');
      return;
    }

    validateFields((err, variables) => {
      if (!err) {
        createLinkMutation({
          variables: {
            ...variables,
            postedById,
          },
          update: (store, { data: { createLink } }) => {
            const data = store.readQuery({ query: ALL_LINKS_QUERY });

            data.allLinks.splice(0, 0, createLink);
            store.writeQuery({
              query: ALL_LINKS_QUERY,
              data,
            });
          },
        });
        history.push('/');
      } else {
        // console.log(err);
      }
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <FlexElement full column>
        <Form>
          <Form.Item hasFeedback label="Description">
            {getFieldDecorator('description', rules)(
              <Input placeholder="A description to the link" />,
            )}
          </Form.Item>
          <Form.Item hasFeedback label="URL">
            {getFieldDecorator('url', rules)(
              <Input placeholder="An url to the link" />,
            )}
          </Form.Item>
          <Button type="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </FlexElement>
    );
  }
}

const mapStateToProps = state => ({
  postedById: get('user.id', selectors.getUserData(state)),
});

const mapDispatchToProps = dispatch => ({
  handleClick: key => dispatch(actions.app.selectTab([key])),
});

export default graphql(
  CREATE_LINK_MUTATION, { name: 'createLinkMutation' },
)(connect(mapStateToProps, mapDispatchToProps,
)(Form.create()(CreateLink)));
