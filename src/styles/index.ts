import styled from 'styled-components';
import { Theme } from './theme';

export const AppContainer = styled.div`
  align-items: flex-start;
  background-color: ${Theme.color.primary};
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  padding: 1.2rem;
  width: 100%;
`;
