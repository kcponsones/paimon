import { WinnerModalProps } from "@/libs/helpers/types";
import { BossChooseText, BossModalButtons } from "@/src/styles/Draft";
import { EndgameModalContent, EndgameModalWrapper } from "@/src/styles/Modal";
import { Modal, ModalBody, ModalOverlay, SimpleGrid } from "@chakra-ui/react";

const WinnerModal = ({
  isOpen,
  onClose,
  player1,
  player2,
  onPlayerWinner,
  setPopupModalWinner,
}: WinnerModalProps) => (
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
        <ModalBody pt={10} pb={5}>
          <BossChooseText fontSize="2.5rem" mb={8}>
            Who is the winner?
          </BossChooseText>

          <SimpleGrid columns={2} spacing={8} my={8}>
            <BossModalButtons
              onClick={(e) => {
                e.preventDefault();
                onPlayerWinner(player1.id);
                setPopupModalWinner(false);
                onClose();
              }}
            >
              {player1.username}
            </BossModalButtons>
            <BossModalButtons
              onClick={(e) => {
                e.preventDefault();
                onPlayerWinner(player2.id);
                setPopupModalWinner(false);
                onClose();
              }}
            >
              {player2.username}
            </BossModalButtons>
          </SimpleGrid>
        </ModalBody>
      </EndgameModalWrapper>
    </EndgameModalContent>
  </Modal>
);

export default WinnerModal;
