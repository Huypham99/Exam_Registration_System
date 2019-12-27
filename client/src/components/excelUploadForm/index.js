import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { UploadExcelForm, UploadButton } from './style'
import { Error } from '../formElements'
import { WarnButton, PrimaryButton } from '../../components/button/index'
import { setRender } from '../../actions/examDetailRender'

const ExcelUploadForm = (props) => {

    const [file, setFile] = useState(null)
    const [display, setDisplay] = useState(false)
    const [serverError, setServerError] = useState(null)
    const [loading, setLoading] = useState(null)

    const dispatch = useDispatch()

    const { api } = props

    const uploadExcel = () => {

        let formData = new FormData();

        formData.append('file', file);

        setLoading(true)

        axios.post(`http://localhost:4000/${api}`, formData)
            .then(res => res && setLoading(false))
            .then(res => res && alert('Tải lên thành công, vui lòng tải lại trang !!'))
            .catch((error) => {
                alert(error.response.data.error)
                setDisplay(true)
                setLoading(false)
            })
    }

    const chooseFile = (e) => {
        const file = e.target.files[0]
        console.log(file)
        setFile(file)
    }

    const displayUploadForm = () => setDisplay(true);
    const cancelUploadForm = () => (setDisplay(false), setServerError(null));

    return (
        <UploadButton>
            <PrimaryButton onClick={() => displayUploadForm()}>
                Upload Excel File
            </PrimaryButton>
            <UploadExcelForm display={display.toString()}>
                <form encType="multipart/form-data">
                    <input type='file' accept='.csv' onChange={chooseFile} />
                </form>
                <PrimaryButton onClick={uploadExcel} disabled={!file}>{
                    loading ? 'Tải lên...' : 'Tải lên'
                }</PrimaryButton>
                <WarnButton onClick={() => cancelUploadForm()}>Hủy</WarnButton>
            </UploadExcelForm>
        </UploadButton>
    )
};

export default ExcelUploadForm;