import React from 'react';

import Table from '../../components/table'
import { TableHeader, TableCell } from '../../components/globals'
import TableActions from '../../components/tableActions'
import { useQuery } from '@apollo/react-hooks';
import { getAllUsers } from '../../graphql/queries/user/getUser'
import { useDispatch } from 'react-redux'
import { setUser } from '../../actions/userInfor';
import { openModal } from '../../actions/modals';

const StudentsList = () => {

    const { loading, data } = useQuery(getAllUsers);

    const dispatch = useDispatch();

    const style = TableCell;

    const headerStyle = TableHeader;

    const deleteUser = (props) => {
        const { name, email, dob, studentId, program, schoolYear } = props.row
        dispatch(setUser(name, email, dob, studentId, program, schoolYear))
        dispatch(openModal('DELETE_USER_MODAL'))
    }

    const editUser = (props) => {
        const { name, email, dob, studentId, program, schoolYear } = props.row
        dispatch(setUser(name, email, dob, studentId, program, schoolYear))
        dispatch(openModal('EDIT_USER_MODAL'))
    }

    const createUser = () => {
        dispatch(openModal('CREATE_USER_MODAL'))
    }

    const columns = [{
        Header: 'Họ và Tên',
        accessor: 'name',
        style: style,
        headerStyle: headerStyle,
        minWidth: 100,
    }, {
        Header: 'Email',
        accessor: 'email',
        style: style,
        headerStyle: headerStyle,
    }, {
        Header: 'Ngày Sinh',
        accessor: 'dob',
        style: style,
        headerStyle: headerStyle,
        minWidth: 70,
    }, {
        Header: 'Mã Sinh Viên',
        accessor: 'studentId',
        style: style,
        headerStyle: headerStyle,
        minWidth: 70,
    }, {
        Header: 'Chương Trình Học',
        accessor: 'program',
        style: style,
        headerStyle: headerStyle
    }, {
        Header: 'Khóa',
        accessor: 'schoolYear',
        style: style,
        headerStyle: headerStyle,
        minWidth: 60,
    }, {
        Header: 'Edit',
        Cell: (props) => (
            <TableActions
                editFunc={() => editUser(props)}
                deleteFunc={() => deleteUser(props)}
            />
        ),
        headerStyle: headerStyle,
        minWidth: 70,
    }]


    return (
        <Table
            data={data && data.getAllUsers}
            isLoading={loading}
            columns={columns}
            title="Danh sách sinh viên"
            isExcel={true}
            api="upload-user-csv"
            createFunc={() => createUser()}
        />
    )
};

export default StudentsList;