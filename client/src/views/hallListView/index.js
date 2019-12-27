import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { getAllHalls } from '../../graphql/queries/hall/getHall'
import Table from '../../components/table'
import { TableHeader, TableCell } from '../../components/globals'
import TableActions from '../../components/tableActions'
import { useDispatch } from 'react-redux'
import { openModal } from '../../actions/modals';
import { setHallId, setHall } from '../../actions/hallInfor';


const HallsList = () => {

    const { loading, data } = useQuery(getAllHalls);

    const style = TableCell;

    const headerStyle = TableHeader;

    const dispatch = useDispatch();

    const deleteHall = (props) => {
        const hallId = props.original.id
        dispatch(setHallId(hallId))
        dispatch(openModal('DELETE_HALL_MODAL'))
    }

    const editHall = (props) => {
        const { hallName, hallCapacity } = props.row
        dispatch(setHall(hallName, hallCapacity))
        dispatch(openModal('EDIT_HALL_MODAL'))
    }

    const createHall = (props) => {
        dispatch(openModal('CREATE_HALL_MODAL'))
    }

    const columns = [{
        id: 'hallName',
        Header: 'Giảng đường',
        accessor: 'name',
        style: style,
        headerStyle: headerStyle,
    }, {
        id: 'hallCapacity',
        Header: 'Sức chứa',
        accessor: 'capacity',
        style: style,
        headerStyle: headerStyle,
    }, {
        Header: 'Edit',
        Cell: (props) => (
            <TableActions
                editFunc={() => editHall(props)}
                deleteFunc={() => deleteHall(props)}
            />
        ),
        headerStyle: headerStyle,
        width: 200,
    }]


    return (
        <Table
            data={data && data.getAllHalls}
            isLoading={loading}
            columns={columns}
            title="Danh sách phòng thi"
            createFunc={() => createHall()}
        />
    )

};

export default HallsList;