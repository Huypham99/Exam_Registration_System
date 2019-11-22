import styled from 'styled-components';
import theme from '../../shared/theme';
import { fontStack } from '../../components/globals';
import { tint } from '../../components/globals';

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  border: 1px solid ${theme.bg.inactive};
  background: ${theme.bg.default};
  margin-bottom: 16px;
  padding: 35px;
  width: 450px;
  ${fontStack}
`

export const Title = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  margin-bottom: 25px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-transform: Capitalize;
  color: ${theme.text.reverse};
  background: ${theme.brand.alt};
  background-image: ${`linear-gradient(to bottom, ${theme.brand.alt}, ${tint(theme.brand.alt, -8)})`
  };
`

export const Form = styled.div`
  max-width: 100%;
`;

export const BtnWarapper = styled.div`
  margin-top: 25px;
  width: 100%;
`
