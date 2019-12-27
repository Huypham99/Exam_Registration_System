import styled from 'styled-components';
import { theme } from '../../shared/theme'
import { FlexRow } from '../../components/globals'

export const TextWrapper = styled.div`
    padding: 5px;
    text-align: center;
    margin-top: 1px;
`;

export const Title = styled.div`
    font-size: 25px;
    font-weight: 500;
    padding: 15px;
    margin: 15px 0;
    border-radius: 4px;
    color: ${theme.text.reverse};
    background: ${props => props.registered ? 'green' : theme.brand.dark}
`

export const Row = styled(FlexRow)`
    padding: 10px 0;
    justify-content: space-around;
`
