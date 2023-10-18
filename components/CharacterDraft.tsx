import {
  AllElementVisionIcon,
  AnemoVisionIcon,
  CloseModalCharacterPick,
  CryoVisionIcon,
  DendroVisionIcon,
  ElectroVisionIcon,
  GeoVisionIcon,
  HydroVisionIcon,
  PyroVisionIcon,
} from "@/libs/includes/icons";
import {
  BossAvatarCircle,
  BossAvatarName,
  BossAvatarNameWrapper,
  CharacterDraftButton,
  CharacterDraftPlayerImg,
  CharacterDraftPlayerWrapper,
  CharacterInfoWrapper,
  CharacterListWrapper,
  CharacterPickCard,
  CharacterPickCardImg,
  CharacterPickCardInfo,
  CharacterPickCardInfoText,
  CharacterPickCardVision,
  CharacterPickInfoCard,
  CharacterPickInfoCardBody,
  CharacterPickInfoCardCharacter,
  CharacterPickInfoCardDetails,
  CharacterPickInfoCardDetailsText,
  CharacterPickInfoCardHeader,
  CharacterPickInfoCardHeaderPlayers,
  CharacterPickInfoCardHeaderText,
  CharacterPickInfoNameText,
  CharacterPickInfoNameWrapper,
  CharacterPickModalCloseButton,
  CharacterPickWrapper,
  CharacterSearchButton,
  CharacterTextFieldSearch,
  CharacterVisionButton,
  ModalCharacterPickBody,
  ModalCharacterPickWrapper,
  ModalCharacterPickheader,
  ModalCharacterPlayerClue,
  ModalCharacterTextHeader,
} from "@/src/styles/CharacterPick";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CharacterDraftProps } from "@/libs/helpers/types";
import { convertVisionToColor } from "@/libs/includes/color";
import { CharacterPickImg, StartIcon } from "@/libs/includes/image";
import { useDraftStore } from "@/libs/store/draft";
import {
  banIndexListPlayer1,
  banIndexListPlayer2,
  inArray,
  pickIndexListPlayer1,
  pickIndexListPlayer2,
} from "@/libs/providers/draft";
import { useRef } from "react";

const CharacterDraft: React.FC<CharacterDraftProps> = ({
  statusCharacterModal,
  onCloseCharacterModal,
  characterListQuery,
  timer,
  onCharacterPick,
  state,
  characterPauseDraft,
}) => {
  const [
    boss,
    characters,
    setCharactersList,
    characterFilterElement,
    setCharacterFilterVision,
    searchCharacter,
    setSearchCharacter,
    searchCharacterList,
    currentCharacterChoose,
    setCurrentCharacterChoice,
    pickListCharacterDraft,
    banListCharacterDraft,
    currentSequence,
    player1,
    player2,
    isDoneChooseCharacter,
    setIsDoneChooseCharacter,
  ] = useDraftStore((state) => [
    state.boss,
    state.characters,
    state.setCharactersList,
    state.characterFilterElement,
    state.setCharacterFilterVision,
    state.searchCharacter,
    state.setSearchCharacter,
    state.searchCharacterList,
    state.currentCharacterChoose,
    state.setCurrentCharacterChoice,
    state.pickListCharacterDraft,
    state.banListCharacterDraft,
    state.currentSequence,
    state.player1,
    state.player2,
    state.isDoneChooseCharacter,
    state.setIsDoneChooseCharacter,
  ]);

  let searchBtn = useRef<HTMLElement | null>(null);

  const colorConvertVision = (vision: string) => {
    return convertVisionToColor(vision);
  };

  const isActiveClueModel = () => {
    if (
      state?.user.id === player1.id &&
      currentSequence.player == "player1" &&
      timer !== 0
    ) {
      return "true";
    } else if (
      state?.user.id === player2.id &&
      currentSequence.player == "player2" &&
      timer !== 0
    ) {
      return "true";
    } else {
      return "false";
    }
  };

  const draftType = () => {
    if (
      inArray(currentSequence.index, pickIndexListPlayer1) ||
      inArray(currentSequence.index, pickIndexListPlayer2)
    ) {
      return "pick";
    } else {
      return "ban";
    }
  };

  let createEmptyBox = Array(4 - banListCharacterDraft.player2.length).fill("");

  return statusCharacterModal === true ? (
    <ModalCharacterPickWrapper>
      <ModalCharacterPlayerClue
        isactive={isActiveClueModel()}
        drafttype={draftType()}
      >
        <ModalCharacterPickheader as="nav">
          <HStack w="100%" alignItems="center" justifyContent="space-between">
            <Flex flex={1} direction="row" gap={6} alignItems="center">
              <Image src={CharacterPickImg} w="30px" />
              <ModalCharacterTextHeader>
                Character Selection
              </ModalCharacterTextHeader>
            </Flex>
            <Flex
              flex={1}
              direction="row"
              gap={4}
              alignItems="center"
              justifyContent="center"
            >
              <CharacterVisionButton
                isselectedeleemnt={
                  characterFilterElement === "all" ? "true" : "false"
                }
                onClick={() => {
                  setCharacterFilterVision("all");
                  setCharactersList(characterListQuery);
                  searchCharacterList(searchCharacter, "all");
                }}
              >
                <AllElementVisionIcon />
              </CharacterVisionButton>
              <CharacterVisionButton
                isselectedeleemnt={
                  characterFilterElement === "pyro" ? "true" : "false"
                }
                onClick={() => {
                  setCharacterFilterVision("pyro");
                  setCharactersList(characterListQuery);
                  searchCharacterList(searchCharacter, "pyro");
                }}
              >
                <PyroVisionIcon color="#b9b4af" />
              </CharacterVisionButton>
              <CharacterVisionButton
                isselectedeleemnt={
                  characterFilterElement === "hydro" ? "true" : "false"
                }
                onClick={() => {
                  setCharacterFilterVision("hydro");
                  setCharactersList(characterListQuery);
                  searchCharacterList(searchCharacter, "hydro");
                }}
              >
                <HydroVisionIcon color="#b9b4af" />
              </CharacterVisionButton>
              <CharacterVisionButton
                isselectedeleemnt={
                  characterFilterElement === "anemo" ? "true" : "false"
                }
                onClick={() => {
                  setCharacterFilterVision("anemo");
                  setCharactersList(characterListQuery);
                  searchCharacterList(searchCharacter, "anemo");
                }}
              >
                <AnemoVisionIcon color="#b9b4af" />
              </CharacterVisionButton>
              <CharacterVisionButton
                isselectedeleemnt={
                  characterFilterElement === "electro" ? "true" : "false"
                }
                onClick={() => {
                  setCharacterFilterVision("electro");
                  setCharactersList(characterListQuery);
                  searchCharacterList(searchCharacter, "electro");
                }}
              >
                <ElectroVisionIcon color="#b9b4af" />
              </CharacterVisionButton>
              <CharacterVisionButton
                isselectedeleemnt={
                  characterFilterElement === "dendro" ? "true" : "false"
                }
                onClick={() => {
                  setCharacterFilterVision("dendro");
                  setCharactersList(characterListQuery);
                  searchCharacterList(searchCharacter, "dendro");
                }}
              >
                <DendroVisionIcon color="#b9b4af" />
              </CharacterVisionButton>
              <CharacterVisionButton
                isselectedeleemnt={
                  characterFilterElement === "cryo" ? "true" : "false"
                }
                onClick={() => {
                  setCharacterFilterVision("cryo");
                  setCharactersList(characterListQuery);
                  searchCharacterList(searchCharacter, "cryo");
                }}
              >
                <CryoVisionIcon color="#b9b4af" />
              </CharacterVisionButton>

              <CharacterVisionButton
                isselectedeleemnt={
                  characterFilterElement === "geo" ? "true" : "false"
                }
                onClick={() => {
                  setCharacterFilterVision("geo");
                  setCharactersList(characterListQuery);
                  searchCharacterList(searchCharacter, "geo");
                }}
              >
                <GeoVisionIcon color="#b9b4af" />
              </CharacterVisionButton>
            </Flex>
            <Flex
              flex={1}
              direction="row"
              gap={6}
              alignItems="center"
              justifyContent="flex-end"
            >
              <ModalCharacterTextHeader>
                Seconds Remaining: {timer}
              </ModalCharacterTextHeader>
              <CharacterPickModalCloseButton onClick={onCloseCharacterModal}>
                <CloseModalCharacterPick />
              </CharacterPickModalCloseButton>
            </Flex>
          </HStack>
        </ModalCharacterPickheader>
        <ModalCharacterPickBody>
          <SimpleGrid columns={2} spacing={4} w="100%">
            <CharacterPickWrapper>
              <HStack my={4} gap={4}>
                <CharacterTextFieldSearch
                  type="text"
                  placeholder="Search Characters"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchCharacter(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchBtn.current) {
                      searchBtn.current.click();
                    }
                  }}
                />
                <CharacterSearchButton
                  ref={searchBtn}
                  onClick={() => {
                    if (searchCharacter == "") {
                      setCharactersList(characterListQuery);
                    } else {
                      setCharactersList(characterListQuery);
                      searchCharacterList(searchCharacter, "all");
                    }
                  }}
                >
                  Search
                </CharacterSearchButton>
              </HStack>
              <CharacterListWrapper>
                <Grid templateColumns="repeat(7, 1fr)" gap={4} p={2}>
                  {characters.map((charData, index) => (
                    <GridItem key={index}>
                      <CharacterPickCard
                        onClick={(e) => {
                          e.preventDefault();
                          if (charData?.isPicked === false) {
                            setCurrentCharacterChoice(charData);
                          }
                        }}
                        ispickedcharacter={charData?.isPicked?.toString()}
                      >
                        <CharacterPickCardImg rarity={charData.rarity}>
                          <Image
                            src={charData.draft_picture}
                            alt={`${charData.name}-character-image`}
                          />
                          <CharacterPickCardVision>
                            {charData.vision === "anemo" && <AnemoVisionIcon />}
                            {charData.vision === "cryo" && <CryoVisionIcon />}
                            {charData.vision === "dendro" && (
                              <DendroVisionIcon />
                            )}
                            {charData.vision === "electro" && (
                              <ElectroVisionIcon />
                            )}
                            {charData.vision === "geo" && <GeoVisionIcon />}
                            {charData.vision === "hydro" && <HydroVisionIcon />}
                            {charData.vision === "pyro" && <PyroVisionIcon />}
                          </CharacterPickCardVision>
                        </CharacterPickCardImg>
                        <CharacterPickCardInfo>
                          <CharacterPickCardInfoText>
                            {charData.display_name}
                          </CharacterPickCardInfoText>
                        </CharacterPickCardInfo>
                      </CharacterPickCard>
                    </GridItem>
                  ))}
                </Grid>
              </CharacterListWrapper>
            </CharacterPickWrapper>
            <CharacterInfoWrapper>
              <CharacterPickInfoCard h="375px">
                <CharacterPickInfoCardCharacter colorpickedcharacter="">
                  <motion.div
                    key={currentCharacterChoose.id}
                    initial={{
                      width: "0%",
                    }}
                    animate={{
                      width: "100%",
                      transition: { duration: 0.5 },
                    }}
                    style={{
                      height: "100%",
                    }}
                  >
                    <Box
                      bgColor={colorConvertVision(
                        currentCharacterChoose.vision !== ""
                          ? currentCharacterChoose.vision
                          : ""
                      )}
                      w="100%"
                      height="100%"
                    >
                      <Box className="character-picked-vision-icon">
                        {currentCharacterChoose.vision === "anemo" && (
                          <AnemoVisionIcon />
                        )}
                        {currentCharacterChoose.vision === "cryo" && (
                          <CryoVisionIcon />
                        )}
                        {currentCharacterChoose.vision === "dendro" && (
                          <DendroVisionIcon />
                        )}
                        {currentCharacterChoose.vision === "electro" && (
                          <ElectroVisionIcon />
                        )}
                        {currentCharacterChoose.vision === "geo" && (
                          <GeoVisionIcon />
                        )}
                        {currentCharacterChoose.vision === "hydro" && (
                          <HydroVisionIcon />
                        )}
                        {currentCharacterChoose.vision === "pyro" && (
                          <PyroVisionIcon />
                        )}
                      </Box>
                      {currentCharacterChoose.pick_picture !== "" && (
                        <motion.div
                          key={currentCharacterChoose.pick_picture}
                          initial={{
                            y: -20,
                            opacity: 0,
                          }}
                          animate={{
                            y: 0,
                            opacity: 1,
                            transition: { delay: 0.75, duration: 0.25 },
                          }}
                          style={{
                            height: "100%",
                          }}
                        >
                          <Image
                            className="character-picked-image-pick"
                            src={currentCharacterChoose.pick_picture}
                          />
                        </motion.div>
                      )}

                      {currentCharacterChoose.name !== "" && (
                        <CharacterPickInfoNameWrapper>
                          <CharacterPickInfoNameText>
                            {currentCharacterChoose.name}
                          </CharacterPickInfoNameText>
                        </CharacterPickInfoNameWrapper>
                      )}
                    </Box>
                  </motion.div>
                </CharacterPickInfoCardCharacter>
                <CharacterPickInfoCardDetails>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                    <GridItem>
                      <HStack alignItems="center">
                        <CharacterPickInfoCardDetailsText>
                          Rarity:
                        </CharacterPickInfoCardDetailsText>
                        <HStack alignItems="center">
                          {Array(currentCharacterChoose.rarity === "4" ? 4 : 5)
                            .fill(0)
                            .map((_, index) => (
                              <Image
                                src={StartIcon}
                                w="25px"
                                marginInlineStart="0 !important"
                                key={index}
                              />
                            ))}
                        </HStack>
                      </HStack>
                    </GridItem>
                    <GridItem>
                      <CharacterPickInfoCardDetailsText>
                        Weapon Type: {currentCharacterChoose.weapon}
                      </CharacterPickInfoCardDetailsText>
                    </GridItem>
                    <GridItem>
                      <CharacterPickInfoCardDetailsText>
                        Element:
                        {currentCharacterChoose.vision.charAt(0).toUpperCase() +
                          currentCharacterChoose.vision.slice(1)}
                      </CharacterPickInfoCardDetailsText>
                    </GridItem>
                    <GridItem>
                      <CharacterPickInfoCardDetailsText>
                        Nation: {currentCharacterChoose.nation}
                      </CharacterPickInfoCardDetailsText>
                    </GridItem>
                  </Grid>

                  {inArray(currentSequence.index, pickIndexListPlayer1) &&
                  state?.user.id === player1.id &&
                  currentSequence.player == "player1" &&
                  currentCharacterChoose.id !== "" &&
                  timer !== 0 &&
                  isDoneChooseCharacter === false &&
                  characterPauseDraft === false ? (
                    <CharacterDraftButton
                      drafttype="pick"
                      onClick={() => {
                        onCharacterPick();
                        setIsDoneChooseCharacter(true);
                      }}
                    >
                      Pick {currentCharacterChoose.name}
                    </CharacterDraftButton>
                  ) : null}

                  {inArray(currentSequence.index, pickIndexListPlayer2) &&
                  state?.user.id === player2.id &&
                  currentSequence.player == "player2" &&
                  currentCharacterChoose.id !== "" &&
                  timer !== 0 &&
                  isDoneChooseCharacter === false &&
                  characterPauseDraft === false ? (
                    <CharacterDraftButton
                      drafttype="pick"
                      onClick={() => {
                        onCharacterPick();
                        setIsDoneChooseCharacter(true);
                      }}
                    >
                      Pick {currentCharacterChoose.name}
                    </CharacterDraftButton>
                  ) : null}

                  {inArray(currentSequence.index, banIndexListPlayer1) &&
                  state?.user.id === player1.id &&
                  currentSequence.player == "player1" &&
                  currentCharacterChoose.id !== "" &&
                  timer !== 0 &&
                  isDoneChooseCharacter === false &&
                  characterPauseDraft === false ? (
                    <CharacterDraftButton
                      drafttype="ban"
                      onClick={() => {
                        onCharacterPick();
                        setIsDoneChooseCharacter(true);
                      }}
                    >
                      Ban {currentCharacterChoose.name}
                    </CharacterDraftButton>
                  ) : null}

                  {inArray(currentSequence.index, banIndexListPlayer2) &&
                  state?.user.id === player2.id &&
                  currentSequence.player == "player2" &&
                  currentCharacterChoose.id !== "" &&
                  timer !== 0 &&
                  isDoneChooseCharacter === false &&
                  characterPauseDraft === false ? (
                    <CharacterDraftButton
                      drafttype="ban"
                      onClick={() => {
                        onCharacterPick();
                        setIsDoneChooseCharacter(true);
                      }}
                    >
                      Ban {currentCharacterChoose.name}
                    </CharacterDraftButton>
                  ) : null}
                </CharacterPickInfoCardDetails>
              </CharacterPickInfoCard>
              <Box position="relative" my={4}>
                <BossAvatarCircle>
                  {boss !== null && (
                    <Image src={boss.picture} alt="avatar" width="100%" />
                  )}
                </BossAvatarCircle>
                <BossAvatarNameWrapper>
                  <BossAvatarName>
                    {boss !== null ? boss.name : ""}
                  </BossAvatarName>
                </BossAvatarNameWrapper>
              </Box>
              <CharacterPickInfoCard h="165px">
                <CharacterPickInfoCardHeader>
                  <SimpleGrid columns={3} spacing={10} width="100%">
                    <Flex width="100%" justifyContent="center">
                      <CharacterPickInfoCardHeaderPlayers>
                        {player1.username}
                      </CharacterPickInfoCardHeaderPlayers>
                    </Flex>
                    <Flex width="100%" justifyContent="center">
                      <CharacterPickInfoCardHeaderText>
                        Banned Characters
                      </CharacterPickInfoCardHeaderText>
                    </Flex>
                    <Flex width="100%" justifyContent="center">
                      <CharacterPickInfoCardHeaderPlayers>
                        {player2.username}
                      </CharacterPickInfoCardHeaderPlayers>
                    </Flex>
                  </SimpleGrid>
                </CharacterPickInfoCardHeader>
                <CharacterPickInfoCardBody>
                  <SimpleGrid columns={2} spacing={16} w="100%">
                    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                      {banListCharacterDraft.player1.map((draft, keyDraft) => (
                        <GridItem key={keyDraft}>
                          <CharacterDraftPlayerWrapper
                            currentdraft={
                              inArray(
                                currentSequence.index,
                                banIndexListPlayer1
                              ) && currentSequence.index === draft.index
                                ? "true"
                                : "false"
                            }
                            drafttype="ban"
                          >
                            {draft.character !== null && (
                              <CharacterDraftPlayerImg
                                rarity={draft.character.rarity}
                              >
                                <Image src={draft.character.draft_picture} />
                              </CharacterDraftPlayerImg>
                            )}
                          </CharacterDraftPlayerWrapper>
                        </GridItem>
                      ))}
                    </Grid>
                    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                      {createEmptyBox.map((_, keyDraft) => (
                        <Box key={keyDraft}></Box>
                      ))}

                      {banListCharacterDraft.player2.map((draft, keyDraft) => (
                        <GridItem key={keyDraft}>
                          <CharacterDraftPlayerWrapper
                            currentdraft={
                              inArray(
                                currentSequence.index,
                                banIndexListPlayer2
                              ) && currentSequence.index === draft.index
                                ? "true"
                                : "false"
                            }
                            drafttype="ban"
                          >
                            {draft.character !== null && (
                              <CharacterDraftPlayerImg
                                rarity={draft.character.rarity}
                              >
                                <Image src={draft.character.draft_picture} />
                              </CharacterDraftPlayerImg>
                            )}
                          </CharacterDraftPlayerWrapper>
                        </GridItem>
                      ))}
                    </Grid>
                  </SimpleGrid>
                </CharacterPickInfoCardBody>
              </CharacterPickInfoCard>
              <CharacterPickInfoCard h="165px">
                <CharacterPickInfoCardHeader>
                  <SimpleGrid columns={3} spacing={10} width="100%">
                    <Flex width="100%" justifyContent="center">
                      <CharacterPickInfoCardHeaderPlayers></CharacterPickInfoCardHeaderPlayers>
                    </Flex>
                    <Flex width="100%" justifyContent="center">
                      <CharacterPickInfoCardHeaderText>
                        Picked Characters
                      </CharacterPickInfoCardHeaderText>
                    </Flex>
                    <Flex width="100%" justifyContent="center">
                      <CharacterPickInfoCardHeaderPlayers></CharacterPickInfoCardHeaderPlayers>
                    </Flex>
                  </SimpleGrid>
                </CharacterPickInfoCardHeader>
                <CharacterPickInfoCardBody>
                  <SimpleGrid columns={2} spacing={16} w="100%">
                    <Grid templateColumns={`repeat(4, 1fr)`} gap={2}>
                      {pickListCharacterDraft.player1.map((draft, keyDraft) => (
                        <GridItem key={keyDraft}>
                          <CharacterDraftPlayerWrapper
                            currentdraft={
                              inArray(
                                currentSequence.index,
                                pickIndexListPlayer1
                              ) && currentSequence.index === draft.index
                                ? "true"
                                : "false"
                            }
                            drafttype="pick"
                          >
                            {draft.character !== null && (
                              <CharacterDraftPlayerImg
                                rarity={draft.character.rarity}
                              >
                                <Image src={draft.character.draft_picture} />
                              </CharacterDraftPlayerImg>
                            )}
                          </CharacterDraftPlayerWrapper>
                        </GridItem>
                      ))}
                    </Grid>
                    <Grid templateColumns={`repeat(4, 1fr)`} gap={2}>
                      {createEmptyBox.map((_, keyDraft) => (
                        <Box key={keyDraft}></Box>
                      ))}

                      {pickListCharacterDraft.player2.map((draft, keyDraft) => (
                        <GridItem key={keyDraft}>
                          <CharacterDraftPlayerWrapper
                            currentdraft={
                              inArray(
                                currentSequence.index,
                                pickIndexListPlayer2
                              ) && currentSequence.index === draft.index
                                ? "true"
                                : "false"
                            }
                            drafttype="pick"
                          >
                            {draft.character !== null && (
                              <CharacterDraftPlayerImg
                                rarity={draft.character.rarity}
                              >
                                <Image src={draft.character.draft_picture} />
                              </CharacterDraftPlayerImg>
                            )}
                          </CharacterDraftPlayerWrapper>
                        </GridItem>
                      ))}
                    </Grid>
                  </SimpleGrid>
                </CharacterPickInfoCardBody>
              </CharacterPickInfoCard>
            </CharacterInfoWrapper>
          </SimpleGrid>
        </ModalCharacterPickBody>
      </ModalCharacterPlayerClue>
    </ModalCharacterPickWrapper>
  ) : null;
};

export default CharacterDraft;
