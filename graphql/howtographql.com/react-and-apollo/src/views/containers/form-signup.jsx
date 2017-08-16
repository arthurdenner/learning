import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { get, isEmpty } from 'lodash/fp';
import { Button, Form, Icon, Input } from 'antd';
import { CREATE_USER_MUTATION } from '~/gql-queries';
import actions from '~/store/actions';
import styles from './login.less';

const rules = {
  rules: [{ required: true, message: 'Required field!' }],
};

class FormSignup extends PureComponent {
  static propTypes = {
    changeView: PropTypes.func.isRequired,
    createUserMutation: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  };

  handleSubmit = async () => {
    const { createUserMutation, form: { validateFields }, login } = this.props;
    let variables = {};

    validateFields((err, values) => {
      if (!err) {
        variables = values;
      }
    });

    if (!isEmpty(variables)) {
      const result = await createUserMutation({ variables });
      const data = get('data.signinUser', result);

      login(data);
    }
  }

  render() {
    const { changeView, form: { getFieldDecorator } } = this.props;

    return (
      <Form style={{ width: '100%' }}>
        <Form.Item hasFeedback label="Name">
          {getFieldDecorator('name', rules)(
            <Input
              prefix={<Icon type="user" />}
              placeholder="Name"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback label="E-mail">
          {getFieldDecorator('email', rules)(
            <Input
              prefix={<Icon type="mail" />}
              placeholder="E-mail"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback label="Password">
          {getFieldDecorator('password', rules)(
            <Input
              prefix={<Icon type="lock" />}
              placeholder="Password"
              type="password"
            />,
          )}
        </Form.Item>
        <Button
          type="primary"
          icon="login"
          onClick={this.handleSubmit}
        >
          Create an account
        </Button>
        <Button
          type="primary"
          icon="login"
          className={styles.button}
          onClick={changeView}
        >
          Login
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(actions.auth.login(data)),
});

export default graphql(
  CREATE_USER_MUTATION, { name: 'createUserMutation' },
)(connect(null, mapDispatchToProps,
)(Form.create()(FormSignup)));
