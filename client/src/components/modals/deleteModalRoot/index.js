import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals';
import { deleteUserMutation } from '../../../graphql/mutations/user/deleteUser'
import { useMutation } from '@apollo/react-hooks';
import { modalStyles, Actions, Message } from '../style'
import ModalContainer from '../modalContainer'
import { PrimaryButton, WarnButton } from '../../button/index'

const DeleteModalRoot = (props) => {

    const { title, message, action } = props

    const dispatch = useDispatch();

    const isOpen = useSelector(state => state.modals.isOpen)

    const close = () => dispatch(closeModal());

    const style = modalStyles();

    return (
        <div>
            <Modal
                ariaHideApp={false}
                isOpen={isOpen}
                shouldCloseOnOverlayClick={true}
                closeTimeoutMS={330}
                style={style}
            >
                <ModalContainer title={title}>
                    <Message>{message}</Message>
                    <Actions>
                        <WarnButton onClick={() => close()}>Hủy</WarnButton>
                        <PrimaryButton onClick={() => action()}>Xóa</PrimaryButton>
                    </Actions>
                </ModalContainer>

            </Modal>
        </div>
    );
};

export default DeleteModalRoot;