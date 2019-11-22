import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DeleteModalRoot from '../deleteModalRoot'
import { closeModal } from '../../../actions/modals'
import { deleteHallMutation } from '../../../graphql/mutations/hall/deleteHall'
import { useMutation } from '@apollo/react-hooks'
import { getAllHalls } from '../../../graphql/queries/hall/getHall'

const DeleteHallModal = () => {

    const dispatch = useDispatch()

    const { hallId } = useSelector(state => state.hall)

    const [deleteHall] = useMutation(
        deleteHallMutation,
        { refetchQueries: [{ query: getAllHalls }] }
    )

    const handleDeleteHall = async () => {
        await deleteHall({ variables: { id: hallId.toString() } });
        dispatch(closeModal())
    }

    return (
        <DeleteModalRoot
            title='Xoá học phần'
            message='Bạn có chắc muốn xóa giảng đường này'
            action={() => handleDeleteHall()}
        />
    );
};

export default DeleteHallModal;