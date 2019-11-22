import styled from 'styled-components';
import {
  MEDIA_BREAK,
  TITLEBAR_HEIGHT,
  NAVBAR_WIDTH,
  NAVBAR_EXPANDED_WIDTH,
  MIN_WIDTH_TO_EXPAND_NAVIGATION,
} from '../../components/layout/index';

export const StyledAppViewWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: ${NAVBAR_WIDTH}px 1fr;
  grid-template-areas: 'navigation main';
  @media (max-width: ${MEDIA_BREAK}px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    grid-template-columns: ${NAVBAR_EXPANDED_WIDTH}px 1fr;
    grid-template-areas: 'navigation main';
  }
`;