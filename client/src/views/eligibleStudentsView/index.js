import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getEligibleStudents } from '../../graphql/queries/student_module/getStudentModule'
import Table from '../../components/table'
import { TableHeader, TableCell } from '../../components/globals'
import TableActions from '../../components/tableActions'
import { setModuleId } from '../../actions/moduleInfor';
import { setStudentId } from '../../actions/userInfor';
import { setEligible } from '../../actions/isEligible';
import { openModal } from '../../actions/modals'
import { useDispatch } from 'react-redux'

const EligibleStudents = () => {

    const { loading, data } = useQuery(getEligibleStudents);

    const dispatch = useDispatch();

    const style = TableCell;

    const headerStyle = TableHeader;

    const deleteEligibleStudent = (props) => {
        const { studentId, moduleId } = props.row
        dispatch(setStudentId(studentId))
        dispatch(setModuleId(moduleId))
        dispatch(setEligible(true))
        dispatch(openModal('DELETE_STUDENT_MODULE_MODAL'))
    }

    const editEligibleStudent = (props) => {
        // const { name, email, dob, studentId, program, schoolYear } = props.row
        // dispatch(setUser(name, email, dob, studentId, program, schoolYear))
        // dispatch(openModal('EDIT_USER_MODAL'))
        return;
    }



    const columns = [{
        id: 'studentId',
        Header: 'Mã SV',
        accessor: d => d.studentInfor.studentId,
        style: style,
        headerStyle: headerStyle,
        width: 100,
    }, {
        id: 'studentName',
        Header: 'Họ và Tên',
        accessor: d => d.studentInfor.name,
        style: style,
        headerStyle: headerStyle,
        minWidth: 100,
    }, {
        id: 'studentDob',
        Header: 'Ngày sinh',
        accessor: d => d.studentInfor.dob,
        style: style,
        headerStyle: headerStyle,
        width: 150
    }, {
        id: 'moduleId',
        Header: 'Mã Học phần',
        accessor: d => d.moduleInfor.moduleId,
        style: style,
        headerStyle: headerStyle,
        width: 150
    }, {
        id: 'moduleName',
        Header: 'Học phần',
        accessor: d => d.moduleInfor.name,
        style: style,
        headerStyle: headerStyle,
    }, {
        Header: 'Edit',
        Cell: (props) => (
            <TableActions
                editFunc={() => editEligibleStudent(props)}
                deleteFunc={() => deleteEligibleStudent(props)}
            />
        ),
        headerStyle: headerStyle,
        width: 100,
    }]


    return (
        <Table
            data={data && data.getEligibleStudents}
            isLoading={loading}
            columns={columns}
            isExecl
            title="Eligible Students List"
            api="upload_ineligible_student_csv"
        />
    )
};

export default EligibleStudents;