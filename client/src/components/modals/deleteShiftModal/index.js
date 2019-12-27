import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DeleteModalRoot from '../deleteModalRoot'
import { closeModal } from '../../../actions/modals'
import { deleteShiftMutation } from '../../../graphql/mutations/shift/deleteShift'
import { deleteStudentShiftMutation } from '../../../graphql/mutations/student_shift/deleteStudentShift'
import { useMutation } from '@apollo/react-hooks'
import { getAllShiftsQuery } from '../../../graphql/queries/shift/getShift'

const DeleteShiftModal = () => {

    const dispatch = useDispatch()

    const { shiftId } = useSelector(state => state.shift)

    const [deleteShift] = useMutation(
        deleteShiftMutation,
        { refetchQueries: [{ query: getAllShiftsQuery }] }
    )

    const [deleteStudentShift] = useMutation(
        deleteStudentShiftMutation,
        { refetchQueries: [{ query: getAllShiftsQuery }] }
    )

    const handleDeleteShift = async () => {
        await deleteShift({ variables: { id: shiftId.toString() } });
        dispatch(closeModal())
    }

    return (
        <DeleteModalRoot
            title='Xoá ca thi'
            message='Bạn có chắc muốn xóa ca thi này'
            action={() => handleDeleteShift()}
        />
    );
};

export default DeleteShiftModal;