import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { get, isEmpty } from 'lodash/fp';
import { Button, Form, Icon, Input } from 'antd';
import { SIGNIN_USER_MUTATION } from '~/gql-queries';
import actions from '~/store/actions';
import styles from './login.less';

const rules = {
  rules: [{ required: true, message: 'Required field!' }],
};

class FormLogin extends PureComponent {
  static propTypes = {
    changeView: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    signinUserMutation: PropTypes.func.isRequired,
  };

  handleSubmit = async () => {
    const { form: { validateFields }, login, signinUserMutation } = this.props;

    let variables = {};

    validateFields((err, values) => {
      if (!err) {
        variables = values;
      }
    });

    if (!isEmpty(variables)) {
      const result = await signinUserMutation({ variables });
      const data = get('data.signinUser', result);

      login(data);
    }
  }

  render() {
    const { changeView, form: { getFieldDecorator } } = this.props;

    return (
      <Form style={{ width: '100%' }}>
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
          Login
        </Button>
        <Button
          type="primary"
          icon="login"
          className={styles.button}
          onClick={changeView}
        >
          Create an account
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(actions.auth.login(data)),
});

export default graphql(
  SIGNIN_USER_MUTATION, { name: 'signinUserMutation' },
)(connect(null, mapDispatchToProps,
)(Form.create()(FormLogin)));
