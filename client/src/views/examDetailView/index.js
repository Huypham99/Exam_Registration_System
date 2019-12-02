import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { getExamByIdQuery } from '../../graphql/queries/exam/getExam'
import Table from '../../components/table'
import { Link } from 'react-router-dom'
import { TableHeader, TableCell } from '../../components/globals'
import { useDispatch } from 'react-redux'
import { openModal } from '../../actions/modals';
import { setExamId } from '../../actions/examInfor';
import { withRouter } from 'react-router-dom'
import { PrimaryButton } from '../../components/button'
import { setShiftId } from '../../actions/shiftInfor'
import { from } from 'zen-observable';

const ExamDetailStudent = (props) => {

    const id = props.match.params.examId;

    const { loading, data } = useQuery(getExamByIdQuery, { variables: { id: id } });

    const style = TableCell;

    const headerStyle = TableHeader;

    const dispatch = useDispatch();

    const handleCreateShift = () => (
        dispatch(setExamId(id)),
        dispatch(openModal('CREATE_SHIFT_MODAL'))
    )

    const columns = [
        {
            Header: 'Thời gian',
            accessor: "time",
            style: style,
            headerStyle: headerStyle,
            width: 120,
        },
        {
            Header: 'Thứ',
            accessor: "dayOfWeek",
            style: style,
            headerStyle: headerStyle,
            width: 70,
        }, {
            Header: 'Ngày',
            accessor: "date",
            style: style,
            headerStyle: headerStyle,
            maxWidth: 130,
        },
        {
            id: 'moduleId',
            Header: 'Mã HP',
            accessor: d => d.module && d.module.moduleId,
            style: style,
            headerStyle: headerStyle,
            maxWidth: 120,
        }, {
            id: 'module',
            Header: 'Học phần',
            accessor: d => d.module && d.module.name,
            style: style,
            headerStyle: headerStyle,
            width: 500,
        },
        {
            id: 'hall',
            Header: 'Phòng thi',
            Cell: (props) => (
                <PrimaryButton onClick={() => (
                    dispatch(openModal('HALL_LIST_MODAL')),
                    dispatch(setShiftId(props.original.id))
                )}>
                    Xem
                </PrimaryButton>
            ),
            style: style,
            headerStyle: headerStyle,
            minWidth: 130,
        }]

    return (
        <Table
            data={data && data.getExamById.shifts}
            isLoading={loading}
            columns={columns}
            title={data && `${data.getExamById.name} năm học ${data.getExamById.academyYear} - ca thi`}
            createFunc={() => handleCreateShift()}
        />
    );
};

export default withRouter(ExamDetailStudent);