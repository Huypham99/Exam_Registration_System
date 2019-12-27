import React from 'react';
import { SingleColumnGrid } from '../../components/layout'
import { withCurrentUser } from '../../components/withCurrentUser'
import { Container, Divider } from './style'

const UserSetting = (props) => {

    const { name, email, dob, studentId, program, schoolYear } = props.currentUser

    return (
        <SingleColumnGrid>
            <Container>
                <h1>Profile settings</h1>
                <Divider />
                <p><b>Họ tên: </b>{name}</p>
                <p><b>Email: </b>{email}</p>
                <p><b>Ngày sinh: </b>{dob}</p>
                <p><b>Mã số sinh viên: </b>{studentId}</p>
                <p><b>Chương trình đào tạo: </b>{program}</p>
                <p><b>Khóa đào tạo: </b>{schoolYear}</p>
            </Container>
        </SingleColumnGrid>
    );
};

export default withCurrentUser(UserSetting);