import styled from 'styled-components';
import theme from '../../shared/theme';
import { fontStack, FlexRow } from '../../components/globals'
import { Link } from 'react-router-dom';

export const Main = styled.div`
    margin: 20px;
    height: auto;
    background: ${theme.bg.default};
    border: solid 1px ${theme.bg.border};
    border-radius: 5px;
    padding: 20px 20px;
    ${fontStack}
`

export const ElementWrapper = styled.div`
    ${fontStack}
    display: flex;
    flex-direction: row;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    padding: 0 30px;
    background: ${theme.brand.default};
    color: ${theme.text.reverse};
`

export const Divider = styled.div`
  height: 1px;
  background: ${theme.bg.border};
`;

export const Flex = styled(FlexRow)`
  align-items: center;
  justify-content: space-evenly;
`

export const StyledLink = styled(Link)`
  display: flex;
  flex: none;
  align-items: center;
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;