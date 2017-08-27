import styled from 'styled-components/native';
import { COLORS } from '~/constants';

export const Container = styled.View`
  flex: 1;
  padding-top: 10px;
  padding-horizontal: 15px;
  background-color: ${COLORS.BACKGROUND};
`;

export const LoginWrapper = styled(Container)`
  padding-horizontal: 50px;
  padding-top: 77px;
`;
