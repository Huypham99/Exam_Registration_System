import React from 'react';
import { Actions } from './style'
import { PrimaryButton, WarnButton } from '../../components/button'

const TableActions = ({ editFunc, deleteFunc }) => {
    return (
        <Actions>
            <PrimaryButton onClick={() => editFunc()}>Sửa</PrimaryButton>
            <WarnButton onClick={() => deleteFunc()}>Xóa</WarnButton>
        </Actions>
    );
};

export default TableActions;