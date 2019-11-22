import styled from 'styled-components';
import theme from '../../shared/theme';
import { fontStack } from '../../components/globals/index'

export const Container = styled.div`
    padding: 0 30px;
`

export const TitleWrapper = styled.div`
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
export const TitleActions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 350px;
`
export const CreateButton = styled.div`
    position: relative;
    max-width: 200px;
`
export const Main = styled.div`
    margin: 20px 0;
    height: auto;
    background: ${theme.bg.default};
    border: solid 1px ${theme.bg.border};
    border-radius: 5px;
    padding: 20px 20px;
    ${fontStack}
`