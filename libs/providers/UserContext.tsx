import { create } from "zustand";
import { createContext, useContext, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import {
  UserDataProp,
  UserDataPropState,
  UserFeatureSettingProps,
  VideoPropsSettings,
} from "@/libs/helpers/types";
import { useRouter } from "next/router";
import { api } from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { video_list } from "@/libs/includes/videos";
import { GetServerSideProps } from "next";

const currentUserState: UserDataPropState = {
  user: {
    id: "",
    username: "",
    role: "",
    avatar: "",
  },
  settings: {
    video_bg: {
      mp4: video_list["Default"].mp4,
      webm: video_list["Default"].webm,
    },
  },
  arena_id: "",
  isLoadingSubmit: false,
};

export const userStore = create<UserDataPropState & UserFeatureSettingProps>(
  (set, get) => ({
    ...currentUserState,
    setBackgroundBG: (vidSrc: VideoPropsSettings) => {
      set({ settings: { video_bg: vidSrc } });
    },
    setUserData: (userData: UserDataProp) => {
      set({ user: userData });
    },
    setArenaID: (arena: string | string[] | undefined) => {
      set({ arena_id: arena });
    },
    setLoadingSubmit: (loading: boolean) => {
      set({ isLoadingSubmit: loading });
    },
  })
);

const UserDataContext = createContext<{
  state: UserDataPropState;
  setBackgroundVid: (data: VideoPropsSettings) => void;
}>({ state: currentUserState, setBackgroundVid: () => null });

export function useUserData() {
  return useContext(UserDataContext);
}

export const UserProvider = ({ children }: any) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, settings, arena_id, setUserData, setBackgroundBG, setArenaID] =
    userStore((state) => [
      state.user,
      state.settings,
      state.arena_id,
      state.setUserData,
      state.setBackgroundBG,
      state.setArenaID,
    ]);

  const editSettings = useMutation({
    mutationFn: async (data: VideoPropsSettings) => {
      let submitResponse = await api.put("/account/settings/edit", data);
      return submitResponse.data;
    },
  });

  const getSettings = useQuery({
    queryKey: ["settingsFeat"],
    //refetchOnWindowFocus: false,
    enabled: session !== undefined ? (session !== null ? true : false) : false,
    queryFn: async () => {
      const listResponse = await api.get("/account/settings/get");
      return listResponse.data;
    },
  });

  const arenaQuery = useQuery({
    queryKey: ["arenaData"],
    refetchOnWindowFocus: false,
    enabled: session !== undefined ? (session !== null ? true : false) : false,
    queryFn: async () => {
      const listResponse = await api.get("/arena/get");
      return listResponse.data;
    },
    onSuccess: (data) => {
      if (session?.user?.role === "GM") {
        setArenaID(data.arena.uid);
      }
    },
  });

  useEffect(() => {
    getSession().then((session) => {
      const loginRouteList = ["/", "/login", "/login/arena/[arenaID]"];
      const isEmptySessionListLink = ["/arena/[arenaID]", "/arena/settings"];

      if (session !== null) {
        if (
          inArray(router.pathname, loginRouteList) &&
          !arenaQuery.isLoading &&
          session?.user?.role === "GM"
        ) {
          router.replace(`/arena/${arena_id}`);
        }
      } else {
        if (inArray(router.pathname, isEmptySessionListLink)) {
          router.replace("/");
        }
      }
    });
  }, [arena_id, router.pathname, arenaQuery]);

  const inArray = (needle: string, haystack: any) => {
    let length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (!getSettings.isLoading) {
        setBackgroundBG(getSettings?.data?.settings);
        setUserData(getSettings?.data?.user);

        if (session?.user?.role === "GM") {
          setArenaID(getSettings?.data?.arena.id);
        } else {
          if (router.query.arenaID !== undefined) {
            setArenaID(router.query.arenaID);
          }
        }
      }
    }
  }, [status, router.query, getSettings.data, getSettings.isLoading]);

  const setBackgroundVid = (data: VideoPropsSettings) => {
    setBackgroundBG(data);
    editSettings.mutate(data);
  };

  return (
    <UserDataContext.Provider
      value={{
        state: {
          user: { ...user },
          settings: { ...settings },
          arena_id: arena_id,
        },
        setBackgroundVid,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
