import styled from 'styled-components';
import theme from '../../shared/theme';
import { boxShadow } from '../../components/globals/index'

export const UploadExcelForm = styled.div`
    position: absolute;
    top: 50px;
    max-width: 500px;
    height: 150px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    visibility: ${props => (props.display === 'true' ? 'visible' : 'hidden')};
    border-radius: 5px;
    background: ${theme.bg.default};
    color: ${theme.text.default};
    border: solid 1px ${theme.bg.border};
    z-index: 100;
    ${boxShadow}
`

export const UploadButton = styled.div`
    position: relative;
    max-width: 200px;
`
