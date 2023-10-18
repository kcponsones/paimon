import { CharacterDraftDesignProps } from '@/libs/helpers/types'
import { Box, Button, IconButton, Tab } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const SettingsTabs = styled(Tab)`
    font-family: 'GenshinFont',sans-serif;
    color: #ecdeb5;
    font-size: 18px;
`
export const SettingsProfileAvatarWrapper = styled(Box)`
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background-color: #ecdeb5;
    margin-bottom: 25px;
    overflow: hidden;
    border: 5px solid  #ecdeb5;
`

export const TableTextFont = styled.p`
    font-family: 'GenshinFont',sans-serif;
    color: #ecdeb5;
`

export const AccountAvatar = styled(Box)`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #ecdeb5;
    overflow: hidden;
    border: 5px solid  #ecdeb5;
`

export const TableFeaetureButton = styled(IconButton)`
   background-color: rgb(97,177,98);
   border-radius: 100%;

   &:hover{
        background-color: rgb(97,177,98);
   }
`
export const BosstAvatarWrapper = styled(Box)`
    width: 200px;
    height: 200px;
    border-radius: 100%;
    background-color: #ecdeb5;
    overflow: hidden;
    border: 5px solid  #ecdeb5;
    display: flex;
    align-items:center;
    justify-content: center;
`

export const BosstAvatarWrapperMini = styled(Box)`
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background-color: #ecdeb5;
    overflow: hidden;
    border: 5px solid  #ecdeb5;
    display: flex;
    align-items:center;
    justify-content: center;
    cursor: pointer;
`

export const BossCard = styled(Box)`
    width: 290px;
    height: 290px;
    border-radius: 100%;
    z-index: 20;
    background-color: #ecdeb5;   
    border: 10px solid #ecdeb5;   
    overflow: hidden;
`

export const ButtonPlayCharacters = styled(Button)<CharacterDraftDesignProps>`
    background-color: ${(props) => (props.drafttype === 'pick' ? '#61b162' : '#95292d')};
    font-family: 'GenshinFont',sans-serif;
    font-size: 20px;
    width: 100%;
    padding: 28px 0;

    &:hover{
        background-color: ${(props) => (props.drafttype === 'pick' ? '#61b162' : '#95292d')};
        ${(props) => (props.drafttype === 'pick' ? 'box-shadow: 0px 0px 18px 8px rgba(103, 228, 100, 1);' : 'box-shadow: 0px 0px 18px 8px rgba(203, 53, 53, 1);')}
    }
`

export const CharacerListSettingWrapper = styled(Box)`
    width: 100%;
    height: 550px;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ecdeb5;
    }
`


export const GeneratePasswordButton = styled(Button)`
    font-family: 'GenshinFont',sans-serif;
    font-size: 20px;
    width: 100%;
    padding: 28px 0;
    background-color: #0D47A1;
    margin-bottom: 25px;

    &:hover{
        background-color: #0D47A1;
        box-shadow: 0px 0px 18px 8px #0D47A1;
    }
`


export const AudioUploadButton = styled(Button)`
    font-family: 'GenshinFont',sans-serif;
    font-size: 20px;
    width: 100%;
    padding: 28px 0;
    color: #1E223F;
    background-color: #ECDEB5;

    &:hover{
        background-color: #ECDEB5;
    }
`