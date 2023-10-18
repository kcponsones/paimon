import Head from "next/head";
import { CenterBox, ToastBox, ToastText } from "@/src/styles";
import { useUserData, userStore } from "@/libs/providers/UserContext";
import {
  Box,
  Center,
  FormControl,
  Image,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import {
  FormLabelText,
  FormSelect,
  FormSubmitButton,
  FormTextBox,
  LoginCard,
  LoginCardWrapper,
} from "@/src/styles/login";
import { LoginImageLogo } from "@/libs/includes/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { GMLoginProps } from "@/libs/helpers/types";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/libs/providers/api";
import { CheckCircleIcon } from "@chakra-ui/icons";
import useSafePush from "@/libs/hooks/useSafePush";
import dynamic from "next/dynamic";

const BackgroundVid = dynamic(() => import("@/components/BackgroundVid"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

const Login: NextPage = () => {
  const { state } = useUserData();
  const toast = useToast();
  const { safePush } = useSafePush();
  const { handleSubmit, control } = useForm<GMLoginProps>({
    defaultValues: {
      gm_name: "",
      secret_key: "",
      role: "GM",
      game_type: "",
    },
  });

  const [setArenaID, isLoadingSubmit, setLoadingSubmit, setUserData] =
    userStore((state) => [
      state.setArenaID,
      state.isLoadingSubmit,
      state.setLoadingSubmit,
      state.setUserData,
    ]);

  const authCheck = useMutation({
    mutationFn: async (data: GMLoginProps) => {
      let submitResponse = await api.post("/arena/create", data);
      return submitResponse.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        setArenaID(data.arena.uid);
        setUserData(data.user);

        setTimeout(() => {
          safePush(`/arena/${data.arena.uid}`);
        }, 1000);
      }
    },
  });

  const submitGMLogin: SubmitHandler<GMLoginProps> = async (data) => {
    setLoadingSubmit(true);
    const res = await signIn("credentials", {
      username: data.gm_name,
      password: data.secret_key,
      role: data.role,
      redirect: false,
    });

    if (res?.ok) {
      authCheck.mutate(data);
      setLoadingSubmit(false);
    } else {
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
            borderLeft="10px solid #c93535"
          >
            <CheckCircleIcon boxSize={5} />
            <ToastText>Invalid Credentials</ToastText>
          </ToastBox>
        ),
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Endgame - Login</title>
        <meta name="description" content="Endgame Gramdmaster Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundVid
        mp4={state.settings.video_bg.mp4}
        webm={state.settings.video_bg.webm}
      />

      <Box position="relative" h="calc(100vh - 66px)">
        <CenterBox>
          <LoginCard>
            <LoginCardWrapper>
              <Center mb="75px">
                <Image src={LoginImageLogo} w="400px" alt="login-image" />
              </Center>

              <form method="post" onSubmit={handleSubmit(submitGMLogin)}>
                <FormControl mb="25px">
                  <FormLabelText>GM Name</FormLabelText>
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
                    name="gm_name"
                    control={control}
                  />
                </FormControl>

                <FormControl mb="25px">
                  <FormLabelText>Secret Key</FormLabelText>
                  <Controller
                    render={({ field: { onChange, value, name } }) => (
                      <FormTextBox
                        type="password"
                        onChange={onChange}
                        value={value}
                        name={name}
                        required
                      />
                    )}
                    name="secret_key"
                    control={control}
                  />
                </FormControl>

                <FormControl mb="50px">
                  <FormLabelText>Game Type</FormLabelText>
                  <Controller
                    render={({ field: { onChange, value, name } }) => (
                      <FormSelect
                        variant="outline"
                        placeholder="Select Game Type"
                        onChange={onChange}
                        name={name}
                        value={value}
                        required
                      >
                        <option value="Casuals">Casuals</option>
                        <option value="Officials">Officials</option>
                        <option value="Spiral Abyss">Spiral Abyss</option>
                      </FormSelect>
                    )}
                    name="game_type"
                    control={control}
                  />
                </FormControl>

                <FormSubmitButton type="submit">
                  {isLoadingSubmit === true ? (
                    <Spinner
                      thickness="5px"
                      speed="0.5s"
                      emptyColor="#ECDEB5"
                      color="#1E223F"
                    />
                  ) : (
                    "  Create Room"
                  )}
                </FormSubmitButton>
              </form>
            </LoginCardWrapper>
          </LoginCard>
        </CenterBox>
      </Box>

      <Footer />
    </>
  );
};

export default Login;
