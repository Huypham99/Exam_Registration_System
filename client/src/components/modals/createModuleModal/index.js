import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals';
import { createModuleMutation } from '../../../graphql/mutations/module/createModule'
import { useMutation } from '@apollo/react-hooks';
import { modalStyles } from '../style'
import ModalContainer from '../modalContainer'
import { PrimaryButton, WarnButton } from '../../button/index'
import { Input, Error } from '../../formElements'
import { Actions, Wrapper } from '../style'
import { getAllModulesQuery } from '../../../graphql/queries/module/getModule'

const CreateModuleModal = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(state => state.modals.isOpen)

    const close = () => dispatch(closeModal());

    const [createModule, { error, loading }] = useMutation(
        createModuleMutation,
        { refetchQueries: [{ query: getAllModulesQuery }] }
    );

    const [inputName, setInputName] = useState('')
    const [inputModuleId, setInputModuleId] = useState('')
    const [nameError, setNameError] = useState(false)
    const [moduleIdError, setModuleIdError] = useState(false)

    const changeName = e => {
        let name = e.target.value;
        setInputName(name)
        setNameError(false)
    };

    const changeModuleId = e => {
        let moduleId = e.target.value;
        setInputModuleId(moduleId)
        setModuleIdError(false)
    };

    const handleCreateModule = async () => {
        if (!inputName || inputName.length === 0) { return setNameError(true) }
        if (!inputModuleId || inputModuleId.length === 0) { return setModuleIdError(true) }
        await createModule({ variables: { moduleId: inputModuleId, name: inputName } });
        dispatch(closeModal())
    }

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
                <ModalContainer title='Tạo mới học phần'>
                    <Wrapper>
                        {error && <Error>{error.graphQLErrors.map(err => err.message)}</Error>}
                        <Input
                            type="text"
                            onChange={changeName}
                        >
                            Tên học phần
                        </Input>
                        {nameError ? <Error>Tên học phần không được để trống</Error> : ''}
                        <Input
                            type="text"
                            onChange={changeModuleId}
                        >
                            Mã học phần
                        </Input>
                        {moduleIdError ? <Error>Mã học phần không được để trống</Error> : ''}
                    </Wrapper>
                    <Actions>
                        <WarnButton onClick={() => close()}>Hủy</WarnButton>
                        <PrimaryButton onClick={() => handleCreateModule()}>{loading ? 'Tạo mới...' : 'Tạo mới'}</PrimaryButton>
                    </Actions>
                </ModalContainer>

            </Modal>
        </div>
    );
};

export default CreateModuleModal;