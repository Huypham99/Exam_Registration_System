import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { getExamByIdQuery } from '../../graphql/queries/exam/getExam'
import { TableHeader, TableCell } from '../../components/globals'
import { useSelector, useDispatch } from 'react-redux'
import { TextWrapper, Title, Row } from './style'
import { createStudentShiftMutation } from '../../graphql/mutations/student_shift/createNewStudentShift'
import { getIneligibleByStudentIdQuery, getEligibleByStudentIdQuery } from '../../graphql/queries/student_module/getStudentModule'
import { getStudentShiftByStudentIdQuery } from '../../graphql/queries/student_shift/getStudentShift'
import { SingleColumnGrid } from '../../components/layout'
import { Container, TitleWrapper, Main } from '../../components/table/style'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { PrimaryButton, WarnButton } from '../../components/button'
import { openModal } from '../../actions/modals'
import { setShiftId } from '../../actions/shiftInfor'
import { withRouter } from 'react-router-dom'
import { withCurrentUser } from '../../components/withCurrentUser'
import compose from 'recompose/compose'
import Icon from '../../components/icon'
import { setShiftHallId } from '../../actions/shiftHallInfor';

const ExamDetailStudent = (props) => {

    const id = props.match.params.examId;
    const currentUser = props.currentUser

    const dispatch = useDispatch()

    const { loading, data: exam } = useQuery(
        getExamByIdQuery,
        { variables: { id: id } }
    );

    const { data: ineligible_student, loading: ineligible_student_loading } = useQuery(
        getIneligibleByStudentIdQuery,
        { variables: { studentId: currentUser.studentId } }
    );

    const { data: eligible_student, loading: eligible_student_loading } = useQuery(
        getEligibleByStudentIdQuery,
        { variables: { studentId: currentUser.studentId } }
    );

    const { data: student_shift } = useQuery(
        getStudentShiftByStudentIdQuery,
        {
            variables: { studentId: currentUser.id }
        });

    const style = TableCell;

    const headerStyle = TableHeader;

    let ineligibleModuleIdList = []
    let eligibleModuleIdList = []
    let registeredShiftTimeList = []
    let registeredShiftIdList = []

    const handleSelectShiftHall = (moduleId, shiftDetail) => {

        if (ineligibleModuleIdList.includes(moduleId)) {
            return alert('Bạn không đủ điều kiện đăng kí môn thi này, vui lòng đăng kí môn khác !!')
        }

        if (!eligibleModuleIdList.includes(moduleId)) {
            return alert('Bạn không đủ điều kiện đăng kí môn thi này, vui lòng đăng kí môn khác !!')
        }

        let { time, date, id } = shiftDetail
        let timeDate = `${time} ${date}`
        if (registeredShiftTimeList.includes(timeDate) && !registeredShiftIdList.includes(id)) {
            return alert('Ca thi bị trùng !!')
        }

        dispatch(openModal('SELECT_SHIFT_HALL'))
        dispatch(setShiftId(id))
    }

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
            Cell: (props) => <PrimaryButton onClick={() => handleSelectShiftHall(props.original.module.moduleId, props.original)}
            >Xem</PrimaryButton>,
            style: style,
            headerStyle: headerStyle,
            minWidth: 200,
        }]

    const registeredTableColumns = [
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
            style: style,
            headerStyle: headerStyle,
            maxWidth: 130,
        },
        {
            Header: 'Hủy',
            Cell: (props) => <WarnButton onClick={() => {
                dispatch(setShiftHallId(props.original.shiftHall.id))
                dispatch(openModal('UNREGISTER_MODAL'))
            }}
            ><Icon glyph='trash' size='20' /></WarnButton>,
            style: style,
            headerStyle: headerStyle,
            minWidth: 200,
        }]

    useEffect(() => {

        // lấy danh sách môn thi sinh viên không đủ điều kiện đăng kí
        ineligible_student && ineligible_student.getIneligibleByStudentId.map(data => {
            ineligibleModuleIdList.push(data.moduleId)
        })

        // lấy danh sách môn thi sinh viên đủ điều kiện đăng kí
        eligible_student && eligible_student.getEligibleByStudentId.map(data => {
            eligibleModuleIdList.push(data.moduleId)
        })

        // lấy danh sách thời gian ca thi sinh viên đã đăng kí
        student_shift && student_shift.getStudentShiftByStudentId.map(data => {
            let { time, date, id } = data.shiftHall.shiftDetail
            let timeDate = `${time} ${date}`
            registeredShiftTimeList.push(timeDate)
            registeredShiftIdList.push(id)
        })

    });

    return (
        <SingleColumnGrid>
            <Container>
                <Main>
                    <Title>{exam && `Đăng kí thi - ${exam.getExamById.name} năm học ${exam.getExamById.academyYear}`}</Title>
                    <ReactTable
                        data={exam && exam.getExamById.shifts}
                        columns={columns}
                        noDataText={loading ? "Loading..." : "Không có dữ liệu 😭"}
                        className="-striped -highlight"
                        defaultPageSize={6}
                        showPageSizeOptions={false}
                    />
                    <Title registered={true}>Danh sách môn học đã đăng ký hoặc đã chọn</Title>
                    <ReactTable
                        data={student_shift && student_shift.getStudentShiftByStudentId}
                        columns={registeredTableColumns}
                        noDataText={loading ? "Loading..." : "Chưa đăng kí ca thi nào"}
                        className="-striped -highlight"
                        defaultPageSize={6}
                        showPageSizeOptions={false}
                    />
                    <Row>
                        <p>{`Tổng số ca thi đã đăng kí: [${student_shift ? student_shift.getStudentShiftByStudentId.length : ''}]`}</p>
                        <PrimaryButton onClick={() => props.history.push('/print')}>Xem và in</PrimaryButton>
                    </Row>
                </Main>
            </Container>
        </SingleColumnGrid>
    );
};

export default compose(
    withCurrentUser,
    withRouter
)(ExamDetailStudent);