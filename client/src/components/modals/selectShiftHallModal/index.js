import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals';
import { modalStyles, Wrapper, Actions } from '../style'
import ModalContainer from '../modalContainer'
import { PrimaryButton, WarnButton } from '../../button/index'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { createStudentShiftMutation } from '../../../graphql/mutations/student_shift/createNewStudentShift'
import { deleteStudentShiftMutation } from '../../../graphql/mutations/student_shift/deleteStudentShift'
import { getShiftByIdQuery } from '../../../graphql/queries/shift/getShift'
import { getStudentShiftByShiftHallIdQuery, getStudentShiftByStudentIdQuery } from '../../../graphql/queries/student_shift/getStudentShift'
import { Query } from 'react-apollo'
import { Table, Td, Th, Tr, IconWrapper } from './style'
import { withCurrentUser } from '../../withCurrentUser'

const SelectShiftHallModal = (props) => {

    const isOpen = useSelector(state => state.modals.isOpen)
    const id = useSelector(state => state.shift.shiftId)
    const studentId = useSelector(state => state.id)
    const { currentUser } = props


    const [registeredUsers, setRegistered] = useState(null)
    const [selected, setSelected] = useState(false)
    const [hovered, setHovered] = useState(false)

    const onMouseOver = () => setHovered(true)
    const onMouseLeave = () => setHovered(false)

    const dispatch = useDispatch()


    const style = modalStyles();

    const close = () => dispatch(closeModal());


    const { data: shift } = useQuery(getShiftByIdQuery, { variables: { id: id } });
    const { data: student_shift, loading: student_shift_loading } = useQuery(getStudentShiftByStudentIdQuery, { variables: { studentId: currentUser.id } });


    const [createStudentShift, { loading: createLoading }] = useMutation(
        createStudentShiftMutation,
        {
            refetchQueries: [{
                query: getStudentShiftByStudentIdQuery,
                variables: { studentId: currentUser.id }
            }]
        }
    );

    const [deleteStudentShift, { loading: cancelLoading }] = useMutation(
        deleteStudentShiftMutation,
        {
            refetchQueries: [{
                query: getStudentShiftByStudentIdQuery,
                variables: { studentId: currentUser.id }
            }]
        }
    );

    let hallIdList = [];

    const handleRegister = async (shiftHallId) => {
        await createStudentShift({ variables: { shiftHallId: shiftHallId, studentId: studentId } });
        dispatch(closeModal())
    }

    const cancelRegister = async (shiftHallId) => {
        await deleteStudentShift({ variables: { shiftHallId: shiftHallId, studentId: studentId } });
    }

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
                                <Th>Chọn</Th>
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
                                    {
                                        student_shift && student_shift.getStudentShiftByStudentId.map(data => {
                                            hallIdList.push(data.shiftHalls.hallDetail.id)
                                        })
                                    }
                                    <Td>
                                        <IconWrapper>
                                            <PrimaryButton
                                                onMouseOver={onMouseOver}
                                                onMouseLeave={onMouseLeave}
                                                onClick={() => hallIdList.includes(hall.hallDetail.id) ? cancelRegister(hall.id) : handleRegister(hall.id)}
                                                disabled={(registeredUsers == hall.hallDetail.capacity)}
                                            >
                                                {hallIdList.includes(hall.hallDetail.id)
                                                    ? (hovered
                                                        ? (cancelLoading || student_shift_loading ? 'Hủy...' : 'Hủy')
                                                        : 'Đã chọn'
                                                    )
                                                    : (createLoading
                                                        ? 'Chọn...'
                                                        : 'Chọn'
                                                    )}
                                            </PrimaryButton>
                                        </IconWrapper>
                                    </Td>
                                </Tr>
                            </tbody>
                        ))}
                    </Table>
                </Wrapper>
                <Actions>
                    <WarnButton onClick={() => close()}>Hủy</WarnButton>
                    <PrimaryButton>haha</PrimaryButton>
                </Actions>
            </ModalContainer>
        </Modal>
    );
};

export default withCurrentUser(SelectShiftHallModal);