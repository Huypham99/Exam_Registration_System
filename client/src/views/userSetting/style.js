import styled from 'styled-components';
import theme from '../../shared/theme';
import { fontStack } from '../../components/globals'

export const Container = styled.div`
    ${fontStack}
    margin: 0 50px;
    background: ${theme.bg.default};
    padding: 20px;
`;

export const Divider= styled.div`
    width: 100%;
    height: 1px;
    background: ${theme.bg.border};
`;