import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals';
import { editModuleMutation } from '../../../graphql/mutations/module/editModule'
import { useMutation } from '@apollo/react-hooks';
import { modalStyles, Wrapper, Actions } from '../style'
import ModalContainer from '../modalContainer'
import { Input, Error } from '../../formElements/index'
import { PrimaryButton, WarnButton } from '../../button/index'
import { getAllModulesQuery } from '../../../graphql/queries/module/getModule'

const DeleteUserModal = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(state => state.modals.isOpen)

    const { name, moduleId } = useSelector(state => state.module)

    const close = () => dispatch(closeModal());

    const style = modalStyles();

    const [editModule, { loading, error }] = useMutation(
        editModuleMutation,
        { refetchQueries: [{ query: getAllModulesQuery }] }
    );

    //handle input changes

    const [inputName, setInputName] = useState(name)
    const [inputModuleId, setInputModuleId] = useState(moduleId)
    
    const [nameError, setNameError] = useState(false)
    const [moduleIdError, setModuleIdError] = useState(false)
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

    const changeModuleId = e => {
        let moduleId = e.target.value;
        if (!moduleId || moduleId.length === 0) {
            setInputModuleId(moduleId)
            setModuleIdError(true)
            return;
        }
        setInputModuleId(moduleId)
        setModuleIdError(false)
    };

    const updateModule = async e => {
        e.preventDefault()
        await editModule({ variables: { moduleId: moduleId, newModuleId: inputModuleId, newName: inputName } })
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
                            defaultValue={inputModuleId}
                            onChange={changeModuleId}
                        >
                            Mã học phần
                        </Input>
                        {moduleIdError ? <Error>Mã học phần không được để trống</Error> : ''}
                        {intergerError ? <Error>Mã học phần phai la so</Error> : ''}
                        <Input
                            type="text"
                            defaultValue={inputName}
                            onChange={changeName}
                        >
                            Tên học phần
                        </Input>
                        {nameError ? <Error>Tên học phần không được để trống</Error> : ''}
                    </Wrapper>
                    <Actions>
                        <WarnButton onClick={() => close()}>Hủy</WarnButton>
                        <PrimaryButton onClick={updateModule} disabled={
                            !inputModuleId ||
                            !inputName ||
                            inputName == name &&
                            inputModuleId == moduleId
                        }>{loading ? 'Cập nhật ...' : 'Cập nhật'}</PrimaryButton>
                    </Actions>
                </form>
            </ModalContainer>
        </Modal>
    );
};

export default DeleteUserModal;