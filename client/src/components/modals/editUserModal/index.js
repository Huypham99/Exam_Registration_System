import React, { useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals'
import { useMutation } from '@apollo/react-hooks'
import { modalStyles, Wrapper, Actions } from '../style'
import ModalContainer from '../modalContainer'
import { Input, Error } from '../../formElements/index'
import { PrimaryButton, WarnButton } from '../../button/index'
import isEmail from 'validator/lib/isEmail'
import { editUserMutation } from '../../../graphql/mutations/user/editUser'
import { getAllUsers } from '../../../graphql/queries/user/getUser'

const EditUserModal = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(state => state.modals.isOpen)

    const [editUser, { loading, error }] = useMutation(
        editUserMutation,
        { refetchQueries: [{ query: getAllUsers }] }
    );

    const { name, email, dob, studentId, program, schoolYear } = useSelector(state => state.user)

    const close = () => dispatch(closeModal());

    const style = modalStyles();

    //handle input changes
    const [inputName, setInputName] = useState(name)
    const [inputEmail, setInputEmail] = useState(email)
    const [inputDob, setInputDob] = useState(dob)
    const [inputStudentId, setInputStudentId] = useState(studentId)
    const [inputProgram, setInputProgram] = useState(program)
    const [inputSchoolYear, setInputSchoolYear] = useState(schoolYear)
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
        if (!name || name.length === 0) {
            setInputName(name)
            setNameError(true)
            return;
        }
        setInputName(name)
        setNameError(false)
    };

    const changeEmail = e => {
        let email = e.target.value;
        if (!email || email.length === 0) {
            setInputEmail(name)
            setEmailError(true)
            return;
        }
        setInputEmail(email)
        setEmailError(false)
    };

    const changeDob = e => {
        let dob = e.target.value;
        if (!dob || dob.length === 0) {
            setInputDob(name)
            setDobError(true)
            return;
        }
        setInputDob(dob)
        setDobError(false)
    };

    const changeStudentId = e => {
        let studentId = e.target.value;
        if (!studentId || studentId.length === 0) {
            setInputStudentId(studentId)
            setStudentIdError(true)
            return;
        }
        if (isNaN(studentId)) {
            setInputStudentId(studentId)
            setIntergerError(true)
            return
        }
        setInputStudentId(studentId)
        setStudentIdError(false)
        setIntergerError(false)
    };

    const changeProgram = e => {
        let program = e.target.value;
        if (!program || program.length === 0) {
            setInputProgram(program)
            setNameError(true)
            return;
        }
        setInputProgram(program)
        setProgramError(false)
    };

    const changeSchoolYear = e => {
        let schoolYear = e.target.value;
        if (!schoolYear || schoolYear.length === 0) {
            setInputSchoolYear(schoolYear)
            setNameError(true)
            return;
        }
        setInputSchoolYear(schoolYear)
        setSchoolYearError(false)
    };

    const updateUser = async () => {
        if (!isEmail(inputEmail)) {
            return setValidEmailError(true);
        }
        await editUser({
            variables: {
                studentId: parseInt(studentId),
                email: email,
                newName: inputName,
                newEmail: inputEmail,
                newDob: inputDob,
                newStudentId: parseInt(inputStudentId),
                newProgram: inputProgram,
                newSchoolYear: inputSchoolYear
            }
        })
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
                <ModalContainer title='Sửa thông tin sinh viên'>
                    <Wrapper>
                        {error ? <Error>{error.message}</Error> : null}
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
                            type="date"
                            defaultValue={inputDob}
                            onChange={changeDob}
                        >
                            Ngày Sinh
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
                        <PrimaryButton
                            onClick={() => updateUser()}
                            disabled={
                                !inputName ||
                                !inputEmail ||
                                !inputDob ||
                                !inputStudentId ||
                                !inputProgram ||
                                !inputSchoolYear ||
                                inputName === name &&
                                inputEmail === email &&
                                inputDob === dob &&
                                inputStudentId === studentId &&
                                inputProgram === program &&
                                inputSchoolYear === schoolYear
                            }
                        >{loading ? 'Cập nhật...' : 'Cập nhật'}</PrimaryButton>
                    </Actions>
                </ModalContainer>

            </Modal>
        </div>
    );
};

export default EditUserModal;