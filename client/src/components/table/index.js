import React from 'react';
import { SingleColumnGrid } from '../../components/layout'

import { Container, TitleWrapper, TitleActions, CreateButton, Main } from './style'
import { PrimaryButton } from '../../components/button'
import ExcelUploadForm from '../../components/excelUploadForm'

import ReactTable from "react-table";
import 'react-table/react-table.css'

const Table = (props) => {

    const { data, isLoading, columns, title, api, createFunc, isExcel, isCreateNew } = props;

    return (
        <SingleColumnGrid>
            <Container>
                <TitleWrapper>
                    <h1>{title}</h1>
                    <TitleActions>
                        {(isExcel && api) && <ExcelUploadForm api={api} />}
                        {
                            isCreateNew &&
                            <CreateButton>
                                <PrimaryButton onClick={() => createFunc()}>Create New</PrimaryButton>
                            </CreateButton>
                        }
                    </TitleActions>
                </TitleWrapper>
                <Main>
                    <ReactTable
                        data={data}
                        columns={columns}
                        noDataText={isLoading ? "Loading..." : "Không có dữ liệu 😭"}
                        className="-striped -highlight"
                    />
                </Main>
            </Container>
        </SingleColumnGrid>
    )
};

export default Table;