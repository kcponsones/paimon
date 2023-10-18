import { create } from "zustand";
import { CharacterInfoProps, DraftInfoProps, SpiralAbyssFunction, SpiralAbyssStateProps } from "../helpers/types";
import { mountStoreDevtool } from "simple-zustand-devtools";


const initState: SpiralAbyssStateProps = {
    pick: {
        player1: [],
        player2: []
    },
    ban: {
        player1: [],
        player2: []
    },
    timer: 0,
    isPauseTimer: true,
    isPauseCharacterDraft: false,
    isPopupWinnerModal: false,
}


export const useSpiralAbyssDraftStore = create<SpiralAbyssStateProps & SpiralAbyssFunction>((set, get) => ({
    ...initState,
    setPickPlayer1: (pickList: DraftInfoProps[]) => {
        set((state) => ({
            pick: {
                ...state.pick,
                player1: pickList,
            },
        }));
    },
    setPickPlayer2: (pickList: DraftInfoProps[]) => {
        set((state) => ({
            pick: {
                ...state.pick,
                player2: pickList,
            },
        }));
    },
    setBanPlayer1: (banList: DraftInfoProps[]) => {
        set((state) => ({
            ban: {
              ...state.ban,
              player1: banList,
            },
          }));
    },
    setBanPlayer2: (banList: DraftInfoProps[]) => {
        set((state) => ({
            ban: {
              ...state.ban,
              player2: banList,
            },
          }));
    },
    updatePlayer1PickDraft: (characterID: string, index: string, characterInfo: CharacterInfoProps) => {
        set((state) => {
            const updatedPlayer1Pick = state.pick.player1.map((draft) =>
              draft.index === index
                ? { ...draft, characterID, character: characterInfo }
                : draft,
            );
      
            return {
              pick: {
                ...state.pick,
                player1: updatedPlayer1Pick,
              },
            };
        });
    },
    updatePlayer2PickDraft: (characterID: string, index: string, characterInfo: CharacterInfoProps) => {
        set((state) => {
            const updatedPlayer2Pick = state.pick.player2.map((draft) =>
              draft.index === index
                ? { ...draft, characterID, character: characterInfo }
                : draft,
            );
      
            return {
              pick: {
                ...state.pick,
                player2: updatedPlayer2Pick,
              },
            };
        });
    },
    updatePlayer1BanDraft: (characterID: string, index: string, characterInfo: CharacterInfoProps) => {
        set((state) => {
            const updatedPlayer1Bans = state.ban.player1.map((draft) =>
              draft.index === index
                ? { ...draft, characterID, character: characterInfo }
                : draft,
            );
      
            return {
              ban: {
                ...state.ban,
                player1: updatedPlayer1Bans,
              },
            };
        });
    },
    updatePlayer2BanDraft: (characterID: string, index: string, characterInfo: CharacterInfoProps) => {
        set((state) => {
            const updatedPlayer2Bans = state.ban.player2.map((draft) =>
              draft.index === index
                ? { ...draft, characterID, character: characterInfo }
                : draft,
            );
      
            return {
              ban: {
                ...state.ban,
                player2: updatedPlayer2Bans,
              },
            };
        });
    },
    setTimer: (time: number) => {
      set({timer: time})
    },
    setIsPause: (method: boolean) => {
      set({isPauseTimer: method})
    },
    setIsPauseCharacterDraft: (pause: boolean) => {
      set({isPauseCharacterDraft: pause})
    },
    setPopupModalWinner: (popup: boolean) => {
      set({isPopupWinnerModal: popup})
    },
}))

mountStoreDevtool('SpiralAbyssStore', useSpiralAbyssDraftStore);