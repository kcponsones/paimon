import { DraftPositionProps } from '@/libs/helpers/types'
import { Box, Button, Image, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const BossDraftContainer = styled(Box)`
    width: 200px;
    height: 100px;
    background-color: #ecdeb5;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    margin-inline-start: 0rem !important;
`

export const BossDraftWrapper = styled(Box)`
    width: 100%;
    height: 85px;
    position:relative;
    z-index: 30;
    background-color: #1E223F;
    display: flex;
    align-items: flex-end;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    & > img{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 35;
    }
`
export const BossNameWrapper = styled(Box)`
    position: relative;
    z-index: 50;
    width: 100%;
    height: 30px;
    display: flex;
    background:linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%);
    color: white;
    font-family: 'GenshinFont', sans-serif;
    text-align:center;
    justify-content: center;
    align-items: flex-end;
    font-size: 14px;
`

export const BanCharactersListContainer = styled(Box)<DraftPositionProps>`
    height: 85px;
    background-color: #ecdeb5;
    margin-inline-start: 0rem !important;
    display: flex;
    ${(props) => (props.aligndraft === 'left' ? 'border-bottom-left-radius: 15px;' : 'border-bottom-right-radius: 15px;')}
    justify-content:  ${(props) => (props.aligndraft === 'left' ? 'flex-end' : 'flex-start')};
    ${(props) => (props.statusdraft === 'none' ? null : 'box-shadow: 0px 0px 16px 4px rgba(203, 53, 53, 1);background-color: #c93535;')}
   overflow: hidden;
` 

export const BanCharactersListWrapper = styled(Box)`
    height: 100%;
    background-color: inherit;
    position: relative;
    z-index: 10;
`

export const BanCharacterWrapper = styled(Box)<DraftPositionProps>`
    position: absolute;
    ${(props) => (props.aligndraft === 'left' ? 'right: 0;' : 'left: 0;')}
    top: 0;
    width: ${(props) => (props.widthcharacter)};
    height: 85px;
    background-color: ${(props) => (props.colorcharacter !== ""? props.colorcharacter : '#1e223f')};
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    ${(props) => (props.aligndraft === 'left' ? 'border-bottom-left-radius: 15px;' : 'border-bottom-right-radius: 15px;')}
    z-index:${(props) => (props.indexcharacter)};
    overflow:hidden;
    display: flex;
    justify-content:  ${(props) => (props.aligndraft === 'left' ? 'flex-start' : 'flex-end')};
`

export const DraftRerollBanner = styled(Box)`
    font-family: 'GenshinFont', sans-serif;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.004);
    width: 250px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
`

export const DraftCountdownCard = styled(Box)`
    width: 200px;
    height: 100px;
    background-color: #ecdeb5;
    border-radius:15px;
    overflow: hidden;
`

export const DraftCountdownCardWrapper = styled(Box)`
    background-color: #1e223f;
    width: 165px;
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const DraftCountdownText = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 4rem;
    line-height: 1;
`


export const DraftPlayersNamePlate = styled(Box)`
    width: 100%;
    position: relative;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #ecdeb5;
    z-index: 20;
    display: flex;
    flex-direction: row;
    padding: 4px 0;
` 

export const DraftPlayerTextWrapper = styled(Box)<DraftPositionProps> `
    position: relative;
    width: 43%;
    display: flex;
    justify-content: ${(props) => (props.aligndraft === 'left' ? 'flex-start' : 'flex-end')}
    
`    
export const DraftPlayerText = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 2rem;
    color:#3c343d;
    width: 100%;
    text-align:center;
`    

export const DraftPlayerVersusWrapper = styled(Box)`
    width: 150px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #1e223f;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    z-index: 25;
    text-align:center;
`

export const DraftPlayerVersusText = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 3.5rem;
    padding-top: 10px;
`

export const DraftPickBanner = styled(Box)<DraftPositionProps>`
    width: 100%;
    height: 95px;
    border-radius: 15px;
    background-color: #ecdeb5;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    position: relative;

    ${(props) => (props.currentpickdraft === 'true' ? (props.aligndraft === 'left' ? `
    &::before{
        content: '';
        width: 25px;
        height: 100%;
        background-color: rgb(103, 228, 100);
        box-shadow: 0px 0px 16px 4px rgba(103, 228, 100, 1);
        position: absolute;
        top: 0;
        left: 0;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        
    }
` : `
    &::after{
        content: '';
        width: 25px;
        height: 100%;
        background-color: rgb(103, 228, 100);
        box-shadow: 0px 0px 16px 4px rgba(103, 228, 100, 1);
        position: absolute;
        top: 0;
        right: 0;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
    }
`) : '')};
` 

export const DraftPickBannerWrapper = styled(Box)`
    background-color: #1e223f;
    width: 96%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    
` 

export const DraftCharacterPickBanner = styled(Box)<DraftPositionProps>`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content:  ${(props) => (props.aligndraft === 'left' ? 'flex-start' : 'flex-end')};
    background-color: ${(props) => (props.colorcharacter)};
    overflow: hidden;
    position: relative;
`

export const DraftCharacterContainer = styled(Box)<DraftPositionProps>`
    width: 57.5%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content:  ${(props) => (props.aligndraft === 'left' ? 'flex-start' : 'flex-end')};
    z-index: 12;

    &  .character-img-pick{
        position: absolute;
        top: 0;
        ${(props) => (props.aligndraft === 'left' ? 'left: 0;' : 'right: 0;')}
        ${(props) => (props.aligndraft === 'right' ? 'transform:scaleX(-1)' : '')};
        z-index: 22;
        width: 60%;
    }

    & .character-vision-icon{
        position: absolute;
        bottom: 0;
        ${(props) => (props.aligndraft === 'left' ? 'right: 15px;' : 'left: 15px;')}
        width: 100px;
        height: 100px;
        z-index: 15;
    }

    & .character-name-wrapper{
         ${(props) => (props.aligndraft === 'left' ? 'left: 0;' : 'right: 0;')}
         background: linear-gradient(${(props) => (props.aligndraft === 'left' ? '45deg' : '270deg')}, transparent 0%, rgba(0,0,0,1) 100%);
        z-index: 17;
    }


    & div p{
        ${(props) => (props.aligndraft === 'left' ? 'padding-right: 165px;text-align: right;' : 'padding-left: 165px;text-align: left;')}
    }
`

export const DraftCharacterNameWrapper = styled(Box)`
    position: absolute;
    bottom:0;
    width: 140%;
    padding-top: 5px;
    padding-bottom: 5px;
    background: rgb(255,255,255);
    
`

export const DraftCharacterName = styled(Text)`
    font-family: 'GenshinFont',sans-serif;
    font-size: 14px;
    line-height: 1;
`

export const DraftBossCard = styled(Box)`
    width: 525px;
    height: 525px;
    border-radius: 100%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    z-index: 20;
    background-color: #ecdeb5;   
    border: 10px solid #ecdeb5;   
    margin-top: 0 !important;
    overflow: hidden;
`

export const DraftBossCardBGImg = styled(Image)`
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    z-index: 30;
`

export const BossChooseWrapper = styled(Box)`
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background-color: #ecdeb5;
    margin-bottom: 25px;
    overflow: hidden;
    border: 5px solid  #ecdeb5;
`

export const BossChooseText = styled(Text)`
    font-family: 'GenshinFont',sans-serif;
    line-height: 1.2;
    text-align: center;
`

export const BossModalButtons = styled(Button)`
    font-family: 'GenshinFont',sans-serif;
    line-height: 1.2;
    color: #495366;
    background-color: #ecdeb5;
    border-radius: 33px;
    font-size: 1.5rem;
    padding: 28px 50px;

    &:hover{
        background-color: #ecdeb5 !important;
    }

    &:focus{
        outline: none !important;
        box-shadow: none;
        border: 2px solid #ecdeb5;
    }
`

export const DraftButtonStart = styled(Button)`
    font-family: 'GenshinFont',sans-serif;
    background-color: #1E223F;
    border-radius: 100%;
    font-size: 30px;
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    z-index: 0;
    position: relative;

    & > svg{
        width: 150px;
        height: 150px;
    }

    &:before{
        content: '';
        background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
        position: absolute;
        top: -10px;
        left:-10px;
        background-size: 400%;
        z-index: -1;
        filter: blur(15px);
        width: calc(100% + 35px);
        height: calc(100% + 35px);
        animation: glowing 20s linear infinite;
        opacity: 0;
        transition: opacity .3s ease-in-out;
        border-radius: 100%;
    }

    &:active{
        color: white
    }
    &:hover:before {
        opacity: 1;
    }
    &:active:after {
        background: transparent;
    }

    &:after {
        z-index: -1;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: #1E223F;
        left: 0;
        top: 0;
        border-radius: 100%;
    }
    
    @keyframes glowing {
        0% { background-position: 0 0; }
        50% { background-position: 400% 0; }
        100% { background-position: 0 0; }
    }

`