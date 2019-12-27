import React from 'react';
import { SingleColumnGrid } from '../../components/layout'
import { withCurrentUser } from '../../components/withCurrentUser'

const UserSetting = (props) => {
    
    const { name, email, dob, studentId, program, schoolYear } = props.currentUser

    return (
        <SingleColumnGrid>
            <h1>Profile settings</h1>
            <p><b>Họ tên: </b>{name}</p>
            <p><b>Họ tên: </b>{dob}</p>
            <p><b>Mã số sinh viên: </b>{studentId}</p>
            <p><b>Chương trình đào tạo: </b>{program}</p>
            <p><b>Khóa đào tạo: </b>{schoolYear}</p>
        </SingleColumnGrid>
    );
};

export default withCurrentUser(UserSetting);