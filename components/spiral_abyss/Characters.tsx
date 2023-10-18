import { DraftSpiralAbyssProps } from "@/libs/helpers/types";
import {
  AllElementVisionIcon,
  AnemoVisionIcon,
  CryoVisionIcon,
  DendroVisionIcon,
  ElectroVisionIcon,
  GeoVisionIcon,
  HydroVisionIcon,
  PyroVisionIcon,
} from "@/libs/includes/icons";
import { inArray } from "@/libs/providers/draft";
import {
  banIndexListSpiralAbyssPlayer1,
  banIndexListSpiralAbyssPlayer2,
  pickIndexListSpiralAbyssPlayer1,
  pickIndexListSpiralAbyssPlayer2,
} from "@/libs/providers/spiral_abyss";
import { useDraftStore } from "@/libs/store/draft";
import {
  CharacterDraftButton,
  CharacterPickCard,
  CharacterPickCardImg,
  CharacterPickCardInfo,
  CharacterPickCardInfoText,
  CharacterPickCardVision,
  CharacterSearchButton,
  CharacterTextFieldSearch,
  CharacterVisionButton,
} from "@/src/styles/CharacterPick";
import {
  SpiralAbyssCharacterListWrapper,
  SpiralAbyssDraftCharacterSide,
} from "@/src/styles/SpiralAbyss";
import { Flex, Grid, GridItem, HStack, Image } from "@chakra-ui/react";
import { useRef } from "react";

const Characters: React.FC<DraftSpiralAbyssProps> = ({
  applyCharacterModal,
  state,
  characterListQuery,
  timer,
  onCharacterPick,
  characterPauseDraft,
}) => {
  const [
    characters,
    setCharactersList,
    characterFilterElement,
    setCharacterFilterVision,
    searchCharacter,
    setSearchCharacter,
    searchCharacterList,
    currentCharacterChoose,
    setCurrentCharacterChoice,
    currentSequence,
    player1,
    player2,
    isDoneChooseCharacter,
    setIsDoneChooseCharacter,
  ] = useDraftStore((state) => [
    state.characters,
    state.setCharactersList,
    state.characterFilterElement,
    state.setCharacterFilterVision,
    state.searchCharacter,
    state.setSearchCharacter,
    state.searchCharacterList,
    state.currentCharacterChoose,
    state.setCurrentCharacterChoice,
    state.currentSequence,
    state.player1,
    state.player2,
    state.isDoneChooseCharacter,
    state.setIsDoneChooseCharacter,
  ]);

  let searchBtn = useRef<HTMLElement | null>(null);
  return (
    <SpiralAbyssDraftCharacterSide isactive={applyCharacterModal.toString()}>
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
      <SpiralAbyssCharacterListWrapper>
        <Grid templateColumns="repeat(5, 1fr)" gap={4} p={2}>
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
                    {charData.vision === "dendro" && <DendroVisionIcon />}
                    {charData.vision === "electro" && <ElectroVisionIcon />}
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
      </SpiralAbyssCharacterListWrapper>
      {inArray(currentSequence.index, pickIndexListSpiralAbyssPlayer1) &&
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

      {inArray(currentSequence.index, pickIndexListSpiralAbyssPlayer2) &&
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

      {inArray(currentSequence.index, banIndexListSpiralAbyssPlayer1) &&
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

      {inArray(currentSequence.index, banIndexListSpiralAbyssPlayer2) &&
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
    </SpiralAbyssDraftCharacterSide>
  );
};
export default Characters;
