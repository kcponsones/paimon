import { NextPage } from "next";
import { useRouter } from "next/router";
import { useUserData } from "@/libs/providers/UserContext";
import Head from "next/head";
import dynamic from "next/dynamic";
import { socket } from "@/libs/providers/socket";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/providers/api";
import { useDraftStore } from "@/libs/store/draft";
import { useEffect } from "react";
import {
  CharacterDraftPayloadProps,
  DraftInfoProps,
  TimerUpdateProps,
} from "@/libs/helpers/types";
import {
  findCharacterByCharacterID,
  getSequenceByIndex,
  inArray,
} from "@/libs/providers/draft";
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Img,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import DraftFooter from "@/components/DraftFooter";
import {
  DraftSpiralAbyssCard,
  DraftSpiralAbyssCharacterName,
  DraftSpiralAbyssWrapper,
  SpiralAbyssCard,
  SpiralAbyssCardWrapper,
  SpiralAbyssLabelText,
  SpiralAbyssStartButton,
} from "@/src/styles/SpiralAbyss";
import {
  AnemoVisionIcon,
  CharacterIconSpiralAbyss,
  CryoVisionIcon,
  DendroVisionIcon,
  ElectroVisionIcon,
  GeoVisionIcon,
  HydroVisionIcon,
  PyroVisionIcon,
  SpiralAbyssBGLogo,
  StartIcon,
} from "@/libs/includes/icons";
import { useSpiralAbyssDraftStore } from "@/libs/store/spiralAbyss";
import {
  banIndexListSpiralAbyssPlayer1,
  banIndexListSpiralAbyssPlayer2,
  pickIndexListSpiralAbyssPlayer1,
  pickIndexListSpiralAbyssPlayer2,
} from "@/libs/providers/spiral_abyss";
import { Howl } from "howler";
import CharacterDraft from "@/components/spiral_abyss/Characters";

const BackgroundVid = dynamic(() => import("@/components/BackgroundVid"), {
  ssr: false,
});

const HeaderSpiralAbyss = dynamic(
  () => import("@/components/spiral_abyss/Header"),
  {
    ssr: false,
  }
);

const DraftCountDownSpiralAbyss = dynamic(
  () => import("@/components/spiral_abyss/Countdown"),
  {
    ssr: false,
  }
);

const SpiralAbyssDraft: NextPage = () => {
  const { state, setBackgroundVid } = useUserData();
  const router = useRouter();

  const [
    pick,
    ban,
    timer,
    setTimer,
    isPauseTimer,
    setIsPause,
    isPauseCharacterDraft,
    setIsPauseCharacterDraft,
    setPickPlayer1,
    setPickPlayer2,
    setBanPlayer1,
    setBanPlayer2,
    updatePlayer1BanDraft,
    updatePlayer2BanDraft,
    updatePlayer1PickDraft,
    updatePlayer2PickDraft,
    isPopupWinnerModal,
    setPopupModalWinner,
  ] = useSpiralAbyssDraftStore((state) => [
    state.pick,
    state.ban,
    state.timer,
    state.setTimer,
    state.isPauseTimer,
    state.setIsPause,
    state.isPauseCharacterDraft,
    state.setIsPauseCharacterDraft,
    state.setPickPlayer1,
    state.setPickPlayer2,
    state.setBanPlayer1,
    state.setBanPlayer2,
    state.updatePlayer1BanDraft,
    state.updatePlayer2BanDraft,
    state.updatePlayer1PickDraft,
    state.updatePlayer2PickDraft,
    state.isPopupWinnerModal,
    state.setPopupModalWinner,
  ]);

  const [
    applyCharacterModal,
    setApplyCharacterModal,
    isStartDraft,
    setIsStartDraft,
    player1,
    player2,
    setPlayer1Info,
    setPlayer2Info,
    sequence,
    setSequenceList,
    currentSequence,
    setCurrentSequence,
    draftSituation,
    setDraftSituation,
    sequenceIndex,
    setSequenceIndex,
    characterDraft,
    characters,
    setCharacterDraftList,
    setCharacterDraftListUpdate,
    setCharacterListAfterUpdate,
    currentCharacterChoose,
    setIsDoneChooseCharacter,
    setCurrentCharacterChoice,
    winnerButton,
    setWinnerButton,
    setCharactersList,
    isGMDoneDeclareWinner,
    setIsGMDoneDeclareWinner,
    gameType,
    setGameType,
  ] = useDraftStore((state) => [
    state.applyCharacterModal,
    state.setApplyCharacterModal,
    state.isStartDraft,
    state.setIsStartDraft,
    state.player1,
    state.player2,
    state.setPlayer1Info,
    state.setPlayer2Info,
    state.sequence,
    state.setSequenceList,
    state.currentSequence,
    state.setCurrentSequence,
    state.draftSituation,
    state.setDraftSituation,
    state.sequenceIndex,
    state.setSequenceIndex,
    state.characterDraft,
    state.characters,
    state.setCharacterDraftList,
    state.setCharacterDraftListUpdate,
    state.setCharacterListAfterUpdate,
    state.currentCharacterChoose,
    state.setIsDoneChooseCharacter,
    state.setCurrentCharacterChoice,
    state.winnerButton,
    state.setWinnerButton,
    state.setCharactersList,
    state.isGMDoneDeclareWinner,
    state.setIsGMDoneDeclareWinner,
    state.gameType,
    state.setGameType,
  ]);

  const timerUpdate = useMutation({
    mutationFn: async (data: TimerUpdateProps) => {
      let submitResponse = await api.post("/arena/draft/timer", data);
      return submitResponse.data;
    },
  });

  const startDraftAbyss = useMutation({
    mutationFn: async (data: any) => {
      let submitResponse = await api.post("/arena/draft/start", data);
      return submitResponse.data;
    },
    onSuccess: (data) => {
      socket.emit("redraft", data.socket);
    },
  });

  const draftSequence = useMutation({
    mutationFn: async (data: any) => {
      let submitResponse = await api.post("/arena/draft/init", data);
      return submitResponse.data;
    },
    onSuccess: (data) => {
      if (data.socket) {
        socket.emit("bossDraftInit", data.socket);
      }
    },
  });

  const draftDataQuery = useQuery({
    queryKey: ["draftData", router.query.draftID],
    queryFn: async () => {
      const listResponse = await api.post("/arena/draft/get", {
        draft_id: router?.query?.draftID,
      });
      return listResponse.data;
    },
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data.success === true) {
        setTimer(data.result.timer);
        setIsPause(true);
        setPlayer1Info({
          id: data.result.player1.id,
          avatar: data.result.player1.avatar,
          username: data.result.player1.username,
        });
        setPlayer2Info({
          id: data.result.player2.id,
          avatar: data.result.player2.avatar,
          username: data.result.player2.username,
        });

        let pickPlayer1List: DraftInfoProps[] = [],
          pickPlayer2List: DraftInfoProps[] = [],
          banPlayer1List: DraftInfoProps[] = [],
          banPlayer2List: DraftInfoProps[] = [],
          characterDraft: CharacterDraftPayloadProps[] = [];

        data.result.CharacterDraft.map((i: DraftInfoProps) => {
          if (inArray(i.index, pickIndexListSpiralAbyssPlayer1)) {
            pickPlayer1List.push(i);
          } else if (inArray(i.index, pickIndexListSpiralAbyssPlayer2)) {
            pickPlayer2List.push(i);
          } else if (inArray(i.index, banIndexListSpiralAbyssPlayer1)) {
            banPlayer1List.push(i);
          } else if (inArray(i.index, banIndexListSpiralAbyssPlayer2)) {
            banPlayer2List.push(i);
          }
          const characterDraftInfo: CharacterDraftPayloadProps = {
            draftID: i.draftID,
            index: i.index,
            playerID: i.playerID || "",
            status: i.status,
            characterID: i.characterID || "",
          };

          characterDraft.push(characterDraftInfo);
        });

        setCharacterDraftList(characterDraft);
        setPickPlayer1(pickPlayer1List);
        setPickPlayer2(pickPlayer2List);
        setBanPlayer1(banPlayer1List);
        setBanPlayer2(banPlayer2List);
        setSequenceList(JSON.parse(data.result.sequence));
        setIsGMDoneDeclareWinner(
          data.result.winner_user_id !== null ? true : false
        );
        setWinnerButton(data.result.winner_user_id !== null ? true : false);
        setGameType(data.result.arena.type);

        if (
          data.result.current_status_draft !== null ||
          data.result.current_status_draft !== "init"
        ) {
          let credatedSequence = getSequenceByIndex(
            data.result.current_status_draft,
            JSON.parse(data.result.sequence)
          );
          setCurrentSequence(credatedSequence);
        }
      }
    },
  });

  useQuery({
    queryFn: async () => {
      const listResponse = await api.post("/arena/draft/update", {
        draft_id: router?.query?.draftID,
      });
      return listResponse.data;
    },
    queryKey: ["characterUpdateDraft", router.query.draftID],
    enabled: isStartDraft && state.user.role === "Drafter",
    refetchInterval: isStartDraft === true ? 2500 : false,
    onSuccess: (data) => {
      let pickPlayer1List: DraftInfoProps[] = [],
        pickPlayer2List: DraftInfoProps[] = [],
        banPlayer1List: DraftInfoProps[] = [],
        banPlayer2List: DraftInfoProps[] = [],
        characterDraftSpiralAbyssList: CharacterDraftPayloadProps[] = [];

      data.result.map((i: DraftInfoProps) => {
        if (inArray(i.index, pickIndexListSpiralAbyssPlayer1)) {
          pickPlayer1List.push(i);
        } else if (inArray(i.index, pickIndexListSpiralAbyssPlayer2)) {
          pickPlayer2List.push(i);
        } else if (inArray(i.index, banIndexListSpiralAbyssPlayer1)) {
          banPlayer1List.push(i);
        } else if (inArray(i.index, banIndexListSpiralAbyssPlayer2)) {
          banPlayer2List.push(i);
        }
        const characterDraftInfo: CharacterDraftPayloadProps = {
          draftID: i.draftID,
          index: i.index,
          playerID: i.playerID || "",
          status: i.status,
          characterID: i.characterID || "",
        };

        characterDraftSpiralAbyssList.push(characterDraftInfo);
      });

      setCharacterDraftList(characterDraft);
      setPickPlayer1(pickPlayer1List);
      setPickPlayer2(pickPlayer2List);
      setBanPlayer1(banPlayer1List);
      setBanPlayer2(banPlayer2List);

      setCharacterDraftListUpdate(characterDraftSpiralAbyssList, characters);
    },
  });

  const characterListQuery = useQuery({
    queryFn: async () => {
      const listResponse = await api.post("/characters/list", {
        page: "Character List",
      });
      return listResponse.data.list;
    },
    queryKey: ["characterDraftList", router.query.draftID],
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      for (const character of data) {
        character.isPicked = false;
      }
      setCharacterDraftListUpdate(characterDraft, data);
    },
  });

  useEffect(() => {
    const timerFeat = (data: any) => {
      let countdown = data.timer;
      setTimer(countdown);
      if (data.isPauseTimer === true) {
        setIsPause(true);
      } else {
        setIsPause(false);
      }
    };

    socket.on(`timerDraft_${router.query.draftID}`, timerFeat);

    return () => {
      socket.off(`timerDraft_${router.query.draftID}`, timerFeat);
    };
  }, [router, state.user]);

  useEffect(() => {
    const backArena = (data: any) => {
      if (router.query.draftID === data.draft_id) {
        router.push(`/arena/${data.arena_id}`);
      }
    };
    const restartDraft = (data: any) => {
      router.push(
        `/arena/${data.arena_id}/draft/${gameType.toLowerCase()}/${
          data.draft_id
        }`
      );
    };

    const characterDraft = (data: any) => {
      setDraftSituation("characterDraft");
      setIsStartDraft(true);
      setIsPauseCharacterDraft(true);
      if (data.sequence !== null) {
        setCurrentSequence(data.sequence);
        setSequenceIndex(data.sequenceIndex);
      }

      setCurrentCharacterChoice({
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

      if (data.isStartingDraft === false) {
        if (data.characterID !== "") {
          setCharacterListAfterUpdate(data.characterID, characters);
          let characterInfo = findCharacterByCharacterID(
            data.characterID,
            characters
          );

          if (characterInfo) {
            let characterChooseAudio = null;

            if (
              data.sequence !== null &&
              characterInfo.pick_audio &&
              characterInfo.ban_audio
            ) {
              if (
                inArray(
                  sequence[sequenceIndex].index,
                  banIndexListSpiralAbyssPlayer1
                )
              ) {
                updatePlayer1BanDraft(
                  data.characterID,
                  sequence[sequenceIndex].index,
                  characterInfo
                );
                characterChooseAudio = new Howl({
                  src: [characterInfo.ban_audio],
                });
              } else if (
                inArray(
                  sequence[sequenceIndex].index,
                  banIndexListSpiralAbyssPlayer2
                )
              ) {
                updatePlayer2BanDraft(
                  data.characterID,
                  sequence[sequenceIndex].index,
                  characterInfo
                );
                characterChooseAudio = new Howl({
                  src: [characterInfo.ban_audio],
                });
              } else if (
                inArray(
                  sequence[sequenceIndex].index,
                  pickIndexListSpiralAbyssPlayer1
                )
              ) {
                updatePlayer1PickDraft(
                  data.characterID,
                  sequence[sequenceIndex].index,
                  characterInfo
                );
                characterChooseAudio = new Howl({
                  src: [characterInfo.pick_audio],
                });
              } else if (
                inArray(
                  sequence[sequenceIndex].index,
                  pickIndexListSpiralAbyssPlayer1
                )
              ) {
                updatePlayer2PickDraft(
                  data.characterID,
                  sequence[sequenceIndex].index,
                  characterInfo
                );
                characterChooseAudio = new Howl({
                  src: [characterInfo.pick_audio],
                });
              }
              if (state.user.role === "GM" && characterChooseAudio !== null) {
                characterChooseAudio.play();
              }
            } else {
              updatePlayer2PickDraft(
                data.characterID,
                sequence[sequenceIndex].index,
                characterInfo
              );

              if (characterInfo.pick_audio) {
                characterChooseAudio = new Howl({
                  src: [characterInfo.pick_audio],
                });
              }
              if (state.user.role === "GM" && characterChooseAudio !== null) {
                characterChooseAudio.play();
                setWinnerButton(true);
              }
              setTimer(0);
              setIsPauseCharacterDraft(true);
            }
          }
        }
        setTimeout(() => {
          if (data.sequence !== null) {
            let characterAnnounce = new Howl({
              src: [`/audio/${data.sequence.audio}.wav`],
            });
            characterAnnounce.play();

            if (state.user.role === "GM") {
              socket.emit("draftTimer", {
                timer: 30,
                function: `timerDraft_${router.query.draftID}`,
                draft_id: router.query.draftID,
                isContinuingCooldown: false,
                isPauseTimer: false,
                draftSituation: "characterDraft",
              });
              timerUpdate.mutate({
                timer: 30,
                draft_id: router.query.draftID,
              });
            }
          }
          setIsPauseCharacterDraft(false);
          setIsDoneChooseCharacter(false);
        }, 3500);
      } else {
        let characterAnnounce = new Howl({
          src: [`/audio/${data.sequence.audio}.wav`],
        });
        characterAnnounce.play();
        setIsPauseCharacterDraft(false);
      }
    };

    socket.on("back-arena", backArena);
    socket.on(`restart_draft_${router.query.draftID}`, restartDraft);
    socket.on(`switch_layer_draft_${router.query.draftID}`, restartDraft);
    socket.on(`characterDraft_${router.query.draftID}`, characterDraft);

    return () => {
      socket.off("back-arena", backArena);
      socket.off(`restart_draft_${router.query.draftID}`, restartDraft);
      socket.off(`switch_layer_draft_${router.query.draftID}`, restartDraft);
      socket.off(`characterDraft_${router.query.draftID}`, characterDraft);
    };
  }, [router, state.user, timer, sequence, currentSequence]);

  useEffect(() => {
    let intervalID: NodeJS.Timeout;
    console.log(1);
    if (!isPauseTimer) {
      intervalID = setInterval(() => {
        let countdown: number = timer - 1;
        if (countdown < 0) {
          clearInterval(intervalID);
          setIsPause(false);

          if (state.user.role === "GM" && draftSituation === "characterDraft") {
            onCharacterDraftChoose();
          }
        }
        setTimer(countdown);
      }, 1000);
    }

    return () => clearInterval(intervalID);
  }, [timer, isPauseTimer, state.user.role, draftSituation]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onToggleCharacterPickModal();
        setCharactersList(characterListQuery.data);
      }
    };

    if (applyCharacterModal) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [applyCharacterModal]);

  const acceptRestartDraft = () => {
    startDraftAbyss.mutate({
      mode: "",
      arenaID: router.query.arenaID,
      arena_type: gameType,
      player1: player1.id,
      player2: player2.id,
      player1_name: player1.username,
      player2_name: player2.username,
      boss_id: null,
      function: `restart_draft_${router.query.draftID}`,
      type: "start_drafting",
    });
  };
  const acceptSwitchPlayersDraft = () => {
    startDraftAbyss.mutate({
      mode: "",
      arenaID: router.query.arenaID,
      arena_type: gameType,
      player1: player2.id,
      player2: player1.id,
      player1_name: player2.username,
      player2_name: player1.username,
      boss_id: null,
      function: `restart_draft_${router.query.draftID}`,
      type: "start_drafting",
    });
  };

  const onToggleCharacterPickModal = () => {
    setApplyCharacterModal(!applyCharacterModal);
  };

  const onCharacterDraftChoose = () => {
    socket.emit("draftTimer", {
      timer: timer,
      function: `timerDraft_${router.query.draftID}`,
      draft_id: router.query.draftID,
      isContinuingCooldown: false,
      isPauseTimer: true,
      draftSituation: draftSituation,
    });

    timerUpdate.mutate({
      timer: timer,
      draft_id: router.query.draftID,
    });

    socket.emit("characterDraft", {
      draft_id: router.query.draftID,
      function: `characterDraft_${router.query.draftID}`,
      sequence: currentSequence,
      sequenceList: sequence,
      sequenceIndex: sequenceIndex + 1,
      isStartingDraft: false,
      characterID:
        currentCharacterChoose.id !== "" ? currentCharacterChoose.id : null,
    });

    draftSequence.mutate({
      draft_id: router.query.draftID,
      type: "character_draft",
      sequence: currentSequence,
      sequenceIndex: sequenceIndex + 1,
      isStartingDraft: false,
      characterID:
        currentCharacterChoose.id !== "" ? currentCharacterChoose.id : null,
    });
  };

  return (
    <>
      <Head>
        <title>Drating - Spiral Abyss - Endgame</title>
        <meta name="description" content="Endgame Drafting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {state.user.id !== "" && (
        <BackgroundVid
          mp4={state.settings.video_bg.mp4}
          webm={state.settings.video_bg.webm}
        />
      )}

      <HeaderSpiralAbyss
        onAcceptRestartDraft={acceptRestartDraft}
        onAcceptSwitchPlayersDraft={acceptSwitchPlayersDraft}
        onOpenCharacterModal={onToggleCharacterPickModal}
        state={state}
        socket={socket}
        router={router}
        winnerButton={winnerButton}
        setPopupModalWinner={setPopupModalWinner}
        setBackgroundVid={setBackgroundVid}
        isGMDoneDeclareWinner={isGMDoneDeclareWinner}
      />

      <CharacterDraft
        applyCharacterModal={applyCharacterModal}
        state={state}
        timer={timer}
        onCharacterPick={onCharacterDraftChoose}
        characterListQuery={characterListQuery.data}
        characterPauseDraft={isPauseCharacterDraft}
      />

      <Container maxW="1275px" pt={4} height="calc(100vh - 100px)">
        <VStack w="100%" h="100%" justifyContent="space-between">
          {state.user.role === "GM" && isStartDraft === false ? (
            <SpiralAbyssStartButton
              onClick={() => {
                setTimeout(() => {
                  socket.emit("characterDraft", {
                    draft_id: router.query.draftID,
                    function: `characterDraft_${router.query.draftID}`,
                    sequence: sequence[sequenceIndex],
                    sequenceList: sequence,
                    sequenceIndex: 0,
                    isStartingDraft: true,
                  });

                  draftSequence.mutate({
                    draft_id: router.query.draftID,
                    type: "character_draft",
                    sequence: sequence[sequenceIndex],
                    sequenceIndex: 0,
                    isStartingDraft: true,
                  });

                  socket.emit("draftTimer", {
                    timer: 30,
                    function: `timerDraft_${router.query.draftID}`,
                    draft_id: router.query.draftID,
                    isContinuingCooldown: false,
                    isPauseTimer: false,
                    draftSituation: "characterDraft",
                  });

                  timerUpdate.mutate({
                    timer: 30,
                    draft_id: router.query.draftID,
                  });
                }, 1000);
              }}
            >
              <StartIcon />
              Start
            </SpiralAbyssStartButton>
          ) : (
            <DraftCountDownSpiralAbyss timer={timer} />
          )}

          <SpiralAbyssCard>
            <SpiralAbyssCardWrapper>
              {draftDataQuery.isLoading === true ? (
                <Center h="100%" w="100%">
                  <Spinner
                    thickness="15px"
                    speed="0.5s"
                    emptyColor="#ECDEB5"
                    color="#1E223F"
                    width="125px"
                    height="125px"
                  />
                </Center>
              ) : (
                <VStack h="100%" w="100%">
                  <SpiralAbyssLabelText>Ban</SpiralAbyssLabelText>
                  <Flex
                    direction="row"
                    justifyContent="space-between"
                    gap={12}
                    mb={4}
                  >
                    <HStack gap={2}>
                      {ban.player1.map((draft, bIndex1) => (
                        <DraftSpiralAbyssCard
                          typedraft="ban"
                          iscurrentdraftpos={
                            draft.index === currentSequence.index
                              ? "true"
                              : "false"
                          }
                          key={bIndex1}
                        >
                          <DraftSpiralAbyssWrapper
                            rarity={
                              draft.characterID !== null
                                ? draft.character.rarity.toString()
                                : "null"
                            }
                          >
                            <Box className="vision-logo">
                              {draft.characterID !== null &&
                                draft.character.vision === "anemo" && (
                                  <AnemoVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "cryo" && (
                                  <CryoVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "dendro" && (
                                  <DendroVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "electro" && (
                                  <ElectroVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "geo" && (
                                  <GeoVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "hydro" && (
                                  <HydroVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "pyro" && (
                                  <PyroVisionIcon />
                                )}
                            </Box>
                            <SpiralAbyssBGLogo />
                            {draft.characterID !== null ? (
                              <Img
                                alt={draft.character.name + "-chaeracter"}
                                src={draft.character.draft_picture}
                              />
                            ) : (
                              <CharacterIconSpiralAbyss />
                            )}
                          </DraftSpiralAbyssWrapper>
                          <DraftSpiralAbyssCharacterName>
                            {draft.characterID !== null
                              ? draft.character.name
                              : ""}
                          </DraftSpiralAbyssCharacterName>
                        </DraftSpiralAbyssCard>
                      ))}
                    </HStack>
                    <HStack gap={2}>
                      {ban.player2.map((draft, bIndex2) => (
                        <DraftSpiralAbyssCard
                          typedraft="ban"
                          iscurrentdraftpos={
                            draft.index === currentSequence.index
                              ? "true"
                              : "false"
                          }
                          key={bIndex2}
                        >
                          <DraftSpiralAbyssWrapper
                            rarity={
                              draft.characterID !== null
                                ? draft.character.rarity.toString()
                                : "null"
                            }
                          >
                            <Box className="vision-logo">
                              {draft.characterID !== null &&
                                draft.character.vision === "anemo" && (
                                  <AnemoVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "cryo" && (
                                  <CryoVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "dendro" && (
                                  <DendroVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "electro" && (
                                  <ElectroVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "geo" && (
                                  <GeoVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "hydro" && (
                                  <HydroVisionIcon />
                                )}
                              {draft.characterID !== null &&
                                draft.character.vision === "pyro" && (
                                  <PyroVisionIcon />
                                )}
                            </Box>
                            <SpiralAbyssBGLogo />
                            {draft.characterID !== null ? (
                              <Img
                                alt={draft.character.name + "-chaeracter"}
                                src={draft.character.draft_picture}
                              />
                            ) : (
                              <CharacterIconSpiralAbyss />
                            )}
                          </DraftSpiralAbyssWrapper>
                          <DraftSpiralAbyssCharacterName>
                            {draft.characterID !== null
                              ? draft.character.name
                              : ""}
                          </DraftSpiralAbyssCharacterName>
                        </DraftSpiralAbyssCard>
                      ))}
                    </HStack>
                  </Flex>
                  <SpiralAbyssLabelText>Pick</SpiralAbyssLabelText>
                  <Flex direction="row" justifyContent="space-between" gap={12}>
                    <HStack>
                      <Grid
                        templateColumns="repeat(4, 1fr)"
                        templateRows="repeat(2, 1fr)"
                        gap={4}
                      >
                        {pick.player1.map((draft, pIndex1) => (
                          <GridItem key={pIndex1}>
                            <DraftSpiralAbyssCard
                              typedraft="pick"
                              iscurrentdraftpos={
                                draft.index === currentSequence.index
                                  ? "true"
                                  : "false"
                              }
                            >
                              <DraftSpiralAbyssWrapper
                                rarity={
                                  draft.characterID !== null
                                    ? draft.character.rarity.toString()
                                    : "null"
                                }
                              >
                                <Box className="vision-logo">
                                  {draft.characterID !== null &&
                                    draft.character.vision === "anemo" && (
                                      <AnemoVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "cryo" && (
                                      <CryoVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "dendro" && (
                                      <DendroVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "electro" && (
                                      <ElectroVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "geo" && (
                                      <GeoVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "hydro" && (
                                      <HydroVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "pyro" && (
                                      <PyroVisionIcon />
                                    )}
                                </Box>
                                <SpiralAbyssBGLogo />
                                {draft.characterID !== null ? (
                                  <Img
                                    alt={draft.character.name + "-chaeracter"}
                                    src={draft.character.draft_picture}
                                  />
                                ) : (
                                  <CharacterIconSpiralAbyss />
                                )}
                              </DraftSpiralAbyssWrapper>
                              <DraftSpiralAbyssCharacterName>
                                {draft.characterID !== null
                                  ? draft.character.name
                                  : ""}
                              </DraftSpiralAbyssCharacterName>
                            </DraftSpiralAbyssCard>
                          </GridItem>
                        ))}
                      </Grid>
                    </HStack>
                    <HStack gap={2}>
                      <Grid
                        templateColumns="repeat(4, 1fr)"
                        templateRows="repeat(2, 1fr)"
                        gap={4}
                      >
                        {pick.player2.map((draft, pIndex2) => (
                          <GridItem key={pIndex2}>
                            <DraftSpiralAbyssCard
                              typedraft="pick"
                              iscurrentdraftpos={
                                draft.index === currentSequence.index
                                  ? "true"
                                  : "false"
                              }
                            >
                              <DraftSpiralAbyssWrapper
                                rarity={
                                  draft.characterID !== null
                                    ? draft.character.rarity.toString()
                                    : "null"
                                }
                              >
                                <Box className="vision-logo">
                                  {draft.characterID !== null &&
                                    draft.character.vision === "anemo" && (
                                      <AnemoVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "cryo" && (
                                      <CryoVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "dendro" && (
                                      <DendroVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "electro" && (
                                      <ElectroVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "geo" && (
                                      <GeoVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "hydro" && (
                                      <HydroVisionIcon />
                                    )}
                                  {draft.characterID !== null &&
                                    draft.character.vision === "pyro" && (
                                      <PyroVisionIcon />
                                    )}
                                </Box>
                                <SpiralAbyssBGLogo />
                                {draft.characterID !== null ? (
                                  <Img
                                    alt={draft.character.name + "-chaeracter"}
                                    src={draft.character.draft_picture}
                                  />
                                ) : (
                                  <CharacterIconSpiralAbyss />
                                )}
                              </DraftSpiralAbyssWrapper>
                              <DraftSpiralAbyssCharacterName>
                                {draft.characterID !== null
                                  ? draft.character.name
                                  : ""}
                              </DraftSpiralAbyssCharacterName>
                            </DraftSpiralAbyssCard>
                          </GridItem>
                        ))}
                      </Grid>
                    </HStack>
                  </Flex>
                </VStack>
              )}
            </SpiralAbyssCardWrapper>
          </SpiralAbyssCard>

          <Flex flex={1} w="100%" alignItems="flex-end" mb="-15px !important">
            <DraftFooter
              player1Name={player1.username}
              player2Name={player2.username}
            />
          </Flex>
        </VStack>
      </Container>
    </>
  );
};
export default SpiralAbyssDraft;
