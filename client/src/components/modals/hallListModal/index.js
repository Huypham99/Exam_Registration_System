import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals';
import { modalStyles, Wrapper, Actions } from '../style'
import ModalContainer from '../modalContainer'
import { PrimaryButton, WarnButton } from '../../button/index'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { getShiftByIdQuery } from '../../../graphql/queries/shift/getShift'
import { getStudentShiftByShiftHallIdQuery, getStudentShiftByStudentIdQuery } from '../../../graphql/queries/student_shift/getStudentShift'
import { Query } from 'react-apollo'
import { Table, Td, Th, Tr, IconWrapper } from './style'
import { withCurrentUser } from '../../withCurrentUser'

const HallListModal = (props) => {

    const isOpen = useSelector(state => state.modals.isOpen)
    const id = useSelector(state => state.shift.shiftId)
    const studentId = useSelector(state => state.id)
    const { currentUser } = props


    const [registeredUsers, setRegistered] = useState(null)
    const [selected, setSelected] = useState(false)

    const dispatch = useDispatch()


    const style = modalStyles();

    const close = () => dispatch(closeModal());


    const { data: shift } = useQuery(getShiftByIdQuery, { variables: { id: id } });
    const { data: student_shift, loading: student_shift_loading } = useQuery(getStudentShiftByStudentIdQuery, { variables: { studentId: currentUser.id } });

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={330}
            style={style}
        >
            <ModalContainer title='Chọn phòng thi'>
                <Wrapper>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Giang đường</Th>
                                <Th>Sức chứa</Th>
                                <Th>Đã đăng kí</Th>
                            </tr>
                        </thead>
                        {shift && shift.getShiftById.halls.map(hall => (
                            <tbody>
                                <Tr
                                    capacity={hall.hallDetail.capacity}
                                    registered={registeredUsers}
                                    selected={hallIdList.includes(hall.hallDetail.id)}
                                >
                                    <Td>{hall.hallDetail.name}</Td>
                                    <Td>{hall.hallDetail.capacity}</Td>
                                    <Query query={getStudentShiftByShiftHallIdQuery} variables={{ shiftHallId: hall.id }}>
                                        {({ data }) => {
                                            setRegistered(data && data.getStudentShiftByShiftHallId.length)
                                            return <Td>{data && data.getStudentShiftByShiftHallId.length}</Td>
                                        }}
                                    </Query>
                                </Tr>
                            </tbody>
                        ))}
                    </Table>
                </Wrapper>
            </ModalContainer>
        </Modal>
    );
};

export default withCurrentUser(HallListModal);