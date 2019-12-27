import React from 'react';
import { withCurrentUser } from '../../components/withCurrentUser';
import { PrimaryButton } from '../../components/button'
import { SingleColumnGrid } from '../../components/layout'
import { Container, Divider } from './style'
import { withRouter } from 'react-router-dom';

const UserDashboard = (props) => {

    const { name, studentId } = props.currentUser

    return (
        <SingleColumnGrid>
            <Container>
                <p>Chào mừng <b>{`${name} [${studentId}]`}</b>  đến với hệ thống đắng kí thi trực tuyến !!</p>
                <Divider />
                <PrimaryButton
                    onClick={() => props.history.push('/exams')}
                >Bắt đầu đăng kí thi</PrimaryButton>
            </Container>
        </SingleColumnGrid>
    );
};

export default withCurrentUser(withRouter(UserDashboard));