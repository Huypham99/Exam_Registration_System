import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAllExamsQuery } from '../../graphql/queries/exam/getExam'
import { SingleColumnGrid } from '../../components/layout'
import { Link } from 'react-router-dom';
import { Main, ElementWrapper, StyledLink } from './style'
import { PrimaryButton } from '../../components/button'
import { useSelector } from 'react-redux'
import { withCurrentUser } from '../../components/withCurrentUser';

const ExamListStudent = ({ currentUser }) => {

    const { loading, data } = useQuery(getAllExamsQuery);
    const isAdmin = currentUser.isAdmin;

    return (
        <SingleColumnGrid>
            <Main>
                {data && data.getAllExams.map(
                    exam => (
                        <ElementWrapper>
                            <StyledLink to={isAdmin ? `/exam/${exam.id}` : `/exam_registration/${exam.id}`}><h2>{`Kì thi  ${exam.name}  năm học  ${exam.academyYear}  hệ  ${exam.trainingSystem}`}</h2></StyledLink>
                            <PrimaryButton to={isAdmin ? `/exam/${exam.id}` : `/exam_registration/${exam.id}`}>Chi tiết</PrimaryButton>
                        </ElementWrapper>
                    )
                )}
            </Main>
        </SingleColumnGrid>
    );
};

export default withCurrentUser(ExamListStudent);