import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, openModal } from '../../../actions/modals';
import { createShiftMutation } from '../../../graphql/mutations/shift/createShift'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { modalStyles } from '../style'
import ModalContainer from '../modalContainer'
import { PrimaryButton, WarnButton } from '../../button/index'
import { Error } from '../../formElements'
import { Actions, Wrapper, ModalBody } from '../style'
import { Label } from '../../globals';
import { getAllModulesQuery } from '../../../graphql/queries/module/getModule'
import { setShiftId } from '../../../actions/shiftInfor'
import { Input } from '../../formElements';
import { Select } from '../../formElements/style';

const CreateShiftModal = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(state => state.modals.isOpen)
    const examId = useSelector(state => state.exam.examId)

    const style = modalStyles();

    const close = () => dispatch(closeModal());

    const { data } = useQuery(getAllModulesQuery)

    const [createShift, { loading }] = useMutation(
        createShiftMutation, {
        update(cache, { data: { createNewShift } }) {
            dispatch(setShiftId(createNewShift.id))
        }
    }
    );

    const [inputTime, setInputTime] = useState('')
    const [inputDate, setInputDate] = useState('')
    const [inputDayOfWeek, setInputDayOfWeek] = useState('')
    const [inputModule, setInputModule] = useState('')

    const [timeError, setTimeError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [dayOfWeekError, setDayOfWeekError] = useState(false)
    const [moduleError, setModuleError] = useState(false)

    const changeTime = e => {
        let time = e.target.value;
        setInputTime(time)
        setTimeError(false)
    };

    const changeDate = e => {
        let date = e.target.value;
        setInputDate(date)
        setDateError(false)
    };

    const changeDayOfWeek = e => {
        let dayOfWeek = e.target.value;
        setInputDayOfWeek(dayOfWeek)
        setDayOfWeekError(false)
    };

    const changeModule = e => {
        let module = e.target.value;
        let moduleId = module.split('-')[1]
        setInputModule(moduleId)
        setModuleError(false)
    };

    const handleCreateShift = async () => {
     
        if (!inputDate || inputDate.length === 0) { return setDateError(true) }
     
        if (!inputTime || inputTime.length === 0) { return setTimeError(true) }
     
        if (!inputDayOfWeek || inputDayOfWeek.length === 0) { return setDayOfWeekError(true) }
     
        if (!inputModule || inputModule.length === 0) { return setModuleError(true) }
     
        await createShift({
            variables: {
                time: inputTime,
                date: inputDate,
                dayOfWeek: inputDayOfWeek,
                moduleId: inputModule,
                examId: examId
            }
        })
        
        dispatch(openModal('ADD_HALL_MODAL'))
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
                <ModalContainer title='Tạo mới ca thi'>
                    <Wrapper>
                        <ModalBody>
                            <Label>
                                Thứ
                                <Select onChange={changeDayOfWeek}>
                                    <option value="" selected disabled hidden>Chọn thứ</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                </Select>
                            </Label>

                            {dayOfWeekError ? <Error>Thứ không được để trống</Error> : ''}
                            <Input
                                inputType="date"
                                onChange={changeDate}
                            >
                                Ngày thi
                            </Input>
                            {dateError ? <Error>Ngày không được để trống</Error> : ''}
                            <Input
                                inputType="time"
                                onChange={changeTime}
                            >
                                Giờ thi
                            </Input>
                            {timeError ? <Error>Thời gian không được để trống</Error> : ''}
                            <Label>
                                Học phần
                                <Select onChange={changeModule}>
                                    <option value="" selected disabled hidden>Chọn học phần</option>
                                    {
                                        data && data.getAllModules.map(module => (
                                            <option>{`${module.name}-${module.moduleId}`}</option>
                                        ))
                                    }
                                </Select>
                            </Label>
                            {moduleError && <Error>Vui lòng chọn học phần cho ca thi !!</Error>}
                        </ModalBody>
                    </Wrapper>
                    <Actions>
                        <WarnButton onClick={() => close()}>Hủy</WarnButton>
                        <PrimaryButton
                            onClick={() => handleCreateShift()}
                            disabled={!inputDate || !inputTime || !inputDayOfWeek || !inputModule || timeError || dateError || dayOfWeekError || moduleError}
                        >Thêm phòng thi</PrimaryButton>
                    </Actions>
                </ModalContainer>
            </Modal>
        </div>
    );
};

export default CreateShiftModal;