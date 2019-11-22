import React from 'react';
import { SingleColumnGrid } from '../../components/layout'
import { useQuery } from '@apollo/react-hooks'
import { getStudentShiftByStudentIdQuery } from '../../graphql/queries/student_shift/getStudentShift'
import { getUserByIdQuery } from '../../graphql/queries/user/getUser'
import { useSelector } from 'react-redux'
import { Main, Table, Td, Th, Title, TdCenter, Divider, IconWrapper } from './style'
import { TitleWrapper, Container } from '../../components/table/style'
import { PrimaryButton } from '../../components/button'
import Icon from '../../components/icon'
const PrintExam = () => {

    const studentId = useSelector(state => state.id)

    const { data, loading } = useQuery(getStudentShiftByStudentIdQuery, { variables: { studentId: studentId } });
    const { data: user } = useQuery(getUserByIdQuery, { variables: { id: studentId } });

    return (
        <SingleColumnGrid>
            <Container>
                <TitleWrapper>
                    <h1>In đăng kí thi</h1>
                    <PrimaryButton>
                        <IconWrapper><Icon glyph='printer' size='20' /></IconWrapper>
                        In kết quả
                    </PrimaryButton>
                </TitleWrapper>
                <Main>
                    <Table>
                        <tr>
                            <TdCenter>ĐẠI HỌC QUỐC GIA HÀ NỘI</TdCenter>
                            <TdCenter><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b></TdCenter>
                        </tr>
                        <tr>
                            <TdCenter><b>TRƯỜNG ĐẠI HỌC CÔNG NGHỆ</b></TdCenter>
                            <TdCenter><b>Độc lập - Tự do - Hạnh phúc</b></TdCenter>
                        </tr>
                    </Table>
                    <Divider />
                    <Table>
                        <tr>
                            <TdCenter>
                                <b>KẾT QUẢ ĐĂNG KÍ THI</b>
                            </TdCenter>
                        </tr>
                    </Table>
                    <Divider />
                    <Table>
                        <tr>
                            <td>Họ và tên</td>
                            <td><b>{user && user.getUserById.name}</b></td>
                            <td>Ngày sinh</td>
                            <td><b>{user && user.getUserById.dob}</b></td>
                            <td>Mã số sinh viên</td>
                            <td><b>{user && user.getUserById.studentId}</b></td>
                        </tr>
                        <tr>
                            <td>Chương trình đào tạo</td>
                            <td><b>{user && user.getUserById.program}</b></td>
                            <td>Khóa</td>
                            <td><b>{user && user.getUserById.schoolYear}</b></td>
                        </tr>
                    </Table>
                    <Divider />
                    <Table>
                        <tr>
                            <Th>STT</Th>
                            <Th>Thời gian</Th>
                            <Th>Thứ</Th>
                            <Th>Ngày</Th>
                            <Th>Mã HP</Th>
                            <Th>Học Phần</Th>
                            <Th>Giang đường</Th>
                        </tr>
                        {data && data.getStudentShiftByStudentId.map((student_shift, index) => (
                            <tr>
                                <Td>{index + 1}</Td>
                                <Td>{student_shift.shiftHalls.shiftDetail.time}</Td>
                                <Td>{student_shift.shiftHalls.shiftDetail.dayOfWeek}</Td>
                                <Td>{student_shift.shiftHalls.shiftDetail.date}</Td>
                                <Td>{student_shift.shiftHalls.shiftDetail.module.moduleId}</Td>
                                <Td>{student_shift.shiftHalls.shiftDetail.module.name}</Td>
                                <Td>{student_shift.shiftHalls.hallDetail.name}</Td>
                            </tr>
                        ))}
                    </Table>
                    <Divider />
                    <Table>
                        <tr>
                            <TdCenter><b>SINH VIÊN</b></TdCenter>
                            <TdCenter>Hà Nội, ngày ..... tháng ..... năm 2019</TdCenter>
                        </tr>
                        <tr>
                            <TdCenter><i>(Ký và ghi rõ họ tên)</i></TdCenter>
                            <TdCenter><b>XÁC NHẬN CỦA PHÒNG ĐÀO TẠO</b></TdCenter>
                        </tr>
                    </Table>
                </Main>
            </Container>
        </SingleColumnGrid>
    );
};

export default PrintExam;