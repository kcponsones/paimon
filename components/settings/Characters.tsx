import { CharacterInfoProps } from "@/libs/helpers/types";
import { PlaySpeakerIcon, UploadIcon } from "@/libs/includes/icons";
import { WarpImgGIF } from "@/libs/includes/image";
import { api } from "@/libs/providers/api";
import { useSettingsStore } from "@/libs/store/settings";
import { ToastBox, ToastText } from "@/src/styles";
import { ArenaCheckbox } from "@/src/styles/Arena";
import { DraftBossCardBGImg } from "@/src/styles/Draft";
import {
  AudioUploadButton,
  BossCard,
  ButtonPlayCharacters,
  TableTextFont,
} from "@/src/styles/Settings";
import {
  FormLabelText,
  FormSelect,
  FormSubmitButton,
  FormTextBox,
} from "@/src/styles/login";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Image,
  SimpleGrid,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Howl } from "howler";
import { useEffect, useRef } from "react";
import { userStore } from "@/libs/providers/UserContext";

const Characters: React.FC = ({ list }: any) => {
  const toast = useToast();
  const queryclient = useQueryClient();
  const { handleSubmit, control, watch, setValue, reset } =
    useForm<CharacterInfoProps>({
      defaultValues: {
        id: "",
        name: "",
        display_name: "",
        rarity: "",
        vision: "",
        weapon: "",
        ban_audio: "",
        pick_audio: "",
        draft_picture: "",
        pick_picture: "",
        flash_picture: "",
        ban_picture: "",
        is_visible: true,
        nation: "",
      },
    });

  const [
    ban_audio_file,
    pick_audio_file,
    setBanAudioFile,
    setPickAudioFile,
    characterInfo,
    setCharacterInfo,
  ] = useSettingsStore((state) => [
    state.ban_audio_file,
    state.pick_audio_file,
    state.setBanAudioFile,
    state.setPickAudioFile,
    state.characterInfo,
    state.setCharacterInfo,
  ]);

  const [isLoadingSubmit, setLoadingSubmit] = userStore((state) => [
    state.isLoadingSubmit,
    state.setLoadingSubmit,
  ]);

  const sendAddCharacter = useMutation({
    mutationFn: async (newAccount: CharacterInfoProps) => {
      let submitResponse;
      if (characterInfo.id !== "") {
        submitResponse = await api.put("/characters/edit", newAccount);
      } else {
        submitResponse = await api.post("/characters/add", newAccount);
      }

      return submitResponse.data;
    },
    onSuccess: (data) => {
      setLoadingSubmit(false);
      toast({
        position: "top-right",
        render: () => (
          <ToastBox
            px={8}
            py={6}
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={4}
            borderLeft="10px solid #61b162"
          >
            <CheckCircleIcon boxSize={5} />
            <ToastText> {data.message}</ToastText>
          </ToastBox>
        ),
        duration: 3000,
        isClosable: true,
      });
      if (data.success) {
        reset({
          id: "",
          name: "",
          display_name: "",
          rarity: "",
          vision: "",
          weapon: "",
          draft_picture: "",
          pick_picture: "",
          flash_picture: "",
          ban_picture: "",
          ban_audio: "",
          pick_audio: "",
          is_visible: true,
          nation: "",
        });
        queryclient.invalidateQueries(["characterList"]);
        setCharacterInfo({
          id: "",
          name: "",
          display_name: "",
          rarity: "",
          vision: "",
          weapon: "",
          draft_picture: "",
          pick_picture: "",
          flash_picture: "",
          ban_picture: "",
          ban_audio: "",
          pick_audio: "",
          is_visible: true,
          nation: "",
        });
      }
    },
  });
  useEffect(() => {
    setValue("id", characterInfo.id);
    setValue("name", characterInfo.name);
    setValue("display_name", characterInfo.display_name);
    setValue("rarity", characterInfo.rarity);
    setValue("vision", characterInfo.vision);
    setValue("weapon", characterInfo.weapon);
    setValue("draft_picture", characterInfo.draft_picture);
    setValue("pick_picture", characterInfo.pick_picture);
    setValue("flash_picture", characterInfo.flash_picture);
    setValue("ban_picture", characterInfo.ban_picture);
    setValue("ban_audio", characterInfo.ban_audio);
    setValue("pick_audio", characterInfo.pick_audio);
    setValue("is_visible", characterInfo.is_visible);
    setValue("nation", characterInfo.nation);
  }, [characterInfo]);

  const onSubmitCharacters: SubmitHandler<CharacterInfoProps> = (data) => {
    setLoadingSubmit(true);
    sendAddCharacter.mutate(data);
  };

  const watchDraftPicture = watch("draft_picture"),
    watchPickPicture = watch("pick_picture"),
    watchFlashPicture = watch("flash_picture"),
    watchBanPicture = watch("ban_picture"),
    watchBanSound = watch("ban_audio"),
    watchPickSound = watch("pick_audio");

  const pickCharacterAudioFile = useRef<HTMLInputElement>(null),
    banCharacterAudioFile = useRef<HTMLInputElement>(null);

  let playPick: Howl | null = null,
    playBan: Howl | null = null;

  if (watchPickSound) {
    playPick =
      watchPickSound !== ""
        ? new Howl({
            src: [watchPickSound],
          })
        : null;
  }

  if (watchBanSound) {
    playBan =
      watchBanSound !== ""
        ? new Howl({
            src: [watchBanSound],
          })
        : null;
  }

  const handleSoundUpload = async (file: File, type: string) => {
    try {
      const formData = new FormData();
      formData.append("characterSoundFile", file);
      const { data } = await api.post("/characters/upload", formData);

      if (data.success) {
        type === "pick"
          ? setValue("pick_audio", data.path)
          : setValue("ban_audio", data.path);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <Box as="section" py={4}>
      <form method="post" onSubmit={handleSubmit(onSubmitCharacters)}>
        <FormControl mb="25px">
          <Controller
            render={({ field: { onChange, value, name } }) => (
              <ArenaCheckbox
                size="lg"
                onChange={onChange}
                value={value}
                name={name}
                defaultChecked={value}
              >
                Show This Character
              </ArenaCheckbox>
            )}
            name="is_visible"
            control={control}
          />
        </FormControl>
        <SimpleGrid columns={2} spacing={8}>
          <Flex flex={1} direction="column">
            <TableTextFont>Character Draft Picture</TableTextFont>
            <Center py={8}>
              {watchDraftPicture !== "" && (
                <Image src={watchDraftPicture} alt="avatar" width="50%" />
              )}
            </Center>

            <FormControl mb="25px">
              <FormLabelText>Image Source</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormTextBox
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                    required
                  />
                )}
                name="draft_picture"
                control={control}
              />
            </FormControl>
          </Flex>

          <Flex flex={1} direction="column">
            <TableTextFont>Flash Picture</TableTextFont>
            <Center py={watchFlashPicture !== "" ? 4 : 8}>
              {watchFlashPicture !== "" && (
                <BossCard>
                  <Box position="relative" zIndex="25" w="100%" h="100%">
                    <DraftBossCardBGImg src={WarpImgGIF} />

                    <Box position="relative" zIndex="50">
                      <Image
                        src={watchFlashPicture}
                        alt="placements-flash"
                        width="100%"
                      />
                    </Box>
                  </Box>
                </BossCard>
              )}
            </Center>

            <FormControl mb="25px">
              <FormLabelText>Image Source</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormTextBox
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                    required
                  />
                )}
                name="flash_picture"
                control={control}
              />
            </FormControl>
          </Flex>
          <Flex flex={1} direction="column">
            <TableTextFont>Character Pick Picture</TableTextFont>
            <Center py={8}>
              {watchPickPicture !== "" && (
                <Image src={watchPickPicture} alt="avatar" width="100%" />
              )}
            </Center>

            <FormControl mb="25px">
              <FormLabelText>Image Source</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormTextBox
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                    required
                  />
                )}
                name="pick_picture"
                control={control}
              />
            </FormControl>
          </Flex>
          <Flex flex={1} direction="column">
            <TableTextFont>Character Ban Picture</TableTextFont>
            <Center py={watchBanPicture !== "" ? 4 : 8}>
              {watchBanPicture !== "" && (
                <Image src={watchBanPicture} alt="avatar" width="48%" />
              )}
            </Center>
            <FormControl mb="25px">
              <FormLabelText>Image Source</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormTextBox
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                    required
                  />
                )}
                name="ban_picture"
                control={control}
              />
            </FormControl>
          </Flex>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={8} mb={8}>
          <Flex direction="column">
            {watchPickSound !== "" && (
              <ButtonPlayCharacters
                drafttype="pick"
                leftIcon={<PlaySpeakerIcon />}
                onClick={() => {
                  if (playPick === null) {
                    return;
                  }
                  playPick.play();
                }}
              >
                Play Pick Character Sound
              </ButtonPlayCharacters>
            )}

            <FormControl mt="25px">
              <FormLabelText htmlFor="pick_character_sound">
                Pick Sound Source
              </FormLabelText>
              <input
                type="file"
                id="pick_character_sound"
                ref={pickCharacterAudioFile}
                style={{ display: "none" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.files) return;

                  handleSoundUpload(e.target.files[0], "pick");
                }}
              />
              <AudioUploadButton
                onClick={() => pickCharacterAudioFile?.current?.click()}
                leftIcon={<UploadIcon />}
              >
                Upload Pick Sound
              </AudioUploadButton>
            </FormControl>
          </Flex>
          <Flex direction="column">
            {watchBanSound !== "" && (
              <ButtonPlayCharacters
                drafttype="Ban"
                leftIcon={<PlaySpeakerIcon />}
                onClick={() => {
                  if (playBan === null) {
                    return;
                  }
                  playBan.play();
                }}
              >
                Play Ban Character Sound
              </ButtonPlayCharacters>
            )}

            <FormControl mt="25px">
              <FormLabelText htmlFor="pick_character_sound">
                Ban Sound Source
              </FormLabelText>
              <input
                type="file"
                id="pick_character_sound"
                ref={banCharacterAudioFile}
                style={{ display: "none" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.files) return;

                  handleSoundUpload(e.target.files[0], "ban");
                }}
              />
              <AudioUploadButton
                onClick={() => banCharacterAudioFile?.current?.click()}
                leftIcon={<UploadIcon />}
              >
                Upload Ban Sound
              </AudioUploadButton>
            </FormControl>
          </Flex>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={8} mb={4}>
          <FormControl mb="25px">
            <FormLabelText>Character Name</FormLabelText>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <FormTextBox
                  type="text"
                  onChange={onChange}
                  value={value}
                  name={name}
                  required
                />
              )}
              name="name"
              control={control}
            />
          </FormControl>
          <FormControl mb="25px">
            <FormLabelText>Display Name</FormLabelText>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <FormTextBox
                  type="text"
                  onChange={onChange}
                  value={value}
                  name={name}
                  required
                />
              )}
              name="display_name"
              control={control}
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={8} mb={2}>
          <FormControl mb="25px">
            <FormLabelText>Rarity</FormLabelText>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <FormSelect
                  placeholder="Select Rarity"
                  onChange={onChange}
                  value={value}
                  name={name}
                  required
                >
                  <option value="4">4 Star</option>
                  <option value="5">5 Star</option>
                </FormSelect>
              )}
              name="rarity"
              control={control}
            />
          </FormControl>
          <FormControl mb="25px">
            <FormLabelText>Vision</FormLabelText>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <FormSelect
                  placeholder="Select Vision"
                  onChange={onChange}
                  value={value}
                  name={name}
                  required
                >
                  <option value="anemo">Anemo</option>
                  <option value="cryo">Cryo</option>
                  <option value="dendro">Dendro</option>
                  <option value="electro">Electro</option>
                  <option value="geo">Geo</option>
                  <option value="hydro">Hydro</option>
                  <option value="pyro">Pyro</option>
                </FormSelect>
              )}
              name="vision"
              control={control}
            />
          </FormControl>
        </SimpleGrid>

        <FormControl mb="25px">
          <FormLabelText>Nation</FormLabelText>
          <Controller
            render={({ field: { onChange, value, name } }) => (
              <FormSelect
                placeholder="Select Nation"
                onChange={onChange}
                value={value}
                name={name}
                required
              >
                <option value="Mondstadt">Mondstadt</option>
                <option value="Liyue">Liyue</option>
                <option value="Inazuma">Inazuma</option>
                <option value="Sumeru">Sumeru</option>
                <option value="Fontaine">Fontaine</option>
                <option value="Natlan">Natlan</option>
                <option value="Snezhnaya">Snezhnaya</option>
              </FormSelect>
            )}
            name="nation"
            control={control}
          />
        </FormControl>
        <FormControl mb="25px">
          <FormLabelText>Weapon</FormLabelText>
          <Controller
            render={({ field: { onChange, value, name } }) => (
              <FormSelect
                placeholder="Select Weapon"
                onChange={onChange}
                value={value}
                name={name}
                required
              >
                <option value="Catalyst">Catalyst</option>
                <option value="Claymore">Claymore</option>
                <option value="Sword">Sword</option>
                <option value="Polearm">Polearm</option>
                <option value="Bow">Bow</option>
              </FormSelect>
            )}
            name="weapon"
            control={control}
          />
        </FormControl>

        <FormSubmitButton disabled={isLoadingSubmit} type="submit">
          {isLoadingSubmit === true ? (
            <Spinner
              thickness="5px"
              speed="0.5s"
              emptyColor="#ECDEB5"
              color="#1E223F"
            />
          ) : characterInfo.id !== "" ? (
            "Edit Character"
          ) : (
            "Create Character"
          )}
        </FormSubmitButton>

        {characterInfo.id !== "" && (
          <FormSubmitButton
            type="button"
            mt={8}
            onClick={() => {
              setCharacterInfo({
                id: "",
                name: "",
                display_name: "",
                rarity: "",
                vision: "",
                weapon: "",
                draft_picture: "",
                pick_picture: "",
                flash_picture: "",
                ban_picture: "",
                ban_audio: "",
                pick_audio: "",
                is_visible: true,
              });
            }}
          >
            Reset Forms
          </FormSubmitButton>
        )}
      </form>
    </Box>
  );
};

export default Characters;
