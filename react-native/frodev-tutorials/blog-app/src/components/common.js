import styled from 'styled-components/native';
import { COLORS } from '~/constants';

export const Divider = styled.View`
  height: 1px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.GRAY};
  margin-bottom: 16px;
  margin-top: 16px;
`;
