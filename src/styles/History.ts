import { Box, Button, IconButton, Table, TableCaption, TableContainer, Text, Thead } from "@chakra-ui/react";
import styled from "@emotion/styled";

type ActivePaginationButtonProps = {
    isactive: string
}

export const HistoryCard = styled(Box)`
    width: 100%;
    background-color: #ecdeb5;
    border-radius:15px;
    overflow: hidden;
    box-shadow: 0 8px 17px 2px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
`

export const HistoryCardWrapper = styled(Box)`
    background-color: #1e223f;
    height: 100%;
    width: 96%;
    margin: auto;
    border: 5px solid #1e223f;
`

export const HistoryPaddingWrap = styled(Box)`
    padding: 25px 40px;
`

export const HistoryTitleText = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 2.5rem;
    color: #ecdeb5;
    margin-bottom: 25px;
`

export const HistoryTableContainer = styled(TableContainer)`
    &::-webkit-scrollbar {
        height: 8px;            
        width: 8px;             
    }
    &::-webkit-scrollbar-thumb:horizontal{
        background: #ecdeb5;
        border-radius: 10px;
    }
`

export const HistoryTable = styled(Table)`
    &::-webkit-scrollbar {
        height: 4px;            
        width: 4px;             
        border: 1px solid #d5d5d5;
    }
    &::-webkit-scrollbar-thumb:horizontal{
        background: #ecdeb5;
        border-radius: 10px;
    }

    & tbody tr{
        cursor: pointer;
    }
    & tbody tr:hover{
        transition: 0.4s background-color;
        background-color: rgba(255,255,255, 0.2)
        
    }
   
`
export const HistoryTableHead = styled(Thead)`
    background-color: #ecdeb5;
    overflow: hidden;

    & th:first-of-type{
        border-top-left-radius: 12px;
    }

    & th:last-of-type{
        border-top-right-radius: 12px;
    }

    & th {
        font-family: 'GenshinFont', sans-serif;
        font-size: 1.1rem;
        color: #1e223f;
        padding: 18px 22px;
        text-align: left;
    }
`

export const HistoryTableBossAvatar = styled(Box)`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #ecdeb5;
    overflow: hidden;
`

export const HistoryTablePlayerAvatar = styled(Box)`
    width: 45px;
    height: 45px;
    border-radius: 100%;
    background-color: #ecdeb5;
    margin-right: 10px;
    overflow: hidden
`

export const HistoryTablePlayerText = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 16px;
    color: white;
`

export const HistoryTableCharacterAvatar = styled(Box)`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #ecdeb5;
    margin-right: 10px;
    overflow: hidden;
    border: 3px solid #ecdeb5;
`

export const HistoryTableCaption = styled(TableCaption)`
    font-family: 'GenshinFont', sans-serif;
`

export const HistoryPaginationButton = styled(Button)<ActivePaginationButtonProps>`
    border-radius: 100%;
    font-family: 'GenshinFont', sans-serif;

    ${(props) => (props.isactive === "true" ? `
        background-color:  #ecdeb5;

        &:hover{
            background-color: #ecdeb5;
        }
        color: #1e223f;
    ` : `
    color: white;
    `)};

`

export const HistoryPaginationIconButton = styled(IconButton)`
    border-radius: 100%;
    font-family: 'GenshinFont', sans-serif;
    background-color:  #ecdeb5;

    &:hover{
        background-color: #ecdeb5;
    }

    & > svg > path{
        fill: #1e223f;
    }
`