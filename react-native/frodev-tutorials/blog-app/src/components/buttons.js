import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { COLORS } from '~/constants';

const ButtonWrapper = styled.View`
  padding-vertical: 20px;
  flex-direction: column;
  align-items: center;
  border-radius: 100px;
  ${({ info }) => info && css`
    background-color: ${COLORS.BLUE};
  `}
`;

const ButtonText = styled.Text`
  color: white;
`;

export const Button = ({ title, onPress, ...otherProps }) => (
  <TouchableOpacity onPress={onPress}>
    <ButtonWrapper {...otherProps}>
      <ButtonText>{title}</ButtonText>
    </ButtonWrapper>
  </TouchableOpacity>
);
