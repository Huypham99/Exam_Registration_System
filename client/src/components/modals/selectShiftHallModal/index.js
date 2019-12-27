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
import { getRegisterStudentsQuery, getStudentShiftByStudentIdQuery } from '../../../graphql/queries/student_shift/getStudentShift'
import { Query } from 'react-apollo'
import { Table, Td, Th, Tr, IconWrapper } from './style'
import { withCurrentUser } from '../../withCurrentUser'

const SelectShiftHallModal = (props) => {

    const { currentUser } = props
    const isOpen = useSelector(state => state.modals.isOpen)
    const id = useSelector(state => state.shift.shiftId)
    const studentId = useSelector(state => state.id)

    const [selected, setSelected] = useState(null)
    const [hovered, setHovered] = useState(false)
    const [hallIndex, setHallIndex] = useState(null)
    const [oneItemSelected, setOneItemSelected] = useState(false)
    const [abc, setAbc] = useState(null)

    const onMouseOver = () => setHovered(true)
    const onMouseLeave = () => setHovered(false)

    const dispatch = useDispatch()

    const style = modalStyles()

    const close = () => dispatch(closeModal())

    const { data: shift } = useQuery(
        getShiftByIdQuery, 
        { variables: { id: id } }
    )

    const { data: student_shift, loading: student_shift_loading } = useQuery(
        getStudentShiftByStudentIdQuery, 
        { variables: { studentId: currentUser.id } }
    )

    const [createStudentShift, { loading: createLoading, data: createData }] = useMutation(
        createStudentShiftMutation,
        {
            refetchQueries: [{
                query: getRegisterStudentsQuery,
                variables: { shiftHallId: hallIndex }
            }, {
                query: getStudentShiftByStudentIdQuery,
                variables: { studentId: currentUser.id }
            }]
        }
    )

    const [deleteStudentShift, { loading: cancelLoading, data: cancelData }] = useMutation(
        deleteStudentShiftMutation,
        {
            refetchQueries: [{
                query: getRegisterStudentsQuery,
                variables: { shiftHallId: hallIndex }
            }, {
                query: getStudentShiftByStudentIdQuery,
                variables: { studentId: currentUser.id }
            }],
        }
    )

    
    let hallIdList = [];

    // Check if user has already registered this shifts
    const hasRegistered = (shiftHallId) => (student_shift && student_shift.getStudentShiftByStudentId.filter(data => data.shiftHall.id == shiftHallId).length !== 0)

    const handleRegister = async (shiftHallId, hallId) => (
        await setHallIndex(shiftHallId),
        await createStudentShift({ variables: { shiftHallId: shiftHallId, studentId: studentId } }),
        setSelected(hallId),
        setOneItemSelected(true)
    )

    const handleCancel = async (shiftHallId, hallId) => (
        await setHallIndex(shiftHallId),
        await deleteStudentShift({ variables: { shiftHallId: shiftHallId, studentId: studentId } }),
        setSelected(null),
        setOneItemSelected(false)
    )


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
                        {shift && shift.getShiftById.halls.map(shiftHall => (
                            <Query query={getRegisterStudentsQuery} variables={{ shiftHallId: shiftHall.id }}>
                                {({ data }) => {
                                    const registeredStudents = data && data.getStudentShiftByShiftHallId.length
                                    const { id, name, capacity } = shiftHall.hallDetail
                                    return (
                                        <tbody>
                                            <Tr
                                                capacity={capacity}
                                                registered={registeredStudents}
                                            >
                                                <Td>{name}</Td>
                                                <Td>{capacity}</Td>
                                                <Td>{registeredStudents}</Td>
                                                <Td>
                                                    <IconWrapper>
                                                        <PrimaryButton
                                                            onMouseOver={onMouseOver}
                                                            onMouseLeave={onMouseLeave}
                                                            onClick={() =>
                                                                hasRegistered(shiftHall.id) ? handleCancel(shiftHall.id, id) : (registeredStudents == capacity) ? alert('Không còn đủ chỗ, vui lòng chọn phòng thi khác !!') : handleRegister(shiftHall.id, id)}
                                                            disabled={!oneItemSelected || hasRegistered(shiftHall.id) ? false : true}
                                                        >
                                                            {(hasRegistered(shiftHall.id ))
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
                                    )
                                }}
                            </Query>
                        ))}
                    </Table>
                </Wrapper>
                <Actions>
                    <WarnButton onClick={() => close()}>Hủy</WarnButton>
                </Actions>
            </ModalContainer>
        </Modal >
    );
};

export default withCurrentUser(SelectShiftHallModal);