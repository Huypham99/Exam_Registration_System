import React from 'react';
import CreateUserModal from './createUserModal'
import DeleteUserModal from './deleteUserModal'
import EditUserModal from './editUserModal'
import DeleteModuleModal from './deleteModuleModal'
import EditModuleModal from './editModuleModal'
import CreateModuleModal from './createModuleModal'
import DeleteStudentModuleModal from './deleteStudentModuleModal'
import CreateShiftModal from './createShiftModal'
import AddHallModal from './addHallToShiftModal'
import SelectShiftHallModal from './selectShiftHallModal'
import CreateHallModal from './createHallModal'
import DeleteHallModal from './deleteHallModal'
import HallListModal from './hallListModal'
import EditHallModal from './editHallModal'
import RegisteredStudentModal from './regiteredStudentsModal';
import PrintRegStudentsModal from './printRegisteredStudentsModal';
import { useSelector } from 'react-redux'

const ModalRoot = () => {

    const MODAL_COMPONENTS = {
        DELETE_USER_MODAL: DeleteUserModal,
        EDIT_USER_MODAL: EditUserModal,
        DELETE_MODULE_MODAL: DeleteModuleModal,
        EDIT_MODULE_MODAL: EditModuleModal,
        CREATE_MODULE_MODAL: CreateModuleModal,
        CREATE_USER_MODAL: CreateUserModal,
        DELETE_STUDENT_MODULE_MODAL: DeleteStudentModuleModal,
        CREATE_SHIFT_MODAL: CreateShiftModal,
        ADD_HALL_MODAL: AddHallModal,
        SELECT_SHIFT_HALL: SelectShiftHallModal,
        CREATE_HALL_MODAL: CreateHallModal,
        DELETE_HALL_MODAL: DeleteHallModal,
        HALL_LIST_MODAL: HallListModal,
        REGISTERED_STUDENTS_MODAL: RegisteredStudentModal,
        PRINT_REG_STUDENTS_MODAL: PrintRegStudentsModal,
        EDIT_HALL_MODAL: EditHallModal
    };

    const type = useSelector(state => state.modals.modalType)

    if (!type) { return null }

    const SpecificModal = MODAL_COMPONENTS[type];
    return <SpecificModal />;
};

export default ModalRoot;
