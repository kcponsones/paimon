import { create } from "zustand";
import { TimerFunction, TimerStoreState } from "../helpers/types";


const initialState: TimerStoreState = {
    timer: 0,
    isPauseTimer: true,
    isDoneChooseReroll: false,
    isPopupWinnerModal: false,
    isPauseCharacterDraft: false,
}

export const timerStore = create<TimerStoreState & TimerFunction>((set, get) => ({ 
    ...initialState,
    setTimer: (time: number) => {
        set({timer: time})
    },
    setIsPause: (method: boolean) => {
        set({isPauseTimer: method})
    },
    setIsDoneChooseReroll: (reroll: boolean) => {
        set({isDoneChooseReroll: reroll})
    },
    setPopupModalWinner: (popup: boolean) => {
        set({isPopupWinnerModal: popup})
    },
    setIsPauseCharacterDraft: (pause: boolean) => {
        set({isPauseCharacterDraft: pause})
    }
}))