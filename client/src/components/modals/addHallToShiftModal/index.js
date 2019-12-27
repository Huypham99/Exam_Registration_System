import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../actions/modals';
import { createShiftHallMutation } from '../../../graphql/mutations/shift_hall/createShiftHall'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { modalStyles } from '../style'
import ModalContainer from '../modalContainer'
import { PrimaryButton, WarnButton } from '../../button/index'
import { Error } from '../../formElements'
import { Select } from '../../formElements/style'
import { Actions, Wrapper } from '../style'
import { getAllHalls } from '../../../graphql/queries/hall/getHall'
import { Table, Td, Th, Tr, IconWrapper } from '../selectShiftHallModal/style'
import { Label } from '../../globals';
import { removeDirectivesFromDocument } from 'apollo-utilities';

const AddHallModal = () => {
    
    const style = modalStyles()

    const dispatch = useDispatch();
    const close = () => dispatch(closeModal())

    const isOpen = useSelector(state => state.modals.isOpen)
    const shiftId = useSelector(state => state.shift.shiftId)

    const [hallIdList, setHallIdList] = useState([])

    const { data } = useQuery(getAllHalls)

    // A mutation to add halls to a shift
    const [createShiftHall, { loading }] = useMutation(
        createShiftHallMutation
    )

    // Concat hall's id to the array using spread operator
    const handleSelect = (hallId) => setHallIdList([...hallIdList, hallId])

    //Delete a specific hall's id from the array
    const handleUnselect = (hallId) => {
        let index = hallIdList.indexOf(hallId)
        hallIdList.splice(index, 1)
        setHallIdList([...hallIdList])
    }

    // Adding all hall from the array to the shift
    const handleAddHall = async () => {
        await hallIdList.map(hallId => createShiftHall({ variables: { shiftId: shiftId, hallId: hallId } }))
        dispatch(closeModal())
    }

    return (
        <div>
            <Modal
                ariaHideApp={false}
                isOpen={isOpen}
                shouldCloseOnOverlayClick={true}
                closeTimeoutMS={330}
                style={style}
            >
                <ModalContainer title='Thêm phòng thi'>
                    <Wrapper>
                        <Table>
                            <thead>
                                <tr>
                                    <Th>Giang đường</Th>
                                    <Th>Sức chứa</Th>
                                    <Th>Chọn</Th>
                                </tr>
                            </thead>
                            {data && data.getAllHalls.map(hall => (
                                <tbody>
                                    <Tr>
                                        <Td>{hall.name}</Td>
                                        <Td>{hall.capacity}</Td>
                                        <Td>
                                            <IconWrapper>
                                                <PrimaryButton
                                                    onClick={() => hallIdList.includes(hall.id) ? handleUnselect(hall.id) : handleSelect(hall.id)}
                                                >
                                                    {hallIdList.includes(hall.id) ? 'Đã chọn' : 'Chọn'}
                                                </PrimaryButton>
                                            </IconWrapper>
                                        </Td>
                                    </Tr>
                                </tbody>
                            ))}
                        </Table>
                    </Wrapper>
                    <Actions>
                        <WarnButton onClick={() => close()}>Hủy</WarnButton>
                        <PrimaryButton onClick={() => handleAddHall()}>{loading ? 'Hoàn tất...' : 'Hoàn tất'}</PrimaryButton>
                    </Actions>
                </ModalContainer>

            </Modal>
        </div>
    );
};

export default AddHallModal;