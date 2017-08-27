import React from 'react';
import styled, { css } from 'styled-components/native';
import { FONTSIZES } from '~/constants';

export const Text = styled.Text`
  ${({ h1 }) => h1 && css`
    font-size: ${FONTSIZES.H1};
  `}
  ${({ h2 }) => h2 && css`
    font-size: ${FONTSIZES.H2};
  `}
  ${({ h3 }) => h3 && css`
    font-size: ${FONTSIZES.H3};
  `}
  ${({ h4 }) => h4 && css`
    font-size: ${FONTSIZES.H4};
  `}
`;

export const Title = styled(Text)`
  margin-bottom: 56px;
`;
