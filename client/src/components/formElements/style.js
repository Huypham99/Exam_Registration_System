import styled, { css } from 'styled-components';
import theme from '../../shared/theme';
import { Transition, hexa, zIndex } from '../globals';
import Textarea from 'react-textarea-autosize';

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 12px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.4px;
  color: ${theme.text.alt};
  transition: ${Transition.hover.off};
  position: relative;
  a {
    text-decoration: underline;
  }
  &:hover > input,
  &:hover > textarea {
    border-color: ${props =>
        props.disabled ? theme.bg.border : theme.text.alt};
    transition: ${Transition.hover.on};
  }
  &:hover > input:focus,
  &:hover > textarea:focus {
    border-color: ${props =>
        props.disabled ? theme.bg.inactive : theme.brand.alt};
  }
`;

export const StyledInput = styled.input`
  flex: 1 0 auto;
  background: ${props =>
        props.disabled ? theme.bg.wash : theme.bg.default};
  font-weight: 500;
  font-size: 14px;
  border: 2px solid
    ${props =>
        props.disabled ? theme.bg.border : theme.bg.inactive};
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 2px;
  box-shadow: none;
  outline: none;
  transition: ${Transition.hover.off};
  ${props =>
        props.type === 'checkbox' &&
        css`
      flex: initial;
      width: initial;
      margin-right: 0.5em;
    `} &::placeholder {
    color: ${theme.text.placeholder};
  }
  &::-webkit-input-placeholder {
    color: ${theme.text.placeholder};
  }
  &:-moz-placeholder {
    color: ${theme.text.placeholder};
  }
  &:-ms-input-placeholder {
    color: ${theme.text.placeholder};
  }
  &:focus {
    border-color: ${theme.brand.default};
    transition: ${Transition.hover.on};
  }
  &[type='file'] {
    position: absolute;
    left: -9999px;
    top: -9999px;
    visibility: hidden;
  }
`;


export const StyledError = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${theme.warn.default};
  border: solid 1px ${theme.warn.alt};
  border-radius: 4px;
  background: ${theme.warn.wash}
  margin-top: 15px;
  padding: 8px;
  font-weight: 600;
  a {
    text-decoration: underline;
  }
`;

export const StyledSuccess = styled.p`
  font-size: 14px;
  color: ${theme.success.default};
  padding: 8px 0 16px;
  line-height: 1.4;
  font-weight: 600;
`;

export const InputOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${zIndex.form + 2};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${theme.text.reverse};
  background-color: ${({ theme }) => hexa(theme.bg.reverse, 0.6)};
  padding: 8px;
  border-radius: ${props =>
        props.type === 'user' ? `${props.size}px` : '8px'};
  opacity: ${props => (props.visible ? '1' : '0')};
  transition: ${Transition.hover.off};
  &:hover {
    opacity: 1;
    transition: ${Transition.hover.on};
    + img,
    + div {
      transition: ${Transition.hover.on};
      opacity: 0.25;
    }
  }
  &:hover div {
    transition: ${Transition.hover.on};
  }
`;

export const Select = styled.select`
  margin-top: 10px;
  padding:  10px 20px;
  border: solid 2px ${theme.bg.inactive};
  background: ${theme.bg.wash};
  font-size: 17px;
  color: ${theme.text.placeholder};
  border-radius: 4px;
  outline: none;
  &:hover{
    border-color: ${theme.text.alt};
    transition: ${Transition.hover.on};
  }
  &:focus{
    border-color: ${theme.brand.alt};
    transition: ${Transition.hover.on};
  }
`

export const InputDate = styled.input`
  margin-top: 10px;
  padding:  8px 20px;
  border: solid 2px ${theme.bg.inactive};
  background: ${theme.bg.wash};
  font-size: 17px;
  color: ${theme.text.placeholder};
  border-radius: 4px;
  outline: none;
  &:hover{
    border-color: ${theme.text.alt};
    transition: ${Transition.hover.on};
  }
  &:focus{
    border-color: ${theme.brand.alt};
    transition: ${Transition.hover.on};
  }
`

export const Option = styled.option`
  color: ${theme.text.placeholder};
  border-radius: 4px;
  border: solid 2px ${theme.bg.inactive};
`