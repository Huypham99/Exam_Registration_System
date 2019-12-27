import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals';
import { createExamMutation } from '../../../graphql/mutations/exam/createExam'
import { useMutation } from '@apollo/react-hooks';
import { modalStyles } from '../style'
import ModalContainer from '../modalContainer'
import { PrimaryButton, WarnButton } from '../../button/index'
import { Input, Error } from '../../formElements'
import { Actions, Wrapper } from '../style'
import { Label } from '../../globals';
import { getAllExamsQuery } from '../../../graphql/queries/exam/getExam'

const CreateExamModal = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(state => state.modals.isOpen)

    const close = () => dispatch(closeModal());

    const [createNewExam, { error, loading }] = useMutation(
        createExamMutation,
        { refetchQueries: [{ query: getAllExamsQuery }] }
    );

    const [inputName, setInputName] = useState('')
    const [inputAcademyYear, setInputAcademyYear] = useState('')
    const [inputTrainingSystem, setInputTrainingSystem] = useState('')
    const [inputOpenDate, setInputOpenDate] = useState('')
    const [inputOpenTime, setInputOpenTime] = useState('')
    const [inputEndDate, setInputEndDate] = useState('')
    const [inputEndTime, setInputEndTime] = useState('')

    const [nameError, setNameError] = useState(false)
    const [academyYearError, setAcademyYearError] = useState(false)
    const [trainingSystemError, setTrainingSystemError] = useState(false)
    const [openDateError, setOpenDateError] = useState(false)
    const [openTimeError, setOpenTimeError] = useState(false)
    const [endDateError, setEndDateError] = useState(false)
    const [endTimeError, setEndTimeError] = useState(false)

    const changeName = e => {
        let name = e.target.value;
        setInputName(name)
        setNameError(false)
    };

    const changeAcademyYear = e => {
        let academyYear = e.target.value;
        setInputAcademyYear(academyYear)
        setAcademyYearError(false)
    };

    const changeTrainingSystem = e => {
        let trainingSystem = e.target.value;
        setInputTrainingSystem(trainingSystem)
        setTrainingSystemError(false)
    };

    const changeOpenDate = e => {
        let openDate = e.target.value;
        setInputOpenDate(openDate)
        setOpenDateError(false)
    };

    const changeOpenTime = e => {
        let openTime = e.target.value;
        setInputOpenTime(openTime)
        setOpenTimeError(false)
    };

    const changeEndDate = e => {
        let endDate = e.target.value;
        setInputEndDate(endDate)
        setEndDateError(false)
    };

    const changeEndTime = e => {
        let endTime = e.target.value;
        setInputEndTime(endTime)
        setEndTimeError(false)
    };

    const handleCreateExam = async () => {

        if (!inputName || inputName.length === 0) { return setNameError(true) }
        
        if (!inputAcademyYear || inputAcademyYear.length === 0) { return setAcademyYearError(true) }
        
        if (!inputTrainingSystem || inputTrainingSystem.length === 0) { return setTrainingSystemError(true) }
        
        if (!inputOpenDate || inputOpenDate.length === 0) { return setOpenDateError(true) }
        
        if (!inputOpenTime || inputOpenTime.length === 0) { return setOpenTimeError(true) }
        
        if (!inputEndDate || inputEndDate.length === 0) { return setEndDateError(true) }
        
        if (!inputEndTime || inputEndTime.length === 0) { return setEndTimeError(true) }
        
        await createNewExam({
            variables: {
                name: inputName,
                academyYear: inputAcademyYear,
                trainingSystem: inputTrainingSystem,
                openDate: inputOpenDate,
                openTime: inputOpenTime,
                endDate: inputEndDate,
                endTime: inputEndTime
            }
        });
        
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
                <ModalContainer title='Tạo mới kì thi'>
                    <Wrapper>
                        {error && <Error>{error.graphQLErrors.map(err => err.message)}</Error>}
                        <Input
                            inputType="text"
                            defaultValue={inputName}
                            onChange={changeName}
                        >
                            Kì thi
                        </Input>
                        <Input
                            inputType="year"
                            defaultValue={inputAcademyYear}
                            onChange={changeAcademyYear}
                        >
                            Năm học
                        </Input>
                        <Input
                            inputType="text"
                            defaultValue={inputTrainingSystem}
                            onChange={changeTrainingSystem}
                        >
                            Hệ đào tạo
                        </Input>
                        <Input
                            inputType="date"
                            defaultValue={inputOpenDate}
                            onChange={changeOpenDate}
                        >
                            Ngày mở đăng kí
                        </Input>
                        <Input
                            inputType="time"
                            defaultValue={inputOpenTime}
                            onChange={changeOpenTime}
                        >
                            Thời gian mở đăng kí
                        </Input>
                        <Input
                            inputType="date"
                            defaultValue={inputEndDate}
                            onChange={changeEndDate}
                        >
                            Ngày đóng đăng kí
                        </Input>
                        <Input
                            inputType="time"
                            defaultValue={inputEndTime}
                            onChange={changeEndTime}
                        >
                            Thời gian đóng đăng kí
                        </Input>
                    </Wrapper>
                    <Actions>
                        <WarnButton onClick={() => close()}>Hủy</WarnButton>
                        <PrimaryButton onClick={() => handleCreateExam()}>{loading ? 'Tạo mới...' : 'Tạo mới'}</PrimaryButton>
                    </Actions>
                </ModalContainer>
            </Modal>
        </div>
    );
};

export default CreateExamModal;