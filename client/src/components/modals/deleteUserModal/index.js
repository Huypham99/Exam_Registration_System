import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DeleteModalRoot from '../deleteModalRoot'
import { closeModal } from '../../../actions/modals'
import { deleteUserMutation } from '../../../graphql/mutations/user/deleteUser'
import { useMutation } from '@apollo/react-hooks'
import { getAllUsers } from '../../../graphql/queries/user/getUser'

const DeleteUserModal = () => {

    const dispatch = useDispatch()

    const { studentId } = useSelector(state => state.user)

    const [deleteUser] = useMutation(
        deleteUserMutation,
        { refetchQueries: [{ query: getAllUsers }] }
    )

    const handleDeleteUser = async () => {
        await deleteUser({ variables: { id: studentId.toString() } });
        dispatch(closeModal())
    }

    return (
        <DeleteModalRoot
            title='Xoá sinh viên'
            message='Bạn có chắc muốn xóa sinh viên này'
            action={() => handleDeleteUser()}
        />
    );
};

export default DeleteUserModal;