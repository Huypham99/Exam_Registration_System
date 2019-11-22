import styled from 'styled-components';
import theme from '../../shared/theme';
import { fontStack } from '../../components/globals/index'
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
    padding: 0 50px;
    background: ${theme.brand.default}
    border-radius: 5px;
    color: ${theme.text.reverse};
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