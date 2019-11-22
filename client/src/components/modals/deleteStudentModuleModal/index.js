import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DeleteModalRoot from '../deleteModalRoot'
import { closeModal } from '../../../actions/modals'
import { deleteStudentModuleMutation } from '../../../graphql/mutations/student_module/deleteStudentModule'
import { useMutation } from '@apollo/react-hooks'
import { getEligibleStudents, getIneligibleStudents } from '../../../graphql/queries/student_module/getStudentModule'

const DeleteStudentModuleModal = () => {

    const dispatch = useDispatch()

    const { moduleId } = useSelector(state => state.module)
    const { studentId } = useSelector(state => state.user)
    const isEligible = useSelector(state => state.isEligible)

    const [deleteStudentModule] = useMutation(
        deleteStudentModuleMutation,
        { refetchQueries: [{ query: isEligible ? getEligibleStudents : getIneligibleStudents }] }
    );

    const handleDeleteStudentModule = async () => {
        await deleteStudentModule({ variables: { studentId: studentId, moduleId: moduleId, isEligible: isEligible } });
        dispatch(closeModal())
    }

    return (
        <DeleteModalRoot
            title='Xoá sinh viên không đủ điều kiện'
            message='Bạn có chắc muốn xóa sinh viên này'
            action={() => handleDeleteStudentModule()}
        />
    );
};

export default DeleteStudentModuleModal;