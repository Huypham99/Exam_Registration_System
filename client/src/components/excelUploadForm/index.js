import React, { useState } from 'react';
import axios from 'axios';

import { UploadExcelForm, UploadButton } from './style'
import { WarnButton, PrimaryButton } from '../../components/button/index'

const ExcelUploadForm = (props) => {

    const [file, setFile] = useState('')
    const [display, setDisplay] = useState(false)

    const { api } = props

    const uploadExcel = (e) => {

        e.preventDefault()

        let formData = new FormData();

        formData.append('file', file);

        axios.post(`http://localhost:4000/${api}`, formData).catch((err) => console.log('error: ', err))

        setDisplay(false)
    }

    const chooseFile = (e) => {
        const file = e.target.files[0]
        console.log(file)
        setFile(file)
    }

    const displayUploadForm = () => setDisplay(true);
    const cancelUploadForm = () => setDisplay(false);

    return (
        <UploadButton>
            <PrimaryButton onClick={() => displayUploadForm()}>
                Upload Excel File
            </PrimaryButton>
            <UploadExcelForm display={display.toString()}>
                <form encType="multipart/form-data" onSubmit={uploadExcel}>
                    <input type='file' accept='.csv' onChange={chooseFile} />
                </form>
                <PrimaryButton onClick={uploadExcel} disabled={!file}>Upload</PrimaryButton>
                <WarnButton onClick={() => cancelUploadForm()}>Cancel</WarnButton>
            </UploadExcelForm>
        </UploadButton>
    )
};

export default ExcelUploadForm;