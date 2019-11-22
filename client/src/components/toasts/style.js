import theme from '../../shared/theme';
import styled, { keyframes } from 'styled-components';
import { MEDIA_BREAK } from '../layout';

export const ToastsContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 50px 60px;
  width: 100%;
  display: ${props => props.isOpen ? 'block' : 'none'};
  display: flex;
  flex-direction: column;
  max-width: 400px;
  background: transparent;
  z-index: 9997;
  @media (max-width: ${MEDIA_BREAK}px) {
    /* titlebars are ~56px */
    top: 60px;
    left: 0;
    right: 0;
    max-width: 100%;
  }
`;

// TODO: refine toast styling
const myFrame = keyframes`
0% {
    opacity: 0;
    transform: translateY(8px);
  }
  5% {
    opacity: 1;
    transform: translateY(0px);
  }
  95% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-4px);
  }
`

const Toast = styled.div`
  border-radius: 4px;
  padding: 10px 12px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  display: block;
  opacity: 0;
  margin-bottom: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  position: relative;
  animation: ${myFrame} 6s ease-in-out;
`;

export const ErrorToast = styled(Toast)`
  background-color: ${theme.warn.wash};
  border: solid 1px ${theme.warn.default};
  color: ${theme.warn.default};
`;

export const SuccessToast = styled(Toast)`
  background-color: ${theme.success.default};
`;

export const NeutralToast = styled(Toast)`
  background-color: ${theme.text.alt};
`;

export const NotificationToast = styled(Toast)`
  background-color: ${theme.bg.default};
  color: ${theme.text.secondary};
`;