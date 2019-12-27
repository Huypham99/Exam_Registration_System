import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, openModal } from '../../../actions/modals'
import { setStudentsList } from '../../../actions/studentsList'
import { modalStyles, Wrapper, Actions } from '../style'
import ModalContainer from '../modalContainer'
import { PrimaryButton, WarnButton } from '../../button/index'
import { useQuery } from '@apollo/react-hooks'
import { getShiftByIdQuery } from '../../../graphql/queries/shift/getShift'
import { getStudentShiftByShiftHallIdQuery } from '../../../graphql/queries/student_shift/getStudentShift'
import { Query } from 'react-apollo'
import { Table, Td, Th, IconWrapper } from './style'
import { withCurrentUser } from '../../withCurrentUser'

const HallListModal = (props) => {

    const { currentUser } = props

    const isOpen = useSelector(state => state.modals.isOpen);
    const id = useSelector(state => state.shift.id);

    // Array stores list of registered student of each hall
    const registerStudents = []

    const dispatch = useDispatch()

    const style = modalStyles()

    const close = () => dispatch(closeModal())

    const { data: shift } = useQuery(getShiftByIdQuery, { variables: { id: id } })

    const handleClick = (studentShift) => (
        studentShift.map(data => registerStudents.push(data.student)),
        dispatch(setStudentsList(registerStudents)),
        dispatch(openModal('REGISTERED_STUDENTS_MODAL'))
    )

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={330}
            style={style}
        >
            <ModalContainer title='Danh sách phòng thi'>
                <Wrapper>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Giang đường</Th>
                                <Th>Sức chứa</Th>
                                <Th>Đã đăng kí</Th>
                                <Th>Danh sách sinh viên</Th>
                            </tr>
                        </thead>
                        {shift && shift.getShiftById.halls.map(hall => (
                            <tbody>
                                <Query query={getStudentShiftByShiftHallIdQuery} variables={{ shiftHallId: hall.id }}>
                                    {({ data }) => (
                                        <tr>
                                            <Td>{hall.hallDetail.name}</Td>
                                            <Td>{hall.hallDetail.capacity}</Td>
                                            <Td>{data && data.getStudentShiftByShiftHallId.length}</Td>
                                            <Td>
                                                <IconWrapper>
                                                    <PrimaryButton onClick={() => handleClick(data && data.getStudentShiftByShiftHallId)}
                                                        disabled={data && data.getStudentShiftByShiftHallId.length === 0}
                                                    >Xem</PrimaryButton>
                                                </IconWrapper>
                                            </Td>
                                        </tr>
                                    )}
                                </Query>
                            </tbody>
                        ))}
                    </Table>
                </Wrapper>
                <Actions>
                    <WarnButton onClick={() => close()}>Hủy</WarnButton>
                </Actions>
            </ModalContainer>
        </Modal>
    );
};

export default withCurrentUser(HallListModal);