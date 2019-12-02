import styled from 'styled-components';
import theme from '../../shared/theme/index';
import { FlexRow } from '../../components/globals'
import Icon from '../../components/icon'

export const modalStyles = (maxWidth = 500) => {
  return {
    // dark background behind all modals
    overlay: {
      background: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'visible',
      overflowX: 'hidden',
      zIndex: 9998,
      padding: '1.2rem',
    },
    // modal root
    content: {
      position: 'relative',
      background: 'red',
      backgroundClip: 'padding-box',
      borderRadius: '5px',
      border: '0',
      padding: '0',
      zIndex: 9999,
      width: '100%',
      maxWidth: `${maxWidth}px`,
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      backgroundColor: 'rgba(0,0,0,0)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.40)',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
  };
};

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: ${theme.bg.default};
  overflow: visible;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  opacity: 0.8
`;

export const Header = styled.div`
  padding: 20px 24px 0;
  display: ${props => (props.noHeader ? 'none' : 'flex')};
  justify-content: space-between;
`;

export const Actions = styled(FlexRow)`
  margin-top: 24px;
  padding: 0 24px 24px;
  justify-content: flex-end;
  button + button {
    margin-left: 8px;
  }
`;

export const Wrapper = styled.div`
  padding: 0 24px 24px 24px;
`

export const Message = styled.div`
  line-height: 1.4;
  margin: 8px 24px;
  p {
    margin-top: 8px;
  }
  b {
    font-weight: 700;
  }
`;

export const CloseButton = styled(Icon)`
  position: absolute;
  right: 8px;
  top: 8px;
  color: ${theme.text.placeholder};
  &:hover {
    color: ${theme.warn.alt};
  }
`;


