import { useUserData } from "@/libs/providers/UserContext";
import { api } from "@/libs/providers/api";
import {
  banIndexListPlayer1,
  banIndexListPlayer2,
  inArray,
  pickIndexListPlayer1,
  pickIndexListPlayer2,
} from "@/libs/providers/draft";
import { recordStore } from "@/libs/store/record";
import { CenterBox } from "@/src/styles";
import {
  HistoryCard,
  HistoryCardWrapper,
  HistoryPaddingWrap,
  HistoryPaginationButton,
  HistoryPaginationIconButton,
  HistoryTable,
  HistoryTableBossAvatar,
  HistoryTableCharacterAvatar,
  HistoryTableContainer,
  HistoryTableHead,
  HistoryTablePlayerAvatar,
  HistoryTablePlayerText,
  HistoryTitleText,
} from "@/src/styles/History";
import { FormLabelText, FormSelect } from "@/src/styles/login";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Container,
  Flex,
  FormControl,
  Image,
  Spinner,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

const BackgroundVid = dynamic(() => import("@/components/BackgroundVid"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

const History: NextPage = () => {
  const { state } = useUserData();

  const [
    records,
    currentPage,
    paginationNumbers,
    isPreviousPagination,
    isNextPagination,
    setRecordsData,
    setCurrentNumber,
    setPaginationNumbers,
    setPaginationButton,
    recordFilter,
    setRecordFilter,
    recordListFilter,
    setRecordListFilter,
  ] = recordStore((state) => [
    state.records,
    state.currentPage,
    state.paginationNumbers,
    state.isPreviousPagination,
    state.isNextPagination,
    state.setRecordsData,
    state.setCurrentNumber,
    state.setPaginationNumbers,
    state.setPaginationButton,
    state.recordFilter,
    state.setRecordFilter,
    state.recordListFilter,
    state.setRecordListFilter,
  ]);
  const recordData = useQuery({
    queryKey: ["draftRecords"],
    queryFn: async () => {
      const listRecord = await api.post("/history", {
        page: currentPage,
      });
      return listRecord.data;
    },
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setRecordsData(data.records);
      setCurrentNumber(data.currentNumber);
      setPaginationNumbers(data.paginationNumbers);
      setRecordListFilter(data.arenaList);
      data.currentNumber == 1 && setPaginationButton(false, "prev");
      data.currentNumber == data.paginationNumbers.length &&
        setPaginationButton(false, "next");
    },
  });

  const adjustPagination = useMutation({
    mutationFn: async (num: number) => {
      const listRecord = await api.post("/history", {
        page: num,
      });
      return listRecord.data;
    },
    onSuccess: (data) => {
      setRecordsData(data.records);
      setRecordFilter(recordFilter);
    },
  });

  const paginationFunc = (index: number) => {
    setCurrentNumber(index);
    setPaginationButton(index == 1 ? false : true, "prev");
    setPaginationButton(
      index == paginationNumbers.length ? false : true,
      "next"
    );
    adjustPagination.mutate(index);
  };

  return (
    <>
      <Head>
        <title>Endgame - History</title>
        <meta name="description" content="Endgame History" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundVid
        mp4={state.settings.video_bg.mp4}
        webm={state.settings.video_bg.webm}
      />

      <Box position="relative" w="100%" h="calc(100vh - 66px)">
        <CenterBox>
          <Container maxW="container.xl" minW="1250px">
            <HistoryCard>
              <HistoryCardWrapper>
                <HistoryPaddingWrap>
                  <HistoryTitleText>History</HistoryTitleText>
                  {/* <FormControl mb="25px">
                    <FormLabelText>Select Match</FormLabelText>
                    <FormSelect
                      placeContent="Select Avatar"
                      onChange={(e) => {
                        setRecordsData(recordData.data.records);
                        setRecordFilter(e.target.value);
                      }}
                      value={recordFilter}
                    >
                      {recordListFilter.map((data, d) => (
                        <option key={d} value={data.name}>
                          {data.name}
                        </option>
                      ))}
                    </FormSelect>
                  </FormControl> */}

                  {recordData.isLoading === true ? (
                    <Center height="300px">
                      <Spinner
                        thickness="15px"
                        speed="0.5s"
                        emptyColor="#ECDEB5"
                        color="#1E223F"
                        width="150px"
                        height="150px"
                      />
                    </Center>
                  ) : (
                    <HistoryTableContainer>
                      <HistoryTable variant="simple">
                        <HistoryTableHead>
                          <Tr>
                            <Th>Boss</Th>
                            <Th>Player 1</Th>
                            <Th>Pick</Th>
                            <Th>Ban</Th>
                            <Th>Player 2</Th>
                            <Th>Pick</Th>
                            <Th>Ban</Th>
                            <Th>Winner</Th>
                          </Tr>
                        </HistoryTableHead>
                        <Tbody>
                          {records.map((record: any, index: any) => (
                            <Tr key={index}>
                              <Td>
                                <HistoryTableBossAvatar>
                                  <Image
                                    src={record.boss.picture}
                                    width="100%"
                                    height="100%"
                                    alt="boss-img"
                                  />
                                </HistoryTableBossAvatar>
                              </Td>
                              <Td>
                                <Flex direction="row" alignItems="center">
                                  <HistoryTablePlayerAvatar>
                                    <Image
                                      src={record.player1.avatar}
                                      width="100%"
                                      height="100%"
                                    />
                                  </HistoryTablePlayerAvatar>
                                  <HistoryTablePlayerText>
                                    {record.player1.username}
                                  </HistoryTablePlayerText>
                                </Flex>
                              </Td>
                              <Td>
                                <Flex direction="row" alignItems="center">
                                  {record.CharacterDraft.map(
                                    (chars: any, indexChar: number) => {
                                      if (
                                        inArray(
                                          chars.index,
                                          pickIndexListPlayer1
                                        )
                                      ) {
                                        return (
                                          <HistoryTableCharacterAvatar
                                            key={indexChar}
                                          >
                                            {chars.character !== null && (
                                              <Image
                                                src={
                                                  chars.character.draft_picture
                                                }
                                                width="100%"
                                                height="100%"
                                              />
                                            )}
                                          </HistoryTableCharacterAvatar>
                                        );
                                      }
                                    }
                                  )}
                                </Flex>
                              </Td>
                              <Td>
                                <Flex direction="row" alignItems="center">
                                  {record.CharacterDraft.map(
                                    (chars: any, indexChar: number) => {
                                      if (
                                        inArray(
                                          chars.index,
                                          banIndexListPlayer1
                                        )
                                      ) {
                                        return (
                                          <HistoryTableCharacterAvatar
                                            key={indexChar}
                                          >
                                            {chars.character !== null && (
                                              <Image
                                                src={
                                                  chars.character.draft_picture
                                                }
                                                width="100%"
                                                height="100%"
                                              />
                                            )}
                                          </HistoryTableCharacterAvatar>
                                        );
                                      }
                                    }
                                  )}
                                </Flex>
                              </Td>
                              <Td>
                                <Flex direction="row" alignItems="center">
                                  <HistoryTablePlayerAvatar>
                                    <Image
                                      src={record.player2.avatar}
                                      width="100%"
                                      height="100%"
                                    />
                                  </HistoryTablePlayerAvatar>
                                  <HistoryTablePlayerText>
                                    {record.player2.username}
                                  </HistoryTablePlayerText>
                                </Flex>
                              </Td>
                              <Td>
                                <Flex direction="row" alignItems="center">
                                  {record.CharacterDraft.map(
                                    (chars: any, indexChar: number) => {
                                      if (
                                        inArray(
                                          chars.index,
                                          pickIndexListPlayer2
                                        )
                                      ) {
                                        return (
                                          <HistoryTableCharacterAvatar
                                            key={indexChar}
                                          >
                                            {chars.character !== null && (
                                              <Image
                                                src={
                                                  chars.character.draft_picture
                                                }
                                                width="100%"
                                                height="100%"
                                              />
                                            )}
                                          </HistoryTableCharacterAvatar>
                                        );
                                      }
                                    }
                                  )}
                                </Flex>
                              </Td>
                              <Td>
                                <Flex direction="row" alignItems="center">
                                  {record.CharacterDraft.map(
                                    (chars: any, indexChar: number) => {
                                      if (
                                        inArray(
                                          chars.index,
                                          banIndexListPlayer2
                                        )
                                      ) {
                                        return (
                                          <HistoryTableCharacterAvatar
                                            key={indexChar}
                                          >
                                            {chars.character !== null && (
                                              <Image
                                                src={
                                                  chars.character.draft_picture
                                                }
                                                width="100%"
                                                height="100%"
                                              />
                                            )}
                                          </HistoryTableCharacterAvatar>
                                        );
                                      }
                                    }
                                  )}
                                </Flex>
                              </Td>
                              <Td>
                                <Flex direction="row" alignItems="center">
                                  <HistoryTablePlayerAvatar>
                                    <Image
                                      src={record.user.avatar}
                                      width="100%"
                                      height="100%"
                                    />
                                  </HistoryTablePlayerAvatar>
                                  <HistoryTablePlayerText>
                                    {record.user.username}
                                  </HistoryTablePlayerText>
                                </Flex>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </HistoryTable>
                    </HistoryTableContainer>
                  )}

                  <Center mt={8} gap={2}>
                    {isPreviousPagination === true && (
                      <HistoryPaginationIconButton
                        aria-label="Backward Button"
                        onClick={() => paginationFunc(currentPage - 1)}
                        icon={<ArrowBackIcon />}
                      />
                    )}
                    {paginationNumbers.map((num, index) => (
                      <HistoryPaginationButton
                        key={index}
                        isactive={currentPage == num ? "true" : "false"}
                        onClick={() => paginationFunc(num)}
                      >
                        {num}
                      </HistoryPaginationButton>
                    ))}

                    {isNextPagination === true && (
                      <HistoryPaginationIconButton
                        aria-label="Forward Button"
                        onClick={() => paginationFunc(currentPage + 1)}
                        icon={<ArrowForwardIcon />}
                      />
                    )}
                  </Center>
                </HistoryPaddingWrap>
              </HistoryCardWrapper>
            </HistoryCard>
          </Container>
        </CenterBox>
      </Box>

      <Footer />
    </>
  );
};
export default History;
