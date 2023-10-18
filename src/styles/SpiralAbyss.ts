import { Box, Button, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'


type CharacterCardProps = {
    typedraft: 'ban' | 'pick'
    iscurrentdraftpos: string
}

type DraftContainerProps = {
    isactive: string
}

type CharacterRarityColor = {
    rarity: string | null
}


export const SpiralAbyssCard = styled(Box)`
    width: 100%;
    height: 70%;
    background-color: #ecdeb5;
    border-radius: 15px;
    overflow: hidden;
    margin-top: 25px !important;
`

export const SpiralAbyssCardWrapper = styled(Box)`
    background-color: #1e223f;
    width: 96.5%;
    height: 100%;
    margin: auto;
    padding: 18px;
`

export const DraftSpiralAbyssCard = styled(Box)<CharacterCardProps>`
    width: 115px;
    height: 140px;
    background-color: white;
    border-radius: 8px;
    position: relative;
    z-index: 25;


    ${(props) => (props.iscurrentdraftpos === 'true' ? 
        props.typedraft === 'pick' ? `
        -webkit-box-shadow: -1px 0px 15px 10px rgba(103, 228, 100, 1);
        -moz-box-shadow:  -1px 0px 15px 10px rgba(103, 228, 100, 1);
        box-shadow: -1px 0px 15px 10px rgba(103, 228, 100, 1);
            
        ` : `
        -webkit-box-shadow: -1px 0px 15px 10px rgba(203, 53, 53, 1);
        -moz-box-shadow: -1px 0px 15px 10px rgba(203, 53, 53, 1);
        box-shadow: -1px 0px 15px 10px rgba(203, 53, 53, 1); 
        `
    : null)};
`

export const DraftSpiralAbyssWrapper = styled(Box)<CharacterRarityColor>`
    position: absolute;
    top: 0;
    left: 0;
    ${(props) => (props.rarity === 'null' ? `background-color: #696C73` : (props.rarity === '5' ? 'background-image: linear-gradient( 90deg, rgb(186,114,41) 0%, rgb(132,88,50) 100%);' : 'background-image: linear-gradient( 90deg, rgb(137,110,170) 0%, rgb(99,95,140) 100%);'))};
    width: 100%;
    height: 82.5%;
    z-index: 30;


    & > svg.spiral-abyss-char-wrapper{
        width: 100%;
        height: 100%;
        z-index: 31;
    }

    & > svg.spiral-abyss-character-icon{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 35;
        width: 40px;
        height: 40px;
    }

    & > img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -47%);
    }

    & > .vision-logo{
        position: absolute;
        top: 2.5px;
        left: 2.5px;
        z-index: 580;
        width: 25px;
        height: 25px;
    }
`

export const DraftSpiralAbyssCharacterName = styled(Box)`
    font-family: 'GenshinFont',sans-serif;
    color: black;
    font-size: 0.9rem;
    text-align:center;
    position: absolute;
    width: 100%;
    height: 17.5%;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 10%);
`

export const SpiralAbyssLabelText = styled(Text)`
    font-family: 'GenshinFont',sans-serif;
    color: white;
    font-size: 1.2rem;
    text-align:center;
`

export const SpiralAbyssDraftCard = styled(Box)`
    filter: blur(30px);
    position: relative;
    z-index: 400;
`
export const SpiralAbyssDraftCharacterSide = styled(Box)<DraftContainerProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 35%;
    height: 100vh;
    z-index: 425;
    background-color: #1e223f;
    transition: 0.25s all;
    padding: 8px 15px;
    transform: ${(props) => (props.isactive === 'true' ? ` translateX(0%);` : ` translateX(-100%);`)}
`

export const SpiralAbyssCharacterListWrapper = styled(Box)`
    width: 100%;
    height: calc(100vh - 210px);
    overflow-x: hidden;
    overflow-y: auto;
    margin-bottom: 10px;

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

export const SpiralAbyssStartButton = styled(Button)`
    font-family: 'GenshinFont',sans-serif;
    color: white;
    font-size: 1.5rem;
    background-color: #1e223f;
    padding: 28px 34px !important;

    &:hover{
        background-color: #1e223f !important;
    }

    & > svg{
        width: 35px;
        height: 35px;
        margin-right: 12px;
    }
`