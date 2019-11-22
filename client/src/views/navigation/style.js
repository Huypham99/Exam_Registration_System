import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../shared/theme';
import { fontStack } from '../../components/globals/index'
import {
  MEDIA_BREAK,
  NAVBAR_WIDTH,
  NAVBAR_EXPANDED_WIDTH,
  MIN_WIDTH_TO_EXPAND_NAVIGATION,
} from '../../components/layout/index';

export const Overlay = styled.div`
  position: fixed;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998 /* on top of titlebar */;
  background: rgba(0, 0, 0, 0.4);
`;


export const NavigationWrapper = styled.div`
  grid-area: navigation;
  position: sticky;
  top: 0;
  width: ${NAVBAR_WIDTH}px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  background: red;

  @media (max-width: ${MEDIA_BREAK}px) {
    display: ${props => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 9997;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.16);
  }
  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    width: ${NAVBAR_EXPANDED_WIDTH}px;
  }
`;

export const NavigationGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  grid-template-rows: auto;
  height: 100%;
  background: ${theme.bg.default};
  border-right: 1px solid ${theme.bg.border};
  position: fixed;
  top: 0;
  width: 100%;
  max-width: ${NAVBAR_WIDTH}px;
  overflow: hidden;
  overflow-y: auto;
  padding: 12px 0 16px;

  @media (max-width: ${MEDIA_BREAK}px) {
    position: fixed;
    top: 0;
    z-index: 9999 /* on top of overlay and titlebar */;
    width: 100%;
    max-width: ${NAVBAR_EXPANDED_WIDTH}px;
    grid-gap: 0px;
    padding: 12px 0;
  }
  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    z-index: 9999 /* on top of overlay and titlebar */;
    width: 100%;
    max-width: ${NAVBAR_EXPANDED_WIDTH}px;
    grid-gap: 0px;
    padding: 12px 0;
  }
`;

export const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  color: ${props => (props.isActive ? theme.text.default : theme.text.secondary)};
  &:hover {
    box-shadow: inset 5px 0 0 ${props => (props.isActive ? theme.brand.default : theme.brand.reverse)};
  }
`;

export const AvatarLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  text-decoration: none;
  color: inherit;
  @media (max-width: ${MEDIA_BREAK}px) {
    flex-direction: row;
    justify-content: flex-start;
    padding: 8px 20px 8px 12px;
  }
  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    flex-direction: row;
    justify-content: flex-start;
    padding: 8px 20px 8px 12px;
  }
`;

export const Label = styled.span`
  font-size: 17px;
  font-weight: 600;
  margin-left: 12px;
  padding-right: 12px;
  display: none;
  letter-spacing: 1px;
  ${fontStack}
  @media (max-width: ${MEDIA_BREAK}px) {
    display: block;
  }
  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    display: block;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  opacity: 1;
  position: relative;
  padding: 10px;
  color: inherit;
  @media (max-width: ${MEDIA_BREAK}px) {
    padding: 10px;
  }
  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    padding: 10px;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: ${theme.bg.border};
`;

export const ActionsRowContainer = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 12px;
  padding: 16px 16px 20px;
  margin-top: 8px;
  button {
    flex: 1;
  }
  @media (max-width: ${MEDIA_BREAK}px) {
    border-bottom: 1px solid ${theme.bg.border};
    margin-top: 0;
    padding-bottom: 16px;
  }
`;