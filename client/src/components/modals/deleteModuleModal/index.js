import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DeleteModalRoot from '../deleteModalRoot'
import { closeModal } from '../../../actions/modals'
import { deleteModuleMutation } from '../../../graphql/mutations/module/deleteModule'
import { useMutation } from '@apollo/react-hooks'
import { getAllModulesQuery } from '../../../graphql/queries/module/getModule'

const DeleteModuleModal = () => {

    const dispatch = useDispatch()

    const { moduleId } = useSelector(state => state.module)

    const [deleteModule] = useMutation(
        deleteModuleMutation,
        { refetchQueries: [{ query: getAllModulesQuery }] }
    )

    const handleDeleteModule = async () => {
        await deleteModule({ variables: { id: moduleId.toString() } });
        dispatch(closeModal())
    }

    return (
        <DeleteModalRoot
            title='Xoá học phần'
            message='Bạn có chắc muốn xóa học phần này'
            action={() => handleDeleteModule()}
        />
    );
};

export default DeleteModuleModal;