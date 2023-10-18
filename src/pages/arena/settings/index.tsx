import BackgroundVid from "@/components/BackgroundVid";
import Account from "@/components/settings/Account";
import AccountList from "@/components/settings/AccountList";
import Boss from "@/components/settings/Boss";
import BossList from "@/components/settings/BossList";
import CharacterList from "@/components/settings/CharacterList";
import Characters from "@/components/settings/Characters";
import { CharacterListProps } from "@/libs/helpers/types";
import { BackIcon } from "@/libs/includes/icons";
import { useUserData, userStore } from "@/libs/providers/UserContext";
import { ButtonPopUpNav } from "@/src/styles";
import {
  AreaCardWrapper,
  ArenaCard,
  ArenaPaddingWrap,
  ArenaTitleText,
} from "@/src/styles/Arena";
import { SettingsTabs } from "@/src/styles/Settings";
import {
  Box,
  Container,
  Flex,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Settings({ characters }: any) {
  const { state } = useUserData();
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [arena_id] = userStore((state) => [state.arena_id]);

  return (
    <>
      <Head>
        <title>Settings - Endgame</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundVid
        mp4={state.settings.video_bg.mp4}
        webm={state.settings.video_bg.webm}
        height="102%"
      />

      <Box as="nav" w="100%">
        <Flex
          px={10}
          py={5}
          w="100%"
          justifyContent="flex-start"
          direction="row"
          gap={4}
        >
          <Box>
            <ButtonPopUpNav onClick={() => router.push(`/arena/${arena_id}`)}>
              <BackIcon />
            </ButtonPopUpNav>
          </Box>
        </Flex>
      </Box>

      <Box position="relative" w="100%">
        <Container maxW="container.xl" minW="1200px">
          <ArenaCard>
            <AreaCardWrapper widthgap="95%">
              <ArenaPaddingWrap>
                <ArenaTitleText>Settings</ArenaTitleText>

                <Tabs
                  onChange={(index) => setTabIndex(index)}
                  isFitted
                  variant="unstyled"
                >
                  <TabList>
                    <SettingsTabs>Account</SettingsTabs>
                    <SettingsTabs>Boss</SettingsTabs>
                    <SettingsTabs>Characters</SettingsTabs>
                  </TabList>
                  <TabIndicator height="3px" bg="#ecdeb5" borderRadius="1px" />
                  <TabPanels>
                    <TabPanel>
                      <Box py={4}>
                        <Account />
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box py={4}>
                        <Boss />
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box py={4}>
                        <Characters />
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ArenaPaddingWrap>
            </AreaCardWrapper>
          </ArenaCard>

          <ArenaCard>
            <AreaCardWrapper widthgap="95%">
              <ArenaPaddingWrap>
                <ArenaTitleText>List</ArenaTitleText>
                <Box py={4}>
                  {tabIndex === 0 && <AccountList />}
                  {tabIndex === 1 && <BossList />}
                  {tabIndex === 2 && <CharacterList list={characters} />}
                </Box>
              </ArenaPaddingWrap>
            </AreaCardWrapper>
          </ArenaCard>
        </Container>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps<CharacterListProps> = async () => {
  const prisma = new PrismaClient();
  const characters = await prisma.characters.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  return {
    props: { characters },
  };
};