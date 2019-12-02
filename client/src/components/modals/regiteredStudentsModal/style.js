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
`;

export const Table= styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 17px;
`;

export const Td= styled.td`
    border: solid 2px ${theme.bg.border};
    text-align: center;
    padding: 5px 0;
`;


export const Th= styled.th`
    border: solid 2px ${theme.bg.border};
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

