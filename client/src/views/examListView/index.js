import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAllExamsQuery } from '../../graphql/queries/exam/getExam'
import { SingleColumnGrid } from '../../components/layout'
import { Link } from 'react-router-dom';
import { Main, ElementWrapper, StyledLink, Divider, Flex } from './style'
import { PrimaryButton } from '../../components/button'
import { useSelector, useDispatch } from 'react-redux'
import { withCurrentUser } from '../../components/withCurrentUser';
import { openModal } from '../../actions/modals';

const ExamListStudent = ({ currentUser }) => {

    const { loading, data } = useQuery(getAllExamsQuery);
    const { isAdmin, name, studentId } = currentUser;

    const dispatch = useDispatch();


    return (
        <SingleColumnGrid>
            <Main>
                <Flex>
                    <h3>DANH SÁCH KÌ THI</h3>
                    {!isAdmin && <p>Chào mừng <b>{`${name} [${studentId}]`}</b>  đến với hệ thống đắng kí thi trực tuyến !!</p>}
                    {isAdmin && <PrimaryButton onClick={() => dispatch(openModal('CREATE_EXAM_MODAL'))}>Tạo mới</PrimaryButton>}
                </Flex>
                <Divider />
                {data && data.getAllExams.map(
                    exam => (
                        <div>
                            <ElementWrapper>
                                <StyledLink to={isAdmin ? `/exam/${exam.id}` : `/exam_registration/${exam.id}`}>
                                    <h2>{`Kì thi  ${exam.name}  năm học  ${exam.academyYear}  hệ  ${exam.trainingSystem}`}</h2>
                                </StyledLink>
                                <p><b>Thời hạn đăng kí: </b>{`${exam.openTime}  ngày  ${exam.openDate}  đến  ${exam.endTime}  ngày  ${exam.endDate}`}</p>
                            </ElementWrapper>
                        </div>
                    )
                )}
            </Main>
        </SingleColumnGrid>
    );
};

export default withCurrentUser(ExamListStudent);