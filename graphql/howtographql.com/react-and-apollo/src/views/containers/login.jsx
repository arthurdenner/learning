import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import FlexElement from '~/views/components/flex-element';
import actions from '~/store/actions';
import FormLogin from './form-login';
import FormSignup from './form-signup';

class Login extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
  };

  state = {
    isLogging: true,
  };

  componentDidMount() {
    const { handleClick } = this.props;

    handleClick('login');
  }

  handleChangeView = () => this.setState({
    isLogging: !this.state.isLogging,
  })

  render() {
    const { isLogging } = this.state;

    return (
      <FlexElement full column>
        {isLogging ? (
          <FormLogin changeView={this.handleChangeView} />
        ) : (
          <FormSignup changeView={this.handleChangeView} />
        )}
      </FlexElement>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleClick: key => dispatch(actions.app.selectTab([key])),
});

export default connect(null, mapDispatchToProps)(Login);
