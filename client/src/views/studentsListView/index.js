import React, { useState } from 'react';
import Table from '../../components/table'
import { TableHeader, TableCell } from '../../components/globals'
import TableActions from '../../components/tableActions'
import { useQuery } from '@apollo/react-hooks';
import { getAllUsers } from '../../graphql/queries/user/getUser'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../actions/userInfor';
import { openModal } from '../../actions/modals';

const StudentsList = () => {

    const { loading, data } = useQuery(getAllUsers);

    const dispatch = useDispatch();

    const reRenderState = useSelector(state => state.examDetailRender.reRender)

    const [reRender, setReRender] = useState(null)

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
        Header: 'VNU Email',
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
        Header: 'Mã SV',
        accessor: 'studentId',
        style: style,
        headerStyle: headerStyle,
        minWidth: 50,
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
        minWidth: 100,
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
            isCreateNew={true}
            api="excel/students"
            createFunc={() => createUser()}
        />
    )
};

export default StudentsList;