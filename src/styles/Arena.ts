import { Box, Checkbox, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'


export const AvatarCircle = styled(Box)`
    position: relative;
    width: 75px;
    height: 75px;
    border-radius: 100%;
    overflow: hidden;
    border: 5px solid #ecdeb5;
    background-color: #ecdeb5;
    z-index: 15;
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)

    ${(props? : any) => (props.isplayerasuser === "true" ? 'background-color: rgb(103, 228, 100);  box-shadow: 0px 0px 16px 4px rgba(103, 228, 100, 1);' : '')};
`

export const AvatarNameWrapper = styled(Box)`
    position: absolute;
    width: 100%;
    height: 45px;
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

export const AvatarName = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 20px;
    color: #3e4557;
    margin-left: 85px;
`

export const ArenaCard = styled(Box)`
    width: 100%;
    margin-bottom: 20px;
    background-color: #ecdeb5;
    border-radius:15px;
    overflow: hidden;
    box-shadow: 0 8px 17px 2px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
`

export const AreaCardWrapper = styled(Box)`
    background-color: #1e223f;
    height: 100%;
    width: ${(props? : any) => (props.widthgap)};
    margin: auto;
    border: 5px solid #1e223f;
`

export const ArenaPaddingWrap = styled(Box)`
    padding: 25px 40px 0 40px;
`

export const ArenaTitleText = styled(Text)`
    font-family: 'GenshinFont', sans-serif;
    font-size: 2rem;
    color: #ecdeb5;
    margin-bottom: 20px;
`

export const ArenaPlayersListScroll = styled(Box)`
    width: 100%;
    height: ${(props? : any) => (props.heightarea)};
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
        
    }
    &::-webkit-scrollbar-track {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ecdeb5;
    }
`

export const ArenaChooseModeWrapper = styled(Box)`
    width: 100%;
    margin-inline-start: 0 !important;
`

export const ArenaChooseModeBox = styled(Box)`
    width: 100%;
    cursor: pointer;
    border: 3px solid #ecdeb5;
    display: flex;
    align-items:center;
    justify-content: center;
    padding: 8px 0px;
    font-family: 'GenshinFont', sans-serif;
    font-size: 22px;
`

export const ArenaBossCircleWrapper = styled(Box)`
    width: 100px;
    height: 100px;
    background-color: #ecdeb5;
    border-radius: 100%;
    overflow: hidden;
    border: 5px solid #ecdeb5;
`

export const ArenaCheckbox = styled(Checkbox)`

    & > .chakra-checkbox__control{
        width: 25px;
        height: 25px;
        margin-right: 10px;
    }
    & > .chakra-checkbox__control[data-checked]{
        background: #ecdeb5;   
        border-color: #ecdeb5; margin-right: 10px;
    }

    & > .chakra-checkbox__label{
        font-size: 18px;
        color: #ecdeb5;    
        font-family: 'GenshinFont', sans-serif
    }
`


