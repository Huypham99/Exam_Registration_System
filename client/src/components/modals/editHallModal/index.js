import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals';
import { editHallMutation } from '../../../graphql/mutations/hall/editHall'
import { useMutation } from '@apollo/react-hooks';
import { modalStyles, Wrapper, Actions } from '../style'
import ModalContainer from '../modalContainer'
import { Input, Error } from '../../formElements'
import { PrimaryButton, WarnButton } from '../../button/index'
import { getAllHalls } from '../../../graphql/queries/hall/getHall'

const DeleteUserModal = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(state => state.modals.isOpen)

    const { name, capacity } = useSelector(state => state.hall)

    const roomName = name.split('-')[0]
    const hallName = name.split('-')[1]

    const close = () => dispatch(closeModal());

    const style = modalStyles();

    const [editHall, { loading, error }] = useMutation(
        editHallMutation,
        { refetchQueries: [{ query: getAllHalls }] }
    );

    //handle input changes
    const [inputRoomName, setInputRoomName] = useState(roomName)
    const [inputHallName, setInputHallName] = useState(hallName)
    const [inputCapacity, setInputCapacity] = useState(capacity)

    const [roomNameError, setRoomNameError] = useState(false)
    const [hallNameError, setHallNameError] = useState(false)
    const [capacityError, setCapacityError] = useState(false)
    const [intergerError, setIntergerError] = useState(false)

    const changeRoomName = e => {
        let roomName = e.target.value;
        if (!roomName || roomName.length === 0) {
            setInputRoomName(roomName)
            setRoomNameError(true)
            return;
        }
        setInputRoomName(name)
        setRoomNameError(false)
    };

    const changeHallName = e => {
        let hallName = e.target.value;
        if (!hallName || hallName.length === 0) {
            setInputHallName(hallName)
            setHallNameError(true)
            return;
        }
        setInputHallName(hallName)
        setHallNameError(false)
    };

    const changeCapacity = e => {
        let capacity = e.target.value;
        if (!capacity || capacity.length === 0) {
            setInputCapacity(capacity)
            setCapacityError(true)
            return;
        }
        if (isNaN(capacity)) {
            setInputCapacity(capacity)
            setIntergerError(true)
            return
        }
        setInputCapacity(capacity)
        setCapacityError(false)
        setIntergerError(false)
    };

    const updateHall = async e => {
        e.preventDefault()
        await editHall({
            variables: {
                name: name,
                newName: `${inputRoomName}-${inputHallName}`,
                newCapacity: parseInt(inputCapacity)
            }
        })
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
                            defaultValue={inputRoomName}
                            onChange={changeRoomName}
                        >
                            Tên phòng thi
                        </Input>
                        {roomNameError ? <Error>Tên phòng thi không được để trống</Error> : ''}
                        <Input
                            type="text"
                            defaultValue={inputHallName}
                            onChange={changeHallName}
                        >
                            Tên phòng thi
                        </Input>
                        {hallNameError ? <Error>Tên giảng đường không được để trống</Error> : ''}
                        <Input
                            type="text"
                            defaultValue={inputCapacity}
                            onChange={changeCapacity}
                        >
                            Sức chứa
                        </Input>
                        {capacityError ? <Error>Sức chứa không được để trống</Error> : ''}
                        {intergerError ? <Error>Sức chứa phải là kiểu số</Error> : ''}
                    </Wrapper>
                    <Actions>
                        <WarnButton onClick={() => close()}>Hủy</WarnButton>
                        <PrimaryButton onClick={updateHall} disabled={
                            !inputCapacity ||
                            !inputRoomName ||
                            !inputHallName ||
                            `${inputRoomName}-${inputHallName}` == name && inputCapacity == capacity
                        }>{loading ? 'Cập nhật ...' : 'Cập nhật'}</PrimaryButton>
                    </Actions>
                </form>
            </ModalContainer>
        </Modal>
    );
};

export default DeleteUserModal;