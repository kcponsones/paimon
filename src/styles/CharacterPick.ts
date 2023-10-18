import { CharacterDraftDesignProps, ModalPlayerClueProps } from '@/libs/helpers/types'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const ModalCharacterPickBlur = styled(Box)<CharacterDraftDesignProps>`
    filter: blur( ${(props) => (props.ischaractermodalactive === 'true' ? '30px' : '0px')});
    position: relative;
    z-index: 500;
`

export const ModalCharacterPickWrapper = styled(Box)`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 550;
    background-color: rgba(119, 119, 119,0.5)
`;

export const ModalCharacterPlayerClue = styled(Box)<ModalPlayerClueProps>`
    width: 100%;
    height: 100%;

    ${(props) => (props.isactive === 'true' ? (props.drafttype === "pick" ? `
        -webkit-box-shadow: inset -1px 0px 15px 10px rgba(103, 228, 100, 1);
        -moz-box-shadow: inset -1px 0px 15px 10px rgba(103, 228, 100, 1);
        box-shadow: inset -1px 0px 15px 10px rgba(103, 228, 100, 1);
    ` : `
        -webkit-box-shadow: inset -1px 0px 15px 10px rgba(203, 53, 53, 1);
        -moz-box-shadow: inset -1px 0px 15px 10px rgba(203, 53, 53, 1);
        box-shadow: inset -1px 0px 15px 10px rgba(203, 53, 53, 1);
    `) : ``)}

`

export const ModalCharacterPickheader = styled(Box)`
    width: 100%;
    padding: 10px 50px;
    background-color: rgba(31, 35, 65, 0.5);
`

export const ModalCharacterTextHeader = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 18px;
    line-height: 1;
    color: #d0b98c;
` 

export const CharacterVisionButton = styled(Box)<CharacterDraftDesignProps>`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    position: relative;
    cursor: pointer;
    background-color: ${(props) => (props.isselectedeleemnt === 'true' ? '#ece5d8;' : 'transparent;')}
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.25s all;

    ${(props) => (props.isselectedeleemnt === 'false' ? `
        &:hover{
            background-color: rgba(119, 119, 119,0.5);
        }   
    ` : '')}


    & > svg{
        width: 40px;
        height: 40px;
    }

    & > svg > g{
        fill: ${(props) => (props.isselectedeleemnt === 'true' ? '#495366;' : '#b9b4af;')};
    }

    & > svg path{
        fill: ${(props) => (props.isselectedeleemnt === 'true' ? '#495366 !important;' : '#b9b4af !important;')};
    }
` 

export const CharacterPickModalCloseButton = styled(Button)`
   width: 50px;
   height: 50px;
    border-width: 5px;
    border-color: rgb(185, 180, 175);
    border-style: solid;
    border-radius: 100%;
    background-color: rgb(236, 229, 216) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    & > svg{
        width: 20px;
        height: 20px;
    }
`


export const ModalCharacterPickBody = styled(Box)`
    width: 100%;
    height: calc(100vh - 70px);
    padding: 10px;
    overflow: hidden;
`

export const CharacterPickWrapper = styled(Box)`
    width: 100%;
    height: calc(100vh - 175px);
`

export const CharacterListWrapper = styled(Box)`
    width: 100%;
    height: 100%;
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

export const CharacterPickCard = styled(Box)<CharacterDraftDesignProps>`
    width: 100%;
    height: 135px;
    background-color: #e9e5dc;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.8);
    
    ${(props) => (props.ispickedcharacter === 'true' ? `cursor: not-allowed;` : `cursor: pointer;`)};
    overflow: hidden;
    transition: 0.25s all;


    &:hover{
        box-shadow: 0px 0px 12px 0px rgb(253, 245, 231);
        transition: 0.25s all;
    }

    & > div{
        ${(props) => (props.ispickedcharacter === 'true' ? `filter: grayscale(100%);` : ` filter: grayscale(0%);`)};
    }
`

export const CharacterPickCardImg = styled(Box)<CharacterDraftDesignProps>`
    width: 100%;
    height: 110px;
    ${(props) => (props.rarity === '4' ? `
        background-image: -moz-linear-gradient( 90deg, rgb(137,110,170) 0%, rgb(99,95,140) 100%);
        background-image: -webkit-linear-gradient( 90deg, rgb(137,110,170) 0%, rgb(99,95,140) 100%);
        background-image: -ms-linear-gradient( 90deg, rgb(137,110,170) 0%, rgb(99,95,140) 100%);
    ` : `
        background-image: -moz-linear-gradient( 90deg, rgb(186,114,41) 0%, rgb(132,88,50) 100%);
        background-image: -webkit-linear-gradient( 90deg, rgb(186,114,41) 0%, rgb(132,88,50) 100%);
        background-image: -ms-linear-gradient( 90deg, rgb(186,114,41) 0%, rgb(132,88,50) 100%);
    `)};
   
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    z-index: 575;
    


    & > img{
        width: 100%;
        position: relative;
        z-index: 576;
    }
`

export const CharacterPickCardVision = styled(Box)`
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    z-index: 580;
    width: 25px;
    height: 25px;
`

export const CharacterPickCardInfo = styled(Box)`
    width: 100%;
    padding: 5px 0;
`
export const CharacterPickCardInfoText = styled(Text)`
    width: 100%;
    font-size: 0.8vw;
    font-family: 'GenshinFont', sans-serif;
    color: #495366;
    line-height: 1;
    text-align:center;
`

export const CharacterInfoWrapper = styled(Box)`
    width: 100%;
    height: 100%;
    padding: 8px;
`

export const CharacterPickInfoCard = styled(Box)`
    width: 100%;
    background-color: #e9e5dc;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.8);
    overflow:hidden;
    margin-bottom: 15px;
`

export const CharacterPickInfoCardCharacter = styled(Box)<CharacterDraftDesignProps>`
    width: 100%;
    height: 200px;
    position: relative;
    background-color: ${(props) => (props.colorpickedcharacter === '' ? '#1e223f;' : props.colorpickedcharacter)};
    z-index: 575;

    & .character-picked-image-pick{
        transform:scaleX(-1);
        width: 50%;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 585;
    }

    & .character-picked-vision-icon{
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 578;
        width: 175px;
        height: 175px;
    }
`

export const CharacterPickInfoNameWrapper = styled(Box)`    
    position: absolute;
    bottom:0;
    left: 0;
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    background: rgb(255,255,255);
    z-index: 580;
    background: linear-gradient(270deg, transparent 0%, rgba(0,0,0,1) 100%);
`

export const CharacterPickInfoNameText = styled(Text)`
    font-family: 'GenshinFont',sans-serif;
    font-size: 22px;
    line-height: 1;
    padding: 5px 22px;
`

export const CharacterPickInfoCardDetails = styled(Box)`
    width: 100%;
    height: 150px;
    border-top: 3px solid rgb(253, 245, 231);
    padding: 22px;
`
export const CharacterPickInfoCardDetailsText = styled(Text)`
    font-family: 'GenshinFont',sans-serif;
    font-size: 22px;
    line-height: 1;
    color: #3a434f;
`

export const CharacterPickInfoCardHeader = styled(Box)`
    background-color: #1e223f;
    width: 100%;
    height: 40px;
    display: flex;
    align-items:center;
`

export const CharacterPickInfoCardHeaderPlayers = styled(Text)`
    font-family: 'GenshinFont',sans-serif;
    font-size: 14px;
`

export const CharacterPickInfoCardHeaderText = styled(Text)`
    font-family: 'GenshinFont',sans-serif;
    font-size: 18px;
`

export const CharacterPickInfoCardBody = styled(Box)`
    width: 100%;
    height: 125px;
    padding: 12px;
`

export const CharacterDraftPlayerWrapper = styled(Box)<CharacterDraftDesignProps>`
    border-radius: 5px;
    width: 100%;
    height: 100px;
    background-image: -moz-linear-gradient( 90deg, rgb(33,40,44) 0%, rgb(30,34,63) 100%);
    background-image: -webkit-linear-gradient( 90deg, rgb(33,40,44) 0%, rgb(30,34,63) 100%);
    background-image: -ms-linear-gradient( 90deg, rgb(33,40,44) 0%, rgb(30,34,63) 100%);
    ${(props) => (props.currentdraft === 'true' ? (
        props.drafttype === 'pick' ? 'box-shadow: 0px 0px 18px 8px rgba(103, 228, 100, 1);' : 'box-shadow: 0px 0px 18px 8px rgba(203, 53, 53, 1);'
    ): '')}
`

export const CharacterDraftPlayerImg = styled(Box)<CharacterDraftDesignProps>`
    width: 100%;
    height: 100%;

    ${(props) => (props.rarity === '4' ? `
        background-image: -moz-linear-gradient( 90deg, rgb(137,110,170) 0%, rgb(99,95,140) 100%);
        background-image: -webkit-linear-gradient( 90deg, rgb(137,110,170) 0%, rgb(99,95,140) 100%);
        background-image: -ms-linear-gradient( 90deg, rgb(137,110,170) 0%, rgb(99,95,140) 100%);
    ` : `
        background-image: -moz-linear-gradient( 90deg, rgb(186,114,41) 0%, rgb(132,88,50) 100%);
        background-image: -webkit-linear-gradient( 90deg, rgb(186,114,41) 0%, rgb(132,88,50) 100%);
        background-image: -ms-linear-gradient( 90deg, rgb(186,114,41) 0%, rgb(132,88,50) 100%);
    `)};
    display: flex;
    align-items: flex-end;
    justify-content: center;

    & > img{
        width: 100%;
        height: 100%;
       
    }
`

export const BossAvatarCircle = styled(Box)`
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    border: 5px solid #ecdeb5;
    background-color: #ecdeb5;
    z-index: 15;
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)
`

export const BossAvatarNameWrapper = styled(Box)`
    position: absolute;
    width: 100%;
    height: 50px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #ecdeb5;
    border-radius: 33px;
    z-index: 10;
    display: flex;
    align-items:center;
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)
`

export const BossAvatarName = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 22px;
    color: #3e4557;
    margin-left: 110px;
`

export const CharacterDraftButton = styled(Button)<CharacterDraftDesignProps>`
    font-family: 'GenshinFont', sans-serif;
    font-size: 22px;
    width: 100%;
    background-color: ${(props) => (props.drafttype === 'pick' ? '#61b162': ' #95292D')};
    margin-bottom: 10px;
    padding: 28px 0;
    
    ${(props) => (props.drafttype === 'pick' ? `
        &:hover{
            background-color: #61b162;
            box-shadow: 0px 0px 16px 4px rgba(103, 228, 100, 1);
        }
    ` : `
        &:hover{
            background-color: #95292D;
            box-shadow: 0px 0px 18px 8px rgba(203, 53, 53, 1);
        }
    `)}
`


export const CharacterTextFieldSearch = styled(Input)`
    font-size: 22px;
    color: #ecdeb5;
    border-radius: 33px;
    width: 100%;
    transition:  0.2 5s all;
    border: 2px solid #ecdeb5;
    font-family: 'GenshinFont', sans-serif;
    padding: 22px 18px;

    &:focus{
        outline: none !important;
        box-shadow: none;
        border: 2px solid #ecdeb5;
    }
    &:hover{
        border: 2px solid #ecdeb5;
    }

    &::placeholder{
        color: #ecdeb5;
        opacity: 0.5;
    }
`


export const CharacterSearchButton = styled(Button)`
    font-size: 22px;
    color: #495366;
    font-family: 'GenshinFont', sans-serif;
    padding: 22px 50px;
    background-color: #ecdeb5;
    border-radius: 33px;

    &:hover{
        background-color: #ecdeb5;
    }
`





//#495366
//#b9b4af