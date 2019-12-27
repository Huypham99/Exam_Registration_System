import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../actions/modals';
import { modalStyles, Wrapper, Actions } from '../style'
import ModalContainer from '../modalContainer'
import { PrimaryButton, WarnButton } from '../../button/index'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Query } from 'react-apollo'
import { Table, Td, Th, IconWrapper } from './style'

const RegisteredStudentModal = (props) => {

    const isOpen = useSelector(state => state.modals.isOpen)
    const id = useSelector(state => state.shift.shiftId)
    const studentId = useSelector(state => state.id)
    const students = useSelector(state => state.studentsList.list)

    const [selected, setSelected] = useState(false)

    const dispatch = useDispatch()

    const style = modalStyles();

    const handleReturn = () => dispatch(openModal('HALL_LIST_MODAL'))
    const handlePrint = () => dispatch(openModal('PRINT_REG_STUDENTS_MODAL'))

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={330}
            style={style}
        >
            <ModalContainer title='Danh sách sinh viên đã đăng kí'>
                <Wrapper>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Họ tên</Th>
                                <Th>Email</Th>
                                <Th>Ngày sinh</Th>
                                <Th>Mã số sinh viên</Th>
                                <Th>Khóa</Th>
                            </tr>
                        </thead>
                        {students.map(student => (
                            <tbody>
                                <tr>
                                    <Td>{student.name}</Td>
                                    <Td>{student.email}</Td>
                                    <Td>{student.dob}</Td>
                                    <Td>{student.studentId}</Td>
                                    <Td>{student.schoolYear}</Td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Wrapper>
                <Actions>
                    <WarnButton onClick={() => handleReturn()}>Quay lại</WarnButton>
                    <PrimaryButton onClick={() => handlePrint()}>Xuất danh sách</PrimaryButton>
                </Actions>
            </ModalContainer>
        </Modal>
    );
};

export default RegisteredStudentModal;