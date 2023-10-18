import { create } from 'zustand'
import { ArenaPlayerFunction, ArenaPlayers, ArenaPlayersPayloadFeature, ArenaPlayersState } from '../helpers/types'
import { mountStoreDevtool } from 'simple-zustand-devtools'


const initialState: ArenaPlayersState = {
    gameType: 'Casuals',
    arenaPlayers: [],
    playerInfo: {
        id: '',
        arena_id:'',
        user_id: '',
        isActive: true,
        joinedDate: '',
        user: {
            id: '',
            username: '',
            role: '',
            avatar: ''
        }
    },
    player1: {
        id: '',
        arena_id:'',
        user_id: '',
        isActive: true,
        joinedDate: '',
        user: {
            id: '',
            username: '',
            role: '',
            avatar: ''
        }
    },
    player2: {
        id: '',
        arena_id:'',
        user_id: '',
        isActive: true,
        joinedDate: '',
        user: {
            id: '',
            username: '',
            role: '',
            avatar: ''
        }
    },
    modal: false,
    modal_title: "",
    player_function_type: {
        player: "player1",
        type: 'insert'
    },
   
}


export const useArenaStore = create<ArenaPlayersState & ArenaPlayerFunction>((set, get) => ({ 
    ...initialState,
    
    setArenaPlayersList: (arenaPlayersList: ArenaPlayers[]) => {
        set({arenaPlayers: arenaPlayersList})
    },
    setModal: (modal: boolean) => {
        set({modal: modal})
    },
    setPlayer1: (player: ArenaPlayers) =>{
        set({player1: player})
    },
    setPlayer2: (player: ArenaPlayers) =>{
        set({player2: player})
    },
    setPlayerInfo: (player: ArenaPlayers) =>{
        set({playerInfo: player})
    },
    setModalTitle: (title: string) => {
        set({modal_title: title})
    },
    setPlayerFunctionType: (data: ArenaPlayersPayloadFeature) => {
        set({player_function_type: data})
    },
    setInstantNewArenaPlayer: (arenaPlayer: ArenaPlayers) => {
        let arensListPlayers: ArenaPlayers[] = [...get().arenaPlayers, arenaPlayer]
        set({arenaPlayers: arensListPlayers})
    },
    setInstantRemoveArenaPlayer: (arenaID: string) => {
        let arenaNewPlayers = get().arenaPlayers.filter((i) => i.id !== arenaID);
        set({arenaPlayers: arenaNewPlayers})
    },
    setGameType: (gameType: string) => {
        set({gameType:gameType})
    }   
}))


mountStoreDevtool('ArenaStore', useArenaStore);
