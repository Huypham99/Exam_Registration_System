import React, { useRef } from 'react';
import { useQuery } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Main, Table, Td, Th, Title, TdCenter, Divider, IconWrapper } from './style'
import { PrimaryButton, WarnButton } from '../../button'
import Icon from '../../icon'
import Modal from 'react-modal';
import { modalStyles, Wrapper, Actions } from '../style'
import ModalContainer from '../modalContainer'
import ReactToPrint from "react-to-print";
import { openModal } from '../../../actions/modals';

const PrintRegStudentsModal = () => {

    const studentId = useSelector(state => state.id)
    const students = useSelector(state => state.studentsList.list)
    const { 
        date, 
        time, 
        dayOfWeek, 
        moduleId, 
        moduleName 
    } = useSelector(state => state.shift)

    const isOpen = useSelector(state => state.modals.isOpen)
    
    const style = modalStyles()

    const dispatch = useDispatch()

    const handleReturn = () => dispatch(openModal('REGISTERED_STUDENTS_MODAL'))

    const componentRef = useRef()

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={330}
            style={style}
        >
            <ModalContainer title='In danh sách sinh viên đã đăng kí'>
                <Main ref={componentRef}>
                    <Table>
                        <tbody>
                            <tr>
                                <TdCenter>ĐẠI HỌC QUỐC GIA HÀ NỘI</TdCenter>
                                <TdCenter><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b></TdCenter>
                            </tr>
                            <tr>
                                <TdCenter><b>TRƯỜNG ĐẠI HỌC CÔNG NGHỆ</b></TdCenter>
                                <TdCenter><b>Độc lập - Tự do - Hạnh phúc</b></TdCenter>
                            </tr>
                        </tbody>
                    </Table>
                    <Divider />
                    <Table>
                        <tbody>
                            <tr>
                                <TdCenter>
                                    <b>DANH SÁCH SINH VIÊN</b>
                                </TdCenter>
                            </tr>
                        </tbody>
                    </Table>
                    <Divider />
                    <Table>
                        <tbody>
                            <tr>
                                <td>Ngày thi</td>
                                <td><b>{date}</b></td>
                                <td>Giờ thi</td>
                                <td><b>{time}</b></td>
                                <td>Thứ</td>
                                <td><b>{dayOfWeek}</b></td>
                            </tr>
                            <tr>
                                <td>Môn thi</td>
                                <td><b>{moduleName}</b></td>
                                <td>Mã Môn Thi</td>
                                <td><b>{moduleId}</b></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Divider />
                    <Table>
                        <thead>
                            <tr>
                                <Th>Họ tên</Th>
                                <Th>Email</Th>
                                <Th>Ngày sinh</Th>
                                <Th>Mã số sinh viên</Th>
                                <Th>Khóa</Th>
                                <Th>Ghi chú</Th>
                            </tr>
                        </thead>
                        {students.map(student => (
                            <tbody>
                                <tr>
                                    <Td>{student.name}</Td>
                                    <Td>{student.email}</Td>
                                    <Td>{student.dob}</Td>
                                    <Td>{student.studentId}</Td>
                                    <Td>{student.schoolYear}</Td>
                                    <Td></Td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                    <Divider />
                    <Table>
                        <tbody>
                            <tr>
                                <TdCenter><b>Cán bộ coi thi</b></TdCenter>
                                <TdCenter>Hà Nội, ngày ..... tháng ..... năm 2019</TdCenter>
                            </tr>
                            <tr>
                                <TdCenter><i>(Ký và ghi rõ họ tên)</i></TdCenter>
                                <TdCenter><b>XÁC NHẬN CỦA PHÒNG ĐÀO TẠO</b></TdCenter>
                            </tr>
                        </tbody>
                    </Table>
                </Main>
                <Actions>
                    <WarnButton onClick={() => handleReturn()}>Quay lại</WarnButton>
                    <ReactToPrint
                        trigger={() => (
                            <PrimaryButton>
                                <IconWrapper><Icon glyph='printer' size='20' /></IconWrapper>
                                In kết quả
                            </PrimaryButton>
                        )}
                        content={() => componentRef.current}
                    />
                </Actions>
            </ModalContainer>
        </Modal>
    );
};

export default PrintRegStudentsModal;