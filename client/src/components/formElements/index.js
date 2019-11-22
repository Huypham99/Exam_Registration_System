import * as React from 'react';
// import Icon from 'src/components/icon';

import {
  StyledLabel,
  StyledPrefixLabel,
  StyledInput,
  StyledTextArea,
  StyledUnderlineInput,
  StyledError,
  StyledSuccess,
} from './style';

export const Input = (props) => {
  return (
    <StyledLabel {...props}>
      {props.children}
      <StyledInput
        id={props.id}
        type={props.inputType}
        defaultValue={props.defaultValue}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        data-cy={props.dataCy}
      />
    </StyledLabel>
  );
};


export const TextArea = (props: InputProps) => {
  return (
    <StyledLabel>
      {props.children}
      <StyledTextArea
        id={props.id}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        data-cy={props.dataCy}
      />
    </StyledLabel>
  );
};

export class UnderlineInput extends React.Component<InputProps> {
  render() {
    return (
      <StyledPrefixLabel disabled={this.props.disabled}>
        {this.props.children}
        <StyledUnderlineInput
          type="text"
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.props.value || this.props.defaultValue}
          onChange={this.props.onChange}
          autoFocus={this.props.autoFocus}
          disabled={this.props.disabled}
          data-cy={this.props.dataCy}
        />
      </StyledPrefixLabel>
    );
  }
}

export const Error = (props: Object) => {
  const { children, ...rest } = props;
  return <StyledError {...rest}>{children}</StyledError>;
};

export const Success = (props: Object) => {
  const { children, ...rest } = props;
  return <StyledSuccess {...rest}>{children}</StyledSuccess>;
};