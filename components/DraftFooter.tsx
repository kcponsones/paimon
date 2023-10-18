import { PlayerNameDraft } from "@/libs/helpers/types";
import {
  DraftPlayerText,
  DraftPlayerTextWrapper,
  DraftPlayerVersusText,
  DraftPlayerVersusWrapper,
  DraftPlayersNamePlate,
} from "@/src/styles/Draft";
import { Box } from "@chakra-ui/react";
import React from "react";

const DraftFooter: React.FC<PlayerNameDraft> = ({
  player1Name,
  player2Name,
}) => {
  return (
    <DraftPlayersNamePlate>
      <DraftPlayerTextWrapper aligndraft="left">
        <DraftPlayerText>{player1Name}</DraftPlayerText>
      </DraftPlayerTextWrapper>
      <Box width="14%" />
      <DraftPlayerVersusWrapper>
        <DraftPlayerVersusText>VS</DraftPlayerVersusText>
      </DraftPlayerVersusWrapper>
      <DraftPlayerTextWrapper aligndraft="right">
        <DraftPlayerText>{player2Name}</DraftPlayerText>
      </DraftPlayerTextWrapper>
    </DraftPlayersNamePlate>
  );
};

export default DraftFooter;
