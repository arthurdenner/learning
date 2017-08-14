import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form } from 'antd';
import { graphql } from 'react-apollo';
import { CREATE_LINK_MUTATION } from '~/gql-queries';
import FlexElement from '~/views/components/flex-element';

const rules = {
  rules: [{ required: true, message: 'Required field!' }],
};

const styles = {
  container: {
    padding: '0 10px',
  },
};

class CreateLink extends PureComponent {
  handleSubmit = async () => {
    const { form: { validateFields }, createLinkMutation } = this.props;

    validateFields((err, variables) => {
      if (!err) {
        createLinkMutation({ variables });
      } else {
        console.log(err);
      }
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <FlexElement full column style={styles.container}>
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
            Create link
          </Button>
        </Form>
      </FlexElement>
    );
  }
}

CreateLink.propTypes = {
  createLinkMutation: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default graphql(
  CREATE_LINK_MUTATION, { name: 'createLinkMutation' },
)(Form.create()(CreateLink));
