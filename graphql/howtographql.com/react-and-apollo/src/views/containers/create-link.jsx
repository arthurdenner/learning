import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Button, Input, Form } from 'antd';
import { CREATE_LINK_MUTATION } from '~/gql-queries';
import FlexElement from '~/views/components/flex-element';
import actions from '~/store/actions';

const rules = {
  rules: [{ required: true, message: 'Required field!' }],
};

class CreateLink extends PureComponent {
  componentDidMount() {
    const { handleClick } = this.props;

    handleClick('item_2');
  }

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

CreateLink.propTypes = {
  createLinkMutation: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleClick: key => dispatch(actions.app.selectTab([key])),
});

export default graphql(
  CREATE_LINK_MUTATION, { name: 'createLinkMutation' },
)(connect(null, mapDispatchToProps,
)(Form.create()(CreateLink)));
