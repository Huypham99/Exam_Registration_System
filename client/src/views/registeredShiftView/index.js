import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { getStudentShiftByStudentIdQuery } from '../../graphql/queries/student_shift/getStudentShift'
import { TableHeader, TableCell } from '../../components/globals'
import { useSelector } from 'react-redux'
import { FlexCol } from '../../components/globals'
import { SingleColumnGrid } from '../../components/layout'
import { Container, TitleWrapper, Main } from '../../components/table/style'
import ReactTable from "react-table";
import 'react-table/react-table.css'

const RegisteredShifts = (props) => {

    const studentId = useSelector(state => state.id)

    const { data: student_shift, loading } = useQuery(getStudentShiftByStudentIdQuery, { variables: { studentId: studentId } });

    const style = TableCell;

    const headerStyle = TableHeader;

    const userColumns = [
        {
            id: 'Time',
            Header: 'Thời gian',
            accessor: d => d.shiftHall.shiftDetail.time,
            style: style,
            headerStyle: headerStyle,
            width: 120,
        },
        {
            id: 'dow',
            Header: 'Thứ',
            accessor: d => d.shiftHall.shiftDetail.dayOfWeek,
            style: style,
            headerStyle: headerStyle,
            width: 70,
        },
        {
            id: 'Date',
            Header: 'Ngày',
            accessor: d => d.shiftHall.shiftDetail.date,
            style: style,
            headerStyle: headerStyle,
            maxWidth: 130,
        },
        {
            id: 'moduleId',
            Header: 'Mã HP',
            accessor: d => d.shiftHall.shiftDetail.module.moduleId,
            style: style,
            headerStyle: headerStyle,
            maxWidth: 120,
        }, {
            id: 'module',
            Header: 'Học phần',
            accessor: d => d.shiftHall.shiftDetail.module.name,
            style: style,
            headerStyle: headerStyle,
            minWidth: 400,
        },
        {
            id: 'hall',
            Header: 'Phòng thi',
            accessor: d => d.shiftHall.hallDetail.name,
            headerStyle: headerStyle,
            maxWidth: 130,
        }]

    return (
        <SingleColumnGrid>
            <Container>
                <TitleWrapper>
                    <h1>Danh sách đã đăng kí hoặc chọn</h1>
                </TitleWrapper>
                <Main>
                    <ReactTable
                        data={student_shift && student_shift.getStudentShiftByStudentId}
                        columns={userColumns}
                        noDataText={loading ? "Loading..." : "Không có dữ liệu 😭"}
                        className="-striped -highlight"
                        pageSize={student_shift ? student_shift.getStudentShiftByStudentId.length : 5}
                        showPagination={false}
                    />
                </Main>
            </Container>
        </SingleColumnGrid>
    );
};

export default RegisteredShifts;