import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DeleteModalRoot from '../deleteModalRoot'
import { closeModal } from '../../../actions/modals'
import { deleteStudentShiftMutation } from '../../../graphql/mutations/student_shift/deleteStudentShift'
import { useMutation } from '@apollo/react-hooks'
import { getRegisterStudentsQuery, getStudentShiftByStudentIdQuery } from '../../../graphql/queries/student_shift/getStudentShift'
import { withCurrentUser } from '../../withCurrentUser';

const UnregisterModal = (props) => {

    const { currentUser } = props

    const dispatch = useDispatch()

    const shiftHallId = useSelector(state => state.shiftHall.id)

    const [deleteStudentShift, { loading: cancelLoading, data: cancelData }] = useMutation(
        deleteStudentShiftMutation,
        {
            refetchQueries: [{
                query: getRegisterStudentsQuery,
                variables: { shiftHallId: shiftHallId }
            }, {
                query: getStudentShiftByStudentIdQuery,
                variables: { studentId: currentUser.id }
            }],
        }
    )

    const handleUnregister = async (shiftHallId) => (
        await deleteStudentShift({ variables: { shiftHallId: shiftHallId, studentId: currentUser.id } }),
        dispatch(closeModal())
    )

    return (
        <DeleteModalRoot
            title='Hủy đăng kí'
            message='Bạn có chắc muốn hủy đăng kí ca thi này'
            action={() => handleUnregister(shiftHallId)}
        />
    );
};

export default withCurrentUser(UnregisterModal);