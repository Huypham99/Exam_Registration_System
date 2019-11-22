import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../shared/theme';
import { fontStack } from '../../components/globals/index'

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

export const Label = styled.label`
  display: flex;
  flex-direction: column;
`;
