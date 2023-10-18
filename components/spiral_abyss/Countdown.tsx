import { DraftCountdownSpiralAbyssProps } from "@/libs/helpers/types";
import {
  DraftCountdownCard,
  DraftCountdownCardWrapper,
  DraftCountdownText,
} from "@/src/styles/Draft";
import { Flex } from "@chakra-ui/react";

const Countdown: React.FC<DraftCountdownSpiralAbyssProps> = ({ timer }) => {
  return (
    <Flex
      flex={1}
      w="100%"
      direction="row"
      gap={10}
      alignItems="center"
      justifyContent="center"
    >
      <DraftCountdownCard>
        <DraftCountdownCardWrapper>
          <DraftCountdownText>{timer}</DraftCountdownText>
        </DraftCountdownCardWrapper>
      </DraftCountdownCard>
    </Flex>
  );
};

export default Countdown;
