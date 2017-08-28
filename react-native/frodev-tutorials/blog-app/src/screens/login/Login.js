import React from 'react';
import {
  Button,
  FormContainer,
  FormField,
  LoginWrapper,
  TextInput,
  Title,
} from '~/components';
import { SCREENS } from '~/constants';

const Login = ({ navigation: { navigate } }) => (
  <LoginWrapper>
    <Title h4>
      Sign in to start blogging
    </Title>

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

    <Button
      info
      title={'Login'}
      onPress={() => navigate(SCREENS.BLOGS)}
    />
  </LoginWrapper>
);

export default Login;
