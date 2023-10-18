import { NextRouter } from "next/router";

export declare interface UserFeatureAction {
    type: USER_FEATURE;
    payload: any;
}

export declare interface GMLoginProps {
    gm_name: string | number
    secret_key: string | number
    role: string | ""
    game_type: string | number
}


export declare interface PlayerLoginProps {
    team_name: string | number
    avatar: string
    role: string
    arenaID?: any
}

export declare interface AvatarProps {
    name: string
    src: string
}

export declare interface ArenaDraftProps {
    user_gm_id: string
    mode: "1v1" | "2v2" | "3v3" | "4v4" | string
    is_manual_select_boss: any
    boss_id?: string
}

export type GetRandomNumberOptions = {
    decimalPlaces?: number;
};


export declare interface DraftPositionProps {
    aligndraft: 'left' | 'right' | string
    widthcharacter?: string
    colorcharacter?: any
    indexcharacter?: string
    statusdraft?: 'pick' | 'ban' | 'none' | string
    currentpickdraft?: 'true' | 'false'
}

export declare interface IconSizeSVGProps {
    width: string
    height: string
}

export declare interface ModalFeatures {
    isOpen: boolean
    onClose: () => void
    title: string,
    onAcceptButton?: (() => void) | undefined
    onCloseButton?: () => void
}

export declare interface ModalBoss {
    isOpen: boolean
    onClose: () => void
    onAccept: (playerID: string, playerPosition: string) => void
    onDecline: (playerID: string, playerPosition: string) => void
    boss: BossInfoProps
    timer: number
    user_state: any,
    player1: PlayerDraftInfo
    player2: PlayerDraftInfo
    isDoneChooseReroll: boolean
    setIsDoneChooseReroll: (reroll: boolean) => void
}

export declare interface CharacterDraftDesignProps {
    ischaractermodalactive?: 'true' | 'false' | string
    isselectedeleemnt?: 'true' | 'false' | string
    rarity?: '4' | '5' | string,
    colorpickedcharacter?: string
    drafttype?: 'pick' | 'ban' | string
    currentdraft?: 'true' | 'false' | string
    ispickedcharacter?: string | undefined
}

export declare interface CharacterDraftProps {
    statusCharacterModal: boolean
    onCloseCharacterModal?: () => void
    onOpenCharacterModal?: () => void
    state?: UserDataPropState
    router?: NextRouter
    setBackgroundVid?: ((data: VideoPropsSettings) => void) | undefined
    ban?: DraftSketchProps
    banWidth?: number
    boss?: BossInfoProps | undefined
    colorConvertVision?: ((vision: string) => void) | undefined
    characterListQuery?: any
    timer?: number
    onCharacterPick?: any
    currentSequence?: DraftSequence | undefined
    onAcceptRestartDraft?: () => void
    onAcceptSwitchPlayersDraft?: () => void
    socket?: any
    characterPauseDraft?: boolean
    winnerButton?: boolean
    setPopupModalWinner?: (popup: boolean) => void
    isGMDoneDeclareWinner?: boolean
}

export declare interface ProfileChanges {
    id?: string,
    username: string | undefined
    role: string | undefined
    avatar: string | undefined
    password?: string
    confirm_password?: string

}

export declare interface BossInfoProps {
    id?: string
    name: string
    picture: string
    picture_choose: string
    picture_flash: string
    is_visible: any
}

export declare interface CharacterInfoProps {
    id?: string,
    name: string
    display_name?: string | any
    rarity: string
    vision: any
    weapon: string
    draft_picture: string
    pick_picture: string
    flash_picture: string
    ban_picture: string
    ban_audio: string | null 
    pick_audio: string | null 
    is_visible: any
    nation?: string | any
    isPicked?: boolean | undefined
}


export declare interface VideoProerties {
    videoheight: string;
}


export type SettingState = {
    isGeneratePassword: boolean;
    userList: ProfileChanges[]
    bossList: BossInfoProps[]
    characterList: CharacterInfoProps[]
    searchUser: string
    searchCharacter: string
    userInfo: ProfileChanges
    bossInfo: BossInfoProps
    characterInfo: CharacterInfoProps,
    ban_audio_file: string,
    pick_audio_file: string
}

export type SettingActions = {
    applyGeneratePassword: (isGonnaGeneratePassword: boolean) => void
    setUserList: (users: ProfileChanges[]) => void
    setUserInfo: (boss: ProfileChanges) => void
    setSearchUser: (search: string) => void
    setSearchCharacter: (search: string) => void
    searchUserList: (name: string) => vold
    searchCharacterList: (name: string) => vold
    setBossList: (bosses: BossInfoProps[]) => void
    setBossInfo: (boss: BossInfoProps) => void
    setCharacterList: (characters: CharacterInfoProps[]) => void
    setCharacterInfo: (character: CharacterInfoProps) => void
    setBanAudioFile: (audio_file: string) => void
    setPickAudioFile: (audio_file: string) => void
}

export type VideoPropsSettings = {
    mp4: string;
    webm: string;
    height?: string;
};

export type UserDataProp = {
    id: string | number
    username: string
    role: string
    avatar?: string
    arenaID?: string | string[] | undefined
};

export type UserSettingsProp = {
    video_bg: VideoPropsSettings;
};

export declare interface UserDataPropState {

    user: UserDataProp;
    settings: UserSettingsProp;
    arena_id: string | string[] | undefined
    isLoadingSubmit?: boolean
}

export type UserFeatureSettingProps = {
    setBackgroundBG: (vidSrc: VideoPropsSettings) => void
    setUserData: (userData: UserDataProp) => void
    setArenaID: (arena: string | string[] | undefined) => void
    setLoadingSubmit: (loading: boolean) => void
}

export type ArenaPlayers = {
    id: string,
    arena_id: string
    user_id: string
    isActive?: boolean
    joinedDate?: string,
    user?: ProfileChanges
}

export type ArenaPlayersPayloadFeature = {
    player: string | undefined
    type: string | 'insert' | 'remove'
}

export type ArenaSetPlayers = {
    id: any //arena player id 
    user_id?: string | undefined
    name: string | undefined
    avatar: string | undefined
}

export type ArenaPlayersState = {
    arenaPlayers: ArenaPlayers[]
    modal: boolean
    playerInfo: ArenaPlayers
    player1: ArenaPlayers
    player2: ArenaPlayers
    modal_title: string
    player_function_type: ArenaPlayersPayloadFeature,
    gameType: string
}

export type ArenaPlayerFunction = {
    setArenaPlayersList: (arenaPlayers: ArenaPlayers[]) => void
    setModal: (modal: boolean) => void
    setPlayer1: (player: ArenaPlayers) => void
    setPlayer2: (player: ArenaPlayers) => void
    setPlayerInfo: (player: ArenaPlayers) => void
    setModalTitle: (title: string) => void
    setPlayerFunctionType: (data: ArenaPlayersPayloadFeature) => void
    setInstantNewArenaPlayer: (arenaPlayer: ArenaPlayers) => void
    setInstantRemoveArenaPlayer: (arenaID: string) => void
    setGameType: (gameType: string) => void
}

export type PusherType = {
    appId: string | undefined
    key: string | undefined
    secret: string | undefined
    cluster: string | undefined
    useTLS: boolean
}

export type DraftPlayerChooseInfo = {

}
export type DraftPlayerCharacterInfo = {
    pick: CharacterInfoProps[],
    ban: CharacterInfoProps[]
}

export type DraftSketchProps = {
    player1: DraftInfoProps[],
    player2: DraftInfoProps[]
}

export type PlayerDraftInfo = {
    id: string
    username: string
    avatar: string
}
export type DraftBanLayout = {
    wrapperWidthSize: string
    imageWidthSize: string
    indexCharacter: string
}
export type DraftInfoProps = {
    uid: string
    draftID: string,
    character: CharacterInfoProps
    characterID: string | null
    status: 'pick' | 'ban' | string
    index: string
    wrapperWidthSize?: string
    imageWidthSize?: string
    indexCharacter?: string
    playerID?: string
}

export type DraftBanFormat = {
    player1: DraftInfoProps[]
    player2: DraftInfoProps[]
}


export type SequenceDraft = {
    audio: string
    player: string
    index: string
}

export type DraftCharacterList = {
    player1: DraftInfoProps[]
    player2: DraftInfoProps[]
}

export type DraftSequence = {
    audio: string,
    player: string,
    index: string
}

export type DraftStateProps = {
    init: string
    characters: CharacterInfoProps[]
    characterFilterElement: string
    searchCharacter: string
    applyCharacterModal: boolean
    applyBossModal: boolean
    isStartDraft: boolean
    currentPlayerDraft: string
    currentAudioPlay: string
    boss: BossInfoProps
    currentCharacterChoose: CharacterInfoProps
    finalCharacterChoose: CharacterInfoProps
    player1: PlayerDraftInfo
    player2: PlayerDraftInfo
    pick: DraftInfoProps[][],
    ban: DraftBanFormat,
    pickListCharacterDraft: DraftCharacterList
    banListCharacterDraft: DraftCharacterList
    banWidthSize: number
    sequence: DraftSequence[]
    sequenceIndex: number,
    currentSequence: DraftSequence
    currentCharacterFlash: string
    currentBossFlash: string,
    player1_reroll: boolean | null
    player2_reroll: boolean | null
    draftSituation: string
    isReroll: boolean
    characterDraft: CharacterDraftPayloadProps[],
    isDoneChooseCharacter: boolean
    mode: string
    winnerButton: boolean,
    isGMDoneDeclareWinner: boolean,
    gameType: string
}

export type DraftFunctions = {
    setInit: (init: string) => void
    setCharactersList: (characterList: CharacterInfoProps[]) => void
    setApplyCharacterModal: (modal: boolean) => void
    setApplyBossModal: (modal: boolean) => void
    setIsStartDraft: (start: boolean) => void
    setSearchCharacter: (char: string) => void
    searchCharacterList: (name: string, vision: string) => void
    setCharacterFilterVision: (vision: string) => void
    setCurrentCharacterChoice: (characterInfo: CharacterInfoProps) => void
    setPlayer1Info: (player: PlayerDraftInfo) => void
    setPlayer2Info: (player: PlayerDraftInfo) => void
    setBossInfo: (bossInfo: BossInfoProps) => void
    setPickList: (pickList: DraftInfoProps[], mode: string) => void
    setBanList: (banList: DraftInfoProps[], mode: string) => void
    setSequenceList: (mode: DraftSequence[]) => void
    setCurrentSequence: (currentSequence: DraftSequence) => void
    setCurrentAudioPlay: (audio: string) => void
    setCurrentCharacterFlash: (img: string) => void
    setCurrentBossFlash: (img: string) => void
    setPlayer1Reroll: (roll: boolean | null) => void
    setPlayer2Reroll: (roll: boolean | null) => void
    setDraftSituation: (situation: string) => void
    setIsReroll: (reroll: boolean) => void
    setSequenceIndex: (index: number) => void
    setCharacterDraftList: (characterDraftList: CharacterDraftPayloadProps[]) => void
    setCharacterDraftListUpdate: (characterDraftList: CharacterDraftPayloadProps[], characters: CharacterInfoProps[]) => void
    setCharacterListAfterUpdate: (characterID: string, characters: CharacterInfoProps[]) => void
    setIsDoneChooseCharacter: (isDone: boolean) => void
    setMode: (mode: string) => void
    updateBanDraftCharacters: (characterID: string, index: string, characterInfo: CharacterInfoProps, ban: DraftBanFormat, banArrangeList: DraftCharacterList) => void
    updatePickDraftCharacters: (characterID: string, index: string, characterInfo: CharacterInfoProps, pick: DraftInfoProps[][], pickArrangeList: DraftCharacterList) => void
    setWinnerButton: (winnerButton: boolean) => void,
    setIsGMDoneDeclareWinner: (isDeclareWinner: boolean) => void
    setGameType: (gameType: string) => void
}

export declare interface CharacterDraftPayloadProps {
    draftID: string
    index: string
    playerID: string
    status: string
    characterID?: string | null
}

export type BackToArenaProps = {
    draft_id: string | string[] | undefined
    arena_id: string | string[] | undefined
}

export declare interface PlayerNameDraft {
    player1Name: string
    player2Name: string
}

export type DraftCountdownProps = {
    timer: number
    player1IsReroll: boolean | null
    player2IsReroll: boolean | null
}


export type TimerUpdateProps = {
    timer: number
    draft_id: string | string[] | undefined
    isContinuingCooldown?: boolean
    isPauseTimer?: boolean
    draftSituation?: string
}

export type TimerStoreState = {
    timer: number
    isPauseTimer: boolean
    isDoneChooseReroll: boolean
    isPopupWinnerModal: boolean
    isPauseCharacterDraft: boolean
}

export type TimerFunction = {
    setTimer: (time: number) => void
    setIsPause: (method: boolean) => void
    setIsDoneChooseReroll: (reroll: boolean) => void
    setPopupModalWinner: (popup: boolean) => void
    setIsPauseCharacterDraft: (pause: boolean) => void
}

export declare interface WinnerModalProps {
    isOpen: boolean
    onClose: () => void
    player1: PlayerDraftInfo
    player2: PlayerDraftInfo
    onPlayerWinner: (player_id: stgring) => void
    setPopupModalWinner: (popup: boolean) => void
}

export type CharacterListProps = {
    characters: CharacterInfoProps[];
};

export type CharacterListPropsDraft = {
    character_list: CharacterInfoProps[];
};

export type ModalPlayerClueProps = {
    drafttype: string
    isactive: string
}

export type CharacterDraftRecords = {
    character: {
        draft_picture: string
    },
    index: string
}

export type RecordDataProps = {
    CharacterDraft: CharacterDraftRecords[],
    arena: {
        name: string
    },
    boss: {
        picture: string
    },
    player1: {
        avatar: string,
        username: string
    },
    player2: {
        avatar: string,
        username: string
    },
    user: {
        avatar: string,
        username: string
    }
}
export type RecordFilterListProps = {
    name: string
}

export type RecordStoreState = {
    records: RecordDataProps[],
    currentPage: number, 
    paginationNumbers: number[],
    isPreviousPagination: boolean,
    isNextPagination: boolean,
    recordFilter: string,
    recordListFilter: RecordFilterListProps[]
}

export type RecordFunction = {
    setRecordsData: (records: RecordDataProps[]) => void,
    setCurrentNumber: (currentNumber: number) => void,
    setPaginationNumbers: (paginationNum: number[]) => void
    setPaginationButton: (isSet: boolean, type: string) => void
    setRecordFilter: (filter: string) => void
    setRecordListFilter: (filterList: RecordFilterListProps[]) => void
}

export type SpiralAbyssHeaderProps = {
    onAcceptRestartDraft?: () => void
    onAcceptSwitchPlayersDraft?: () => void
    onOpenCharacterModal?: () => void
    state?: UserDataPropState 
    socket?: any
    router?: NextRouter
    winnerButton: boolean
    setPopupModalWinner?: (popup: boolean) => void
    setBackgroundVid?: ((data: VideoPropsSettings) => void) | undefined
    isGMDoneDeclareWinner?: boolean
}

export type DraftSpiralAbyssProps = {
    applyCharacterModal: boolean
    state?: UserDataPropState 
    timer?: number
    onCharacterPick?: any
    characterListQuery?: any
    characterPauseDraft?: boolean
}


export type SpiralAbyssStateProps = {
    pick: {
        player1: DraftInfoProps[],
        player2: DraftInfoProps[],
    },
    ban: {
        player1: DraftInfoProps[],
        player2: DraftInfoProps[],
    },
    timer: number
    isPauseTimer: boolean
    isPauseCharacterDraft: boolean
    isPopupWinnerModal: boolean,
}

export type SpiralAbyssFunction = {
    setPickPlayer1: (pickList: DraftInfoProps[]) => void
    setPickPlayer2: (pickList: DraftInfoProps[]) => void
    setBanPlayer1: (banList: DraftInfoProps[]) => void
    setBanPlayer2: (banList: DraftInfoProps[]) => void
    updatePlayer1PickDraft: (characterID: string, index: string, characterInfo: CharacterInfoProps) => void 
    updatePlayer2PickDraft: (characterID: string, index: string, characterInfo: CharacterInfoProps) => void 
    updatePlayer1BanDraft: (characterID: string, index: string, characterInfo: CharacterInfoProps) => void 
    updatePlayer2BanDraft: (characterID: string, index: string, characterInfo: CharacterInfoProps) => void 
    setTimer: (time: number) => void
    setIsPause: (method: boolean) => void
    setIsPauseCharacterDraft: (pause: boolean) => void
    setPopupModalWinner: (popup: boolean) => void
}

export type DraftCountdownSpiralAbyssProps = {
    timer: number
}