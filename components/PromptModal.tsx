import { ModalFeatures } from "@/libs/helpers/types";
import {
  EndgameModalContent,
  EndgameModalWrapper,
  ModalEndgameButton,
  ModalTextEndgame,
} from "@/src/styles/Modal";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const PromptModal: React.FC<ModalFeatures> = ({
  isOpen,
  onClose,
  title,
  onAcceptButton,
  onCloseButton,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />

      <EndgameModalContent>
        <EndgameModalWrapper>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <ModalTextEndgame>{title}</ModalTextEndgame>
          </ModalBody>
          <ModalFooter>
            <ModalEndgameButton
              bgColor="#61B162"
              _hover={{
                bgColor: "#61B162",
                boxShadow: "0px 0px 16px 4px rgba(103, 228, 100, 1)",
              }}
              onClick={onAcceptButton}
            >
              OK
            </ModalEndgameButton>
            <ModalEndgameButton
              bgColor="#95292D"
              onClick={onClose}
              _hover={{
                bgColor: "#95292D",
                boxShadow: "0px 0px 16px 4px rgba(203, 53, 53, 1)",
              }}
            >
              Close
            </ModalEndgameButton>
          </ModalFooter>
        </EndgameModalWrapper>
      </EndgameModalContent>
    </Modal>
  );
};

export default PromptModal;
