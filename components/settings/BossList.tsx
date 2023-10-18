import { BossInfoProps } from "@/libs/helpers/types";
import { api } from "@/libs/providers/api";
import { useSettingsStore } from "@/libs/store/settings";
import { BosstAvatarWrapperMini } from "@/src/styles/Settings";
import { Box, Center, Grid, GridItem, Image, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { shallow } from "zustand/shallow";

const BossList: React.FC = () => {
  const [bossList, setBossList, setBossInfo] = useSettingsStore((state) => [
    state.bossList,
    state.setBossList,
    state.setBossInfo,
  ]);

  const bossListQuery = useQuery({
    queryKey: ["listBoss"],
    queryFn: async () => {
      const listResponse = await api.get("/boss/list");
      return listResponse.data.list;
    },
    onSuccess: (data: BossInfoProps[]) => {
      setBossList(data);
    },
  });

  const onSetEditBoss = (boss: BossInfoProps) => {
    setBossInfo(boss);
  };

  return (
    <Box w="100%">
      {bossListQuery.isLoading ? (
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
        <Grid templateColumns="repeat(4, 1fr)" gap={8}>
          {bossList.map((boss, b) => (
            <GridItem key={b}>
              <Center>
                <BosstAvatarWrapperMini
                  onClick={() => {
                    onSetEditBoss(boss);
                  }}
                >
                  <Image src={boss.picture} alt="avatar" width="100%" />
                </BosstAvatarWrapperMini>
              </Center>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BossList;
