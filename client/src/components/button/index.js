import React from 'react';
import {
    A,
    StyledLink,
    StyledButton,
    StyledWhiteIconButton,
    StyledWhiteButton,
    StyledPrimaryButton,
    StyledWarnButton,
    StyledOutlineButton,
    StyledHoverWarnOutlineButton,
    StyledPrimaryOutlineButton,
    StyledWhiteOutlineButton,
    StyledTextButton
} from './style';

const handleLinkWrapping = (Component, props) => {
    const { href, to, target, children, disabled, isLoading, ...rest } = props;
    const button = (
        <Component disabled={disabled || isLoading} {...rest}>
            {children}
        </Component>
    );

    if (href)
        return (
            <A
                href={href}
                target={target || '_blank'}
                rel={!target ? 'noopener noreferrer' : undefined}
            >
                {button}
            </A >
        );
    if (to) return <StyledLink to={to}>{button}</StyledLink>;
    return button;
};


export const Button = (props) => handleLinkWrapping(StyledButton, props);

export const WhiteIconButton = (props) =>
    handleLinkWrapping(StyledWhiteIconButton, props);

export const WhiteButton = (props) =>
    handleLinkWrapping(StyledWhiteButton, props);

export const PrimaryButton = (props) =>
    handleLinkWrapping(StyledPrimaryButton, props);

export const WarnButton = (props) =>
    handleLinkWrapping(StyledWarnButton, props);

export const OutlineButton = (props) =>
    handleLinkWrapping(StyledOutlineButton, props);

export const PrimaryOutlineButton = (props) =>
    handleLinkWrapping(StyledPrimaryOutlineButton, props);

export const WhiteOutlineButton = (props) =>
    handleLinkWrapping(StyledWhiteOutlineButton, props);

export const HoverWarnOutlineButton = (props) =>
    handleLinkWrapping(StyledHoverWarnOutlineButton, props);

export const TextButton = (props) =>
    handleLinkWrapping(StyledTextButton, props);
