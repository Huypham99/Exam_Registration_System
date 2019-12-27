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

    const dispatch = useDispatch();
    const close = () => dispatch(closeModal());

    const isOpen = useSelector(state => state.modals.isOpen)

    const [inputName, setInputName] = useState('')
    const [inputCapacity, setInputCapacity] = useState('')
    const [nameError, setNameError] = useState(false)
    const [capacityError, setCapacityError] = useState(false)

    const [createHall, { error, loading }] = useMutation(
        createHallMutation,
        { refetchQueries: [{ query: getAllHalls }] }
    );

    const changeName = e => {
        let name = e.target.value;
        setInputName(name)
        setNameError(false)
    };

    const changeCapacity = e => {
        let capacity = e.target.value;
        setInputCapacity(capacity)
        setCapacityError(false)
    };

    const handleCreateHall = async () => {
        if (!inputName || inputName.length === 0) { return setNameError(true) }
        if (!inputCapacity || inputCapacity.length === 0) { return setCapacityError(true) }
        await createHall({ 
            variables: { 
                name: inputName, 
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
                            onChange={changeName}
                        >
                            Tên giảng đường
                        </Input>
                        {nameError ? <Error>Tên giảng không được để trống</Error> : ''}
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
                        <PrimaryButton onClick={() => handleCreateHall()}>{loading ? 'Tạo mới...' : 'Tạo mới'}</PrimaryButton>
                    </Actions>
                </ModalContainer>

            </Modal>
        </div>
    );
};

export default CreatehallModal;