import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { getExamByIdQuery } from '../../graphql/queries/exam/getExam'
import { TableHeader, TableCell } from '../../components/globals'
import { useSelector, useDispatch } from 'react-redux'
import { TextWrapper } from './style'
import { createStudentShiftMutation } from '../../graphql/mutations/student_shift/createNewStudentShift'
import { getIneligibleByStudentIdQuery } from '../../graphql/queries/student_module/getStudentModule'
import { SingleColumnGrid } from '../../components/layout'
import { Container, TitleWrapper, Main } from '../../components/table/style'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { PrimaryButton } from '../../components/button'
import { openModal } from '../../actions/modals'
import { setShiftId } from '../../actions/shiftInfor'
import { withRouter } from 'react-router-dom'
import { withCurrentUser } from '../../components/withCurrentUser'
import compose from 'recompose/compose'
import { addToast } from '../../actions/toasts'

const ExamDetailStudent = (props) => {

    const id = props.match.params.examId;
    const currentUser = props.currentUser

    const studentId = useSelector(state => state.id)

    const dispatch = useDispatch()

    const { loading, data: exam } = useQuery(getExamByIdQuery, { variables: { id: id } });
    const { data: ineligible_student, loading: ineligible_student_loading } = useQuery(getIneligibleByStudentIdQuery, { variables: { studentId: currentUser.studentId } });

    const style = TableCell;

    const headerStyle = TableHeader;

    let moduleIdList = [];

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
            minWidth: 300,
        }, {
            id: 'hall',
            Header: 'DS phòng thi',
            Cell: (props) => <PrimaryButton onClick={() => {
                (moduleIdList.includes(props.original.module.id))
                    ? dispatch(addToast('error', 'Bạn không đủ điều kiện để xem'))
                    : dispatch(openModal('SELECT_SHIFT_HALL'))
                dispatch(setShiftId(props.original.id))
            }}
            >Xem</PrimaryButton>,
            style: style,
            headerStyle: headerStyle,
            minWidth: 200,
        }]

    useEffect(() => {
        ineligible_student && ineligible_student.getIneligibleByStudentId.map(data => {
            moduleIdList.push(data.moduleInfor.id)
        })
    });

    return (
        <SingleColumnGrid>
            <Container>
                <TitleWrapper>
                    <h1>{exam && `Đăng kí thi - ${exam.getExamById.name} năm học ${exam.getExamById.academyYear}`}</h1>
                </TitleWrapper>
                <Main>
                    <ReactTable
                        data={exam && exam.getExamById.shifts}
                        columns={columns}
                        noDataText={loading ? "Loading..." : "Không có dữ liệu 😭"}
                        className="-striped -highlight"
                        showPageSizeOptions={false}
                    />
                </Main>
            </Container>
        </SingleColumnGrid>
    );
};

export default compose(
    withCurrentUser,
    withRouter
)(ExamDetailStudent);