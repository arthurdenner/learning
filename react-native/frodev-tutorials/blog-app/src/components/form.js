import styled, { css } from 'styled-components/native';
import { FONTSIZES } from '~/constants';

export const FormContainer = styled.View`
  margin-bottom: 40px;
`;

export const TextInput = styled.TextInput`
  padding-vertical: 5px;
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

export const FormField = styled.View`
  margin-bottom: 24px;
`;

