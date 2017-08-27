import React from 'react';
import {
  Button,
  FormContainer,
  FormField,
  LoginWrapper,
  TextInput,
  Title,
} from '~/components';

const Login = () => (
  <LoginWrapper>
    <Title h4>Sign in to start blogging</Title>

    <FormContainer>
      <FormField>
        <TextInput
          placeholder={'Email address'}
          keyboardType={'email-address'}
        />
      </FormField>
      <FormField>
        <TextInput
          placeholder={'Password'}
          secureTextEntry
        />
      </FormField>
    </FormContainer>

    <Button info title={'Login'} />
  </LoginWrapper>
);

export default Login;
