import React from 'react';
import { ModalBody, Header, Title } from './style';

const ModalContainer = ({
    closeModal,
    children,
    title,
    noHeader,
}) => {
    return (
        <ModalBody>
            <Header noHeader={noHeader}>
                <Title>{title}</Title>
            </Header>

            <div>{children}</div>
        </ModalBody>
    );
};

export default ModalContainer;