import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getIneligibleStudents } from '../../graphql/queries/student_module/getStudentModule'
import Table from '../../components/table'
import { TableHeader, TableCell } from '../../components/globals'

const IneligibleStudents = () => {

    const { loading, data } = useQuery(getIneligibleStudents);

    // const dispatch = useDispatch();

    const style = TableCell;

    const headerStyle = TableHeader;

    // const deleteUser = (props) => {
    //     const { name, email, dob, studentId, program, schoolYear } = props.row
    //     dispatch(setUser(name, email, dob, studentId, program, schoolYear))
    //     dispatch(openModal('DELETE_USER_MODAL'))
    // }

    // const editUser = (props) => {
    //     const { name, email, dob, studentId, program, schoolYear } = props.row
    //     dispatch(setUser(name, email, dob, studentId, program, schoolYear))
    //     dispatch(openModal('EDIT_USER_MODAL'))
    // }



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
    }]


    return (
        <Table
            data={data && data.getIneligibleStudents}
            isLoading={loading}
            columns={columns}
            isExcel={true}
            title="Ineligible Students List"
            api="upload_ineligible_student_csv"
        />
    )
};

export default IneligibleStudents;