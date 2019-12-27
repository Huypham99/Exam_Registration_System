import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals';
import { createHallMutation } from '../../../graphql/mutations/hall/createHall'
import { useMutation } from '@apollo/react-hooks';
import { modalStyles } from '../style'
import ModalContainer from '../modalContainer'
import { PrimaryButton, WarnButton } from '../../button/index'
import { Input, Error } from '../../formElements'
import { Actions, Wrapper } from '../style'
import { getAllHalls } from '../../../graphql/queries/hall/getHall'

const CreatehallModal = () => {

    const style = modalStyles()

    const dispatch = useDispatch()

    const close = () => dispatch(closeModal())

    const isOpen = useSelector(state => state.modals.isOpen)

    const [inputRoomName, setInputRoomName] = useState('')
    const [inputHallName, setInputHallName] = useState('')
    const [inputCapacity, setInputCapacity] = useState('')
    const [roomNameError, setRoomNameError] = useState(false)
    const [hallNameError, setHallNameError] = useState(false)
    const [capacityError, setCapacityError] = useState(false)

    const [createHall, { error, loading }] = useMutation(
        createHallMutation,
        { refetchQueries: [{ query: getAllHalls }] }
    );

    const changeRoomName = e => {
        let roomName = e.target.value;
        setInputRoomName(roomName)
        setRoomNameError(false)
    };

    const changeHallName = e => {
        let hallName = e.target.value;
        setInputHallName(hallName)
        setHallNameError(false)
    };

    const changeCapacity = e => {
        let capacity = e.target.value;
        setInputCapacity(capacity)
        setCapacityError(false)
    };

    const handleCreateHall = async () => {
        if (!inputRoomName || inputRoomName.length === 0) { return setRoomNameError(true) }
        if (!inputHallName || inputHallName.length === 0) { return setHallNameError(true) }
        if (!inputCapacity || inputCapacity.length === 0) { return setCapacityError(true) }
        await createHall({
            variables: {
                name: `${inputRoomName}-${inputHallName}`,
                capacity: parseInt(inputCapacity)
            }
        });
        dispatch(closeModal())
    }

    return (
        <div>
            <Modal
                ariaHideApp={false}
                isOpen={isOpen}
                shouldCloseOnOverlayClick={true}
                closeTimeoutMS={330}
                style={style}
            >
                <ModalContainer title='Tạo mới giảng đường'>
                    <Wrapper>
                        {error && <Error>{error.graphQLErrors.map(err => err.message)}</Error>}
                        <Input
                            type="text"
                            onChange={changeRoomName}
                        >
                            Tên phòng thi
                        </Input>
                        {roomNameError ? <Error>Tên phòng thi không được để trống</Error> : ''}
                        <Input
                            type="text"
                            onChange={changeHallName}
                        >
                            Tên giảng đường
                        </Input>
                        {hallNameError ? <Error>Tên giảng đường không được để trống</Error> : ''}
                        <Input
                            type="text"
                            onChange={changeCapacity}
                        >
                            Số máy
                        </Input>
                        {capacityError ? <Error>Số máy không được để trống</Error> : ''}
                    </Wrapper>
                    <Actions>
                        <WarnButton onClick={() => close()}>Hủy</WarnButton>
                        <PrimaryButton
                            onClick={() => handleCreateHall()}
                        >
                            {loading ? 'Tạo mới...' : 'Tạo mới'}
                        </PrimaryButton>
                    </Actions>
                </ModalContainer>

            </Modal>
        </div>
    );
};

export default CreatehallModal;