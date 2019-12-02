import styled from 'styled-components';
import theme from '../../../shared/theme';

export const Main = styled.div`
    margin-top: 50px;
    background: ${theme.bg.default};
    padding: 20px;
`;

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`;

export const Table= styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Td= styled.td`
    border: solid 1px black;
    text-align: center;
    padding: 5px 0;
`;

export const TdCenter= styled.td`
    text-align: center;
`;
export const Th= styled.th`
    border: solid 1px black;
    padding: 5px 0;
`;

export const Title= styled.div`
    width: 100%;
    text-align: center;
`;

export const Divider= styled.div`
    width: 100%;
    height: 50px;
`;

