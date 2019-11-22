import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { getAllModulesQuery } from '../../graphql/queries/module/getModule'
import Table from '../../components/table'
import { TableHeader, TableCell } from '../../components/globals'
import TableActions from '../../components/tableActions'
import { useDispatch } from 'react-redux'
import { setModule } from '../../actions/moduleInfor';
import { openModal } from '../../actions/modals';

const ModulesList = () => {

    const { loading, data } = useQuery(getAllModulesQuery);

    const style = TableCell;

    const headerStyle = TableHeader;

    const dispatch = useDispatch();

    const deleteModule = (props) => {
        const { moduleName, moduleId } = props.row
        dispatch(setModule(moduleName, moduleId))
        dispatch(openModal('DELETE_MODULE_MODAL'))
    }

    const editModule = (props) => {
        const { moduleName, moduleId } = props.row
        dispatch(setModule(moduleName, moduleId))
        dispatch(openModal('EDIT_MODULE_MODAL'))
    }

    const createModule = (props) => {
        dispatch(openModal('CREATE_MODULE_MODAL'))
    }

    const columns = [{
        id: 'moduleId',
        Header: 'Mã Học phần',
        accessor: 'moduleId',
        style: style,
        headerStyle: headerStyle,
    }, {
        id: 'moduleName',
        Header: 'Học phần',
        accessor: 'name',
        style: style,
        headerStyle: headerStyle,
    }, {
        Header: 'Edit',
        Cell: (props) => (
            <TableActions
                editFunc={() => editModule(props)}
                deleteFunc={() => deleteModule(props)}
            />
        ),
        headerStyle: headerStyle,
        width: 200,
    }]


    return (
        <Table
            data={data && data.getAllModules}
            isLoading={loading}
            columns={columns}
            title="Danh sách học phần"
            createFunc={() => createModule()}
        />
    )

};

export default ModulesList;