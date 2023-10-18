import { Box, Image } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const LoaderScreenBox = styled(Box)`
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background-color: #110f1a;
`

export const LoaderScreenContent = styled(Box)`
    width:100%;
    height: 80vh;
    display: flex;
    align-items:center;
    justify-content: center;
`

export const LoaderBelowWrapper = styled(Box)`
    width: 100%;
    height: 20vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative; 
`

export const LoaderBorder = styled(Box)`
    width: 100%;
    height: 5px;
    background-color: #292731;
    position: relative;
    z-index: 19;
`

export const LoaderElementsWrapper = styled(Box)`
    position:absolute;
    left: 50%;
    transform: translate(-50%, -10%);
    z-index: 25;
    width: 550px;
    height: 50px;
    background-color: #110f1a;
`   
export const LoaderElementsPassieve = styled(Box)`
    width: 440px;
    height: 51px;
    background: url('${(props? : any) => (props.imgsrc)}');
    background-repeat: no-repeat;
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 30;
`

export const LoaderElementsPrompt = styled(Image)`
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
    clip: rect(0, ${(props? : any) => (props.percentload)}px, 50px, 0);
`