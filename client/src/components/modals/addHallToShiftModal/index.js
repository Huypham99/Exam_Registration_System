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
import { Label } from '../../globals';

const AddHallModal = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(state => state.modals.isOpen)
    const shiftId = useSelector(state => state.shift.shiftId)

    const close = () => dispatch(closeModal());

    const { data } = useQuery(getAllHalls);
    //const isLoading = networkStatus === 1 || networkStatus === 2;

    const [createShiftHall, { loading }] = useMutation(
        createShiftHallMutation
    );

    const [inputHall, setInputHall] = useState('')
    const [hallError, setHallError] = useState(false)

    const changeHall = e => {
        let hallId = e.target.value;
        setInputHall(hallId)
        setHallError(false)
    };

    const handleAddHall = async () => {
        if (!inputHall || inputHall.length === 0) { return setHallError(true) }
        await createShiftHall({ variables: { shiftId: shiftId, hallId: inputHall } });
        dispatch(closeModal())
    }

    const style = modalStyles();

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
                        <Label>
                            <Select onChange={changeHall}>
                                <option value="" selected disabled hidden>Chọn phòng thi</option>
                                {data && data.getAllHalls.map(hall => (
                                    <option value={hall.id}>{`${hall.name} - ${hall.capacity} máy`}</option>
                                ))}
                            </Select>
                            {hallError ? <Error>Vui lòng chọn phòng thi</Error> : ''}
                        </Label>
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