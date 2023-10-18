import { CharacterInfoProps } from "@/libs/helpers/types";
import {
  AnemoVisionIcon,
  CryoVisionIcon,
  DendroVisionIcon,
  ElectroVisionIcon,
  GeoVisionIcon,
  HydroVisionIcon,
  PyroVisionIcon,
} from "@/libs/includes/icons";
import { useSettingsStore } from "@/libs/store/settings";
import {
  CharacterPickCard,
  CharacterPickCardImg,
  CharacterPickCardInfo,
  CharacterPickCardInfoText,
  CharacterPickCardVision,
  CharacterSearchButton,
  CharacterTextFieldSearch,
} from "@/src/styles/CharacterPick";
import { CharacerListSettingWrapper } from "@/src/styles/Settings";
import { Box, Grid, GridItem, HStack, Image } from "@chakra-ui/react";
import { useEffect } from "react";

const CharacterList: React.FC<any> = ({ list }: any) => {
  const [
    characterList,
    setCharacterList,
    setCharacterInfo,
    searchCharacter,
    setSearchCharacter,
    searchCharacterList,
  ] = useSettingsStore((state) => [
    state.characterList,
    state.setCharacterList,
    state.setCharacterInfo,
    state.searchCharacter,
    state.setSearchCharacter,
    state.searchCharacterList,
  ]);

  const onSetEditCharacter = (boss: CharacterInfoProps) => {
    setCharacterInfo(boss);
  };

  useEffect(() => {
    if (list.length > 0) {
      setCharacterList(list);
    }
  }, [list]);

  return (
    <Box w="100%">
      <HStack mb={4} gap={4}>
        <CharacterTextFieldSearch
          type="text"
          placeholder="Search Characters"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchCharacter(e.target.value);
          }}
        />
        <CharacterSearchButton
          onClick={() => {
            if (searchCharacter == "") {
              setCharacterList(list);
            } else {
              setCharacterList(list);
              searchCharacterList(searchCharacter);
            }
          }}
        >
          Search
        </CharacterSearchButton>
      </HStack>

      <CharacerListSettingWrapper>
        <Grid templateColumns="repeat(8, 1fr)" gap={4} p={2}>
          {characterList.map((char, index) => (
            <GridItem key={index}>
              <CharacterPickCard onClick={() => onSetEditCharacter(char)}>
                <CharacterPickCardImg rarity={char.rarity}>
                  <Image src={char.draft_picture} alt="albedo-character" />
                  <CharacterPickCardVision>
                    {char.vision === "anemo" && <AnemoVisionIcon />}
                    {char.vision === "cryo" && <CryoVisionIcon />}
                    {char.vision === "dendro" && <DendroVisionIcon />}
                    {char.vision === "electro" && <ElectroVisionIcon />}
                    {char.vision === "geo" && <GeoVisionIcon />}
                    {char.vision === "hydro" && <HydroVisionIcon />}
                    {char.vision === "pyro" && <PyroVisionIcon />}
                  </CharacterPickCardVision>
                </CharacterPickCardImg>
                <CharacterPickCardInfo>
                  <CharacterPickCardInfoText>
                    {char.display_name}
                  </CharacterPickCardInfoText>
                </CharacterPickCardInfo>
              </CharacterPickCard>
            </GridItem>
          ))}
        </Grid>
      </CharacerListSettingWrapper>
    </Box>
  );
};

export default CharacterList;
