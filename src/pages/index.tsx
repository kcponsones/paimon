import Head from "next/head";
import { useUserData } from "@/libs/providers/UserContext";
import { Box, Center, Container, Image } from "@chakra-ui/react";
import { AreaCardWrapper, ArenaCard } from "../styles/Arena";
import { CenterBox } from "../styles";
import { LoginImageLogo } from "@/libs/includes/image";
import { AudioUploadButton } from "../styles/Settings";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const BackgroundVid = dynamic(() => import("@/components/BackgroundVid"), {
  ssr: false,
});

export default function Home() {
  const { state } = useUserData();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Endgame</title>
        <meta
          name="description"
          content="Endgame Website for Paimon Sandwitch"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundVid
        mp4={state.settings.video_bg.mp4}
        webm={state.settings.video_bg.webm}
      />

      <Box position="relative" w="100%" h="calc(100vh - 66px)">
        <CenterBox>
          <Container maxW="container.xl" minW="1000px">
            <ArenaCard>
              <AreaCardWrapper widthgap="95%">
                <Box py={12}>
                  <Center mb="50px">
                    <Image src={LoginImageLogo} w="400px" alt="login-image" />
                  </Center>
                  <Center>
                    <Box w="500px">
                      <AudioUploadButton onClick={() => router.push("/login")}>
                        Login as GM
                      </AudioUploadButton>
                    </Box>
                  </Center>
                </Box>
              </AreaCardWrapper>
            </ArenaCard>
          </Container>
        </CenterBox>
      </Box>

      <Footer></Footer>
    </>
  );
}
