import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals';
import { editHallMutation } from '../../../graphql/mutations/hall/editHall'
import { useMutation } from '@apollo/react-hooks';
import { modalStyles, Wrapper, Actions } from '../style'
import ModalContainer from '../modalContainer'
import { Input, Error } from '../../formElements/index'
import { PrimaryButton, WarnButton } from '../../button/index'
import { getAllHalls } from '../../../graphql/queries/hall/getHall'

const DeleteUserModal = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(state => state.modals.isOpen)

    const { name, capacity } = useSelector(state => state.hall)

    const close = () => dispatch(closeModal());

    const style = modalStyles();

    const [editHall, { loading, error }] = useMutation(
        editHallMutation,
        { refetchQueries: [{ query: getAllHalls }] }
    );

    //handle input changes

    const [inputName, setInputName] = useState(name)
    const [inputCapacity, setInputCapacity] = useState(capacity)
    const [nameError, setNameError] = useState(false)
    const [capacityError, setCapacityError] = useState(false)
    const [intergerError, setIntergerError] = useState(false)

    const changeName = e => {
        let name = e.target.value;
        if (!name || name.length === 0) {
            setInputName(name)
            setNameError(true)
            return;
        }
        setInputName(name)
        setNameError(false)
    };

    const changeCapacity = e => {
        let capacity = e.target.value;
        if (!capacity || capacity.length === 0) {
            setInputCapacity(capacity)
            setCapacityError(true)
            return;
        }
        setInputCapacity(capacity)
        setCapacityError(false)
    };

    const updateHall = async e => {
        e.preventDefault()
        await editHall({ variables: { name: name, newName: inputName, newCapacity: parseInt(inputCapacity) } })
        dispatch(closeModal())
    }

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={330}
            style={style}
        >
            <ModalContainer title='Sửa thông tin học phần'>
                <form>
                    <Wrapper>
                        {error && <Error>{error.graphQLErrors.map(err => err.message)}</Error>}
                        <Input
                            type="text"
                            defaultValue={inputName}
                            onChange={changeName}
                        >
                            Tên giảng đường
                        </Input>
                        {nameError ? <Error>Tên giảng đường không được để trống</Error> : ''}
                        <Input
                            type="text"
                            defaultValue={inputCapacity}
                            onChange={changeCapacity}
                        >
                            Sức chứa
                        </Input>
                        {capacityError ? <Error>Sức chứa không được để trống</Error> : ''}
                    </Wrapper>
                    <Actions>
                        <WarnButton onClick={() => close()}>Hủy</WarnButton>
                        <PrimaryButton onClick={updateHall} disabled={
                            !inputCapacity ||
                            !inputName ||
                            inputName == name &&
                            inputCapacity == capacity
                        }>{loading ? 'Cập nhật ...' : 'Cập nhật'}</PrimaryButton>
                    </Actions>
                </form>
            </ModalContainer>
        </Modal>
    );
};

export default DeleteUserModal;