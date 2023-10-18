import { ModalBoss } from "@/libs/helpers/types";
import {
  BossChooseText,
  BossChooseWrapper,
  BossModalButtons,
} from "@/src/styles/Draft";
import { EndgameModalContent, EndgameModalWrapper } from "@/src/styles/Modal";
import {
  Center,
  Img,
  Modal,
  ModalBody,
  ModalOverlay,
  SimpleGrid,
} from "@chakra-ui/react";

const ModalBoss = ({
  isOpen,
  onClose,
  onAccept,
  onDecline,
  boss,
  timer,
  user_state,
  player1,
  player2,
  isDoneChooseReroll,
  setIsDoneChooseReroll,
}: ModalBoss) => {
  return (
    <Modal
      onClose={onClose}
      size="3xl"
      isOpen={isOpen}
      motionPreset="slideInBottom"
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />

      <EndgameModalContent>
        <EndgameModalWrapper>
          <ModalBody p={10}>
            <Center>
              <BossChooseWrapper>
                <Img src={boss !== null ? boss.picture : ""} width="100%" />
              </BossChooseWrapper>
            </Center>
            <BossChooseText fontSize="2.5rem" mb={8}>
              {boss !== null ? boss.name : ""} is selected randomly. Reroll ?
            </BossChooseText>

            {isDoneChooseReroll === false && (
              <SimpleGrid columns={2} spacing={8} mb={8}>
                <BossModalButtons
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDoneChooseReroll(true);
                    onAccept(
                      user_state.id,
                      player1.id === user_state.id
                        ? "player1"
                        : player2.id === user_state.id
                        ? "player2"
                        : ""
                    );
                  }}
                >
                  Reroll
                </BossModalButtons>
                <BossModalButtons
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDoneChooseReroll(true);
                    onDecline(
                      user_state.id,
                      player1.id === user_state.id
                        ? "player1"
                        : player2.id === user_state.id
                        ? "player2"
                        : ""
                    );
                  }}
                >
                  No Reroll
                </BossModalButtons>
              </SimpleGrid>
            )}

            <BossChooseText fontSize="1.25rem">
              Automatically declare No Reroll after {timer} seconds
            </BossChooseText>
          </ModalBody>
        </EndgameModalWrapper>
      </EndgameModalContent>
    </Modal>
  );
};

export default ModalBoss;
