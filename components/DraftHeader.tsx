import {
  BackIcon,
  CharacterIcon,
  RestartIcon,
  SwapIcon,
  WinnerIcon,
} from "@/libs/includes/icons";
import {
  BanCharacterWrapper,
  BanCharactersListContainer,
  BanCharactersListWrapper,
  BossDraftContainer,
  BossDraftWrapper,
  BossNameWrapper,
} from "@/src/styles/Draft";
import {
  Box,
  Flex,
  FormControl,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import {
  BackToArenaProps,
  CharacterDraftProps,
  DraftInfoProps,
  ModalFeatures,
} from "@/libs/helpers/types";
import {
  EndgameModalContent,
  EndgameModalWrapper,
  ModalEndgameButton,
  ModalTextEndgame,
} from "@/src/styles/Modal";

import {
  banIndexListPlayer1,
  banIndexListPlayer2,
  inArray,
} from "@/libs/providers/draft";
import {
  ButtonPopUpNav,
  ButtonPopupNavTextContent,
  ButtonPopupNavTextHeader,
  FontHeaderPopup,
} from "@/src/styles";
import { FormLabelText, FormSelect } from "@/src/styles/login";
import { SettingsIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ModalFeatureDraft from "./ModalFeatureDraft";

const DraftHeader: React.FC<CharacterDraftProps> = ({
  onOpenCharacterModal,
  setBackgroundVid,
  state,
  router,
  ban,
  banWidth,
  boss,
  colorConvertVision,
  currentSequence,
  onAcceptRestartDraft,
  onAcceptSwitchPlayersDraft,
  socket,
  winnerButton,
  setPopupModalWinner,
  isGMDoneDeclareWinner,
}) => {
  const [modalRestartDraft, setModalRestartDraft] = useState<boolean>(false);
  const [modalSwitchDraft, setModalSwitchDraft] = useState<boolean>(false);
  const [popupDraftButton, setPopupDraftButton] = useState<boolean>(true);

  const onCloseModalRestartDraft = () => {
    setModalRestartDraft(!modalRestartDraft);
  };

  const onCloseModalSwitchDraft = () => {
    setModalSwitchDraft(!modalSwitchDraft);
  };

  return (
    <>
      <ModalFeatureDraft
        isOpen={modalRestartDraft}
        onClose={onCloseModalRestartDraft}
        onAcceptButton={onAcceptRestartDraft}
        title="Are you sure to restart the draft"
      />

      <ModalFeatureDraft
        isOpen={modalSwitchDraft}
        onClose={onCloseModalSwitchDraft}
        onAcceptButton={onAcceptSwitchPlayersDraft}
        title="Are you sure to switch the players"
      />

      <Box as="nav" w="100%">
        {ban?.player1.length !== 0 && (
          <HStack
            px={10}
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            gap={4}
          >
            <Flex flex={1} gap={4} justifyContent="flex-start">
              {state?.user.role === "GM" && (
                <ButtonPopUpNav
                  onClick={() =>
                    socket.emit("backArena", {
                      draft_id: router?.query.draftID,
                      arena_id: router?.query.arenaID,
                    })
                  }
                >
                  <BackIcon />
                </ButtonPopUpNav>
              )}
              {state?.user.role === "Drafter" && (
                <Popover isOpen={popupDraftButton}>
                  <PopoverTrigger>
                    <ButtonPopUpNav onClick={onOpenCharacterModal}>
                      <CharacterIcon />
                    </ButtonPopUpNav>
                  </PopoverTrigger>
                  <PopoverContent bgColor="#1E223F">
                    <PopoverArrow bgColor="#1E223F" />

                    <PopoverHeader
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <ButtonPopupNavTextHeader>
                        Drafters!
                      </ButtonPopupNavTextHeader>
                      <PopoverCloseButton
                        position="relative"
                        onClick={() => setPopupDraftButton(false)}
                        top={0}
                        right={2}
                      />
                    </PopoverHeader>
                    <PopoverBody>
                      <ButtonPopupNavTextContent>
                        Choose your character pick and ban here
                      </ButtonPopupNavTextContent>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )}
            </Flex>
            <Flex flex={1} justifyContent="center">
              <BanCharactersListContainer
                width={`${(banWidth !== undefined ? banWidth : 0) + 25}px`}
                aligndraft="left"
                statusdraft={
                  currentSequence &&
                  inArray(currentSequence.index, banIndexListPlayer1) &&
                  currentSequence.player === "player1"
                    ? "true"
                    : "none"
                }
              >
                <BanCharactersListWrapper width={`${banWidth}px`}>
                  {ban?.player1?.map((banData: DraftInfoProps, pi: number) => (
                    <BanCharacterWrapper
                      aligndraft="left"
                      widthcharacter={banData.wrapperWidthSize}
                      colorcharacter={
                        banData.characterID !== null
                          ? colorConvertVision &&
                            colorConvertVision(banData.character.vision)
                          : ""
                      }
                      indexcharacter={banData.indexCharacter}
                      key={pi}
                    >
                      {banData.characterID !== null && (
                        <Image
                          src={banData.character.ban_picture}
                          w={banData.imageWidthSize}
                          alt={banData.index}
                        />
                      )}
                    </BanCharacterWrapper>
                  ))}
                </BanCharactersListWrapper>
              </BanCharactersListContainer>
              <BossDraftContainer>
                <BossDraftWrapper>
                  {boss !== null && (
                    <>
                      <Image
                        src={boss?.picture_flash}
                        w="100%"
                        alt="boss-draft"
                      />
                      <BossNameWrapper>{boss?.name}</BossNameWrapper>
                    </>
                  )}
                </BossDraftWrapper>
              </BossDraftContainer>
              <BanCharactersListContainer
                width={`${(banWidth !== undefined ? banWidth : 0) + 25}px`}
                aligndraft="right"
                statusdraft={
                  currentSequence &&
                  inArray(currentSequence.index, banIndexListPlayer2) &&
                  currentSequence.player === "player2"
                    ? "true"
                    : "none"
                }
              >
                <BanCharactersListWrapper width={`${banWidth}px`}>
                  {ban?.player2?.map((banData: DraftInfoProps, pi: number) => (
                    <BanCharacterWrapper
                      aligndraft="right"
                      widthcharacter={banData.wrapperWidthSize}
                      colorcharacter={
                        banData.characterID !== null
                          ? colorConvertVision &&
                            colorConvertVision(banData.character.vision)
                          : ""
                      }
                      indexcharacter={banData.indexCharacter}
                      key={pi}
                    >
                      {banData.characterID !== null && (
                        <Image
                          src={banData.character.ban_picture}
                          w={banData.imageWidthSize}
                          alt={banData.index}
                        />
                      )}
                    </BanCharacterWrapper>
                  ))}
                </BanCharactersListWrapper>
              </BanCharactersListContainer>
            </Flex>

            <Flex flex={1} gap={4} justifyContent="flex-end">
              {winnerButton === true && (
                <ButtonPopUpNav
                  onClick={() => {
                    if (setPopupModalWinner) {
                      setPopupModalWinner(true);
                    }
                  }}
                >
                  <WinnerIcon />
                </ButtonPopUpNav>
              )}

              <Box>
                <Popover placement="bottom-start">
                  <PopoverTrigger>
                    <ButtonPopUpNav>
                      <SettingsIcon boxSize={7} />
                    </ButtonPopUpNav>
                  </PopoverTrigger>
                  <PopoverContent bgColor="#1e223f">
                    <FontHeaderPopup fontWeight="semibold" p={4}>
                      Settings
                    </FontHeaderPopup>
                    <PopoverArrow />

                    <PopoverBody px={4} pb={5}>
                      <FormControl>
                        <FormLabelText>Background Video</FormLabelText>
                        <FormSelect
                          placeContent="random"
                          value={state?.settings.video_bg.mp4
                            .replace("/video/bg/", "")
                            .replace("_bg.mp4", "")}
                          onChange={(e) => {
                            if (setBackgroundVid) {
                              setBackgroundVid({
                                mp4: "/video/bg/" + e.target.value + "_bg.mp4",
                                webm:
                                  "/video/bg/" + e.target.value + "_bg.webm",
                              });
                            }
                          }}
                        >
                          <option value="stars">Default</option>
                          <option value="anemo">Anemo</option>
                          <option value="cryo">Cryo</option>
                          <option value="dendro">Dendro</option>
                          <option value="electro">Electro</option>
                          <option value="geo">Geo</option>
                          <option value="hydro">Hydro</option>
                          <option value="pyro">Pyro</option>
                        </FormSelect>
                      </FormControl>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Box>

              {state?.user.role === "GM" && (
                <>
                  <ButtonPopUpNav
                    onClick={() => {
                      setModalRestartDraft(true);
                    }}
                  >
                    <RestartIcon />
                  </ButtonPopUpNav>

                  {winnerButton === true && isGMDoneDeclareWinner == true && (
                    <ButtonPopUpNav
                      onClick={() => {
                        setModalSwitchDraft(true);
                      }}
                    >
                      <SwapIcon />
                    </ButtonPopUpNav>
                  )}
                </>
              )}
            </Flex>
          </HStack>
        )}
      </Box>
    </>
  );
};

export default DraftHeader;
