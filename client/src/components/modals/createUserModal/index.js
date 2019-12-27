import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals';
import { createUserMutation } from '../../../graphql/mutations/user/createUser'
import { useMutation } from '@apollo/react-hooks';
import { modalStyles } from '../style'
import ModalContainer from '../modalContainer'
import { PrimaryButton, WarnButton } from '../../button/index'
import { Input, Error } from '../../formElements'
import { Actions, Wrapper } from '../style'
import { Label } from '../../globals';
import { getAllUsers } from '../../../graphql/queries/user/getUser'
import isEmail from 'validator/lib/isEmail';

const CreateUserModal = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(state => state.modals.isOpen)

    const style = modalStyles();

    const close = () => dispatch(closeModal());

    const [createUser, { error, loading }] = useMutation(
        createUserMutation,
        { refetchQueries: [{ query: getAllUsers }] }
    );

    const [inputName, setInputName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputDob, setInputDob] = useState('')
    const [inputStudentId, setInputStudentId] = useState('')
    const [inputProgram, setInputProgram] = useState('')
    const [inputSchoolYear, setInputSchoolYear] = useState('')

    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [validEmailError, setValidEmailError] = useState(false)
    const [dobError, setDobError] = useState(false)
    const [studentIdError, setStudentIdError] = useState(false)
    const [intergerError, setIntergerError] = useState(false)
    const [programError, setProgramError] = useState(false)
    const [schoolYearError, setSchoolYearError] = useState(false)

    const changeName = e => {
        let name = e.target.value;
        setInputName(name)
        setNameError(false)
    };

    const changeEmail = e => {
        let email = e.target.value;
        setInputEmail(email)
        setEmailError(false)
    };

    const changeDob = e => {
        let dob = e.target.value;
        setInputDob(dob)
        setDobError(false)
    };

    const changeStudentId = e => {
        let studentId = e.target.value;
        setInputStudentId(studentId)
        setStudentIdError(false)
        setIntergerError(false)
    };

    const changeProgram = e => {
        let program = e.target.value;
        setInputProgram(program)
        setProgramError(false)
    };

    const changeSchoolYear = e => {
        let schoolYear = e.target.value;
        setInputSchoolYear(schoolYear)
        setSchoolYearError(false)
    };

    const handleCreateUser = async () => {
        
        if (!inputName || inputName.length === 0) { return setNameError(true) }
        
        if (!inputEmail || inputEmail.length === 0) { return setEmailError(true) }
        
        if (!isEmail(inputEmail)) { return setValidEmailError(true) }
        
        if (!inputDob || inputDob.length === 0) { return setDobError(true) }
        
        if (!inputStudentId || inputStudentId.length === 0) { return setStudentIdError(true) }
        
        if (isNaN(inputStudentId)) { return setIntergerError(true) }
        
        if (!inputProgram || inputProgram.length === 0) { return setProgramError(true) }
        
        if (!inputSchoolYear || inputSchoolYear.length === 0) { return setSchoolYearError(true) }

        const DEFAULT_USER_PASSWORD = '12345678'
        
        await createUser({
            variables: {
                name: inputName,
                password: DEFAULT_USER_PASSWORD,
                email: inputEmail,
                dob: inputDob,
                studentId: parseInt(inputStudentId),
                program: inputProgram,
                schoolYear: inputSchoolYear
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
                <ModalContainer title='Tạo mới sinh viên'>
                    <Wrapper>
                        {error && <Error>{error.graphQLErrors.map(err => err.message)}</Error>}
                        <Input
                            type="text"
                            defaultValue={inputName}
                            onChange={changeName}
                        >
                            Họ và tên
                        </Input>
                        {nameError ? <Error>Họ tên không được để trống</Error> : ''}
                        <Input
                            type="email"
                            defaultValue={inputEmail}
                            onChange={changeEmail}
                        >
                            Email
                        </Input>
                        {emailError ? <Error>Email không được để trống</Error> : ''}
                        {validEmailError ? <Error>Email không hợp lệ</Error> : ''}
                        <Input
                            inputType="date"
                            onChange={changeDob}
                        >
                            Ngày sinh
                        </Input>
                        {dobError ? <Error>Ngày sinh không được để trống</Error> : ''}
                        <Input
                            type="text"
                            defaultValue={inputStudentId}
                            onChange={changeStudentId}
                        >
                            Mã sinh viên
                        </Input>
                        {studentIdError ? <Error>Mã số sinh viên không được để trống</Error> : ''}
                        {intergerError ? <Error>Mã số sinh viên phải là số</Error> : ''}
                        <Input
                            type="text"
                            defaultValue={inputProgram}
                            onChange={changeProgram}
                        >
                            Chương trinh học
                        </Input>
                        {programError ? <Error>Chương trình học không được để trống</Error> : ''}
                        <Input
                            type="text"
                            defaultValue={inputSchoolYear}
                            onChange={changeSchoolYear}
                        >
                            Khóa
                        </Input>
                        {schoolYearError ? <Error>Khóa không được để trống</Error> : ''}
                    </Wrapper>
                    <Actions>
                        <WarnButton onClick={() => close()}>Hủy</WarnButton>
                        <PrimaryButton onClick={() => handleCreateUser()}>{loading ? 'Tạo mới...' : 'Tạo mới'}</PrimaryButton>
                    </Actions>
                </ModalContainer>
            </Modal>
        </div>
    );
};

export default CreateUserModal;