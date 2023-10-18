import { create } from 'zustand'
import { BossInfoProps, CharacterDraftPayloadProps, CharacterInfoProps, DraftBanFormat, DraftCharacterList, DraftFunctions, DraftInfoProps, DraftSequence, DraftStateProps, PlayerDraftInfo } from '../helpers/types'
import { arrangeDraftCharacterlistModal, draftLayoutBan, draftLayoutPick, getBanWidth, updateBanListDraftCharacters, updateCharacters, updateCharactersAfterDraft, updateCharactersDraftList, updatePickListDraftCharacters } from '../providers/draft'
import { mountStoreDevtool } from 'simple-zustand-devtools';

const initialState: DraftStateProps = {
    init: "",
    characters: [],
    characterFilterElement: "all",
    searchCharacter: '',
    applyCharacterModal: false,
    applyBossModal: false,
    isStartDraft: false,
    currentPlayerDraft: "",
    boss: {
        id: "",
        name: "",
        picture: "",
        picture_choose: "",
        picture_flash: "",
        is_visible: true
    },
    currentCharacterChoose: {
        id:'',
        name: '',
        display_name: '',
        rarity: '',
        vision: '',
        weapon: '',
        draft_picture: '',
        pick_picture: '',
        flash_picture: '',
        ban_picture: '',
        ban_audio:   '',
        pick_audio:  '',
        is_visible: true,
        nation: ''
    },
    finalCharacterChoose:{
        id:'',
        name: '',
        display_name: '',
        rarity: '',
        vision: '',
        weapon: '',
        draft_picture: '',
        pick_picture: '',
        flash_picture: '',
        ban_picture: '',
        ban_audio:   '',
        pick_audio:  '',
        is_visible: true,
        nation: ''
    },
    player1: {
        id: '',
        username: '',
        avatar: '',
    },
    player2: {
        id: '',
        username: '',
        avatar: '',
    },
    pick: [],
    ban: {player1: [], player2: []},
    pickListCharacterDraft: {player1: [], player2: []},
    banListCharacterDraft: {player1: [], player2: []},
    banWidthSize: 0,
    sequence: [],
    sequenceIndex: 0,
    currentSequence: {
        audio: '',
        player: '',
        index: ''
    },
    currentAudioPlay: "",
    currentCharacterFlash:"",
    currentBossFlash: "",
    player1_reroll: null,
    player2_reroll: null,
    draftSituation: '',
    isReroll: false,
    characterDraft: [],
    isDoneChooseCharacter: false,
    mode: "3v3",
    winnerButton: false,
    isGMDoneDeclareWinner: false,
    gameType: ''
}

export const useDraftStore = create<DraftStateProps & DraftFunctions>((set, get) => ({ 
    ...initialState,
    
    setInit: (init: string) => {
        set({init: init})
    },
    setCharactersList: (characterList: CharacterInfoProps[]) => {
        set({characters: characterList})
    },
    setApplyCharacterModal: (modal: boolean) => {
        set({applyCharacterModal: modal})
    },
    setApplyBossModal: (modal: boolean) => {
        set({applyBossModal: modal})
    },
    setIsStartDraft: (start: boolean) => {
        set({isStartDraft: start})
    },
    setSearchCharacter: (char: string) => {
        set({searchCharacter: char})
    },
    searchCharacterList: (name: string, vision: string) => {
        let fillteredCharacters = [];
        fillteredCharacters = get().characters.filter(data => {
            if(name === '' && vision === "all"){
                return true;
            }
            else if(name !== '' && vision === 'all'){
                return data.name.toLowerCase().includes(name.toLowerCase());
            }
            else if(name === '' && vision !== 'all'){
                return data.vision.toLowerCase().includes(vision.toLowerCase());
            }
            else{
                return data.name.toLowerCase().includes(name.toLowerCase()) && data.vision.toLowerCase().includes(vision.toLowerCase()) 
            }
        })

        set({ characters: fillteredCharacters });
    },
    setCharacterFilterVision: (vision: string) => {
        set({characterFilterElement: vision})
    },
    setCurrentCharacterChoice: (characterInfo:  CharacterInfoProps) => {
        set({currentCharacterChoose: characterInfo})
    } ,
    setPlayer1Info: (player: PlayerDraftInfo ) => {
        set({ player1: player });
    },
    setPlayer2Info: (player: PlayerDraftInfo ) => {
        set({ player2: player });
    },
    setBossInfo: (bossInfo: BossInfoProps) => {
        set({ boss: bossInfo })
    },
    setPickList: (pickList: DraftInfoProps[], mode: string ) => {
        set({ pickListCharacterDraft: arrangeDraftCharacterlistModal(pickList)})
        set({ pick: draftLayoutPick(mode ,pickList) });
    },
    setBanList: (banList: DraftInfoProps[], mode: string ) => {
        set({ banListCharacterDraft: arrangeDraftCharacterlistModal(banList)})
        set({ banWidthSize: getBanWidth(mode) })
        set({ ban: draftLayoutBan(mode, banList) });
    },
    setSequenceList: (sequence: DraftSequence[] ) => {
        set({ sequence: sequence })
    },
    setCurrentSequence: (currentSequence: DraftSequence) => {
        set({ currentSequence: currentSequence })
    },
    setCurrentAudioPlay: (audio: string) => {
        set({currentAudioPlay: audio})
    },
    setCurrentCharacterFlash: (img: string) => {
        set({currentCharacterFlash: img})
    },
    setCurrentBossFlash: (img: string) => {
        set({currentBossFlash: img})
    },
    setPlayer1Reroll: (roll: boolean | null) => {
        set({player1_reroll: roll})
    },
    setPlayer2Reroll: (roll: boolean | null) => {
        set({player2_reroll: roll})
    },
    setDraftSituation: (situation: string) => {
        set({ draftSituation: situation })
    },
    setIsReroll: (reroll: boolean) => {
        set({ isReroll: reroll })
    },
    setSequenceIndex: (index: number) => {
        set({sequenceIndex: index})
    },
    setCharacterDraftList: (characterDraftList: CharacterDraftPayloadProps[]) => {
        set({characterDraft: characterDraftList})
    },
    setCharacterDraftListUpdate: (characterDraftList: CharacterDraftPayloadProps[], characters: CharacterInfoProps[]) => {
        set({characters: updateCharacters(characters, characterDraftList)})
    },
    setCharacterListAfterUpdate: (characterID: string, characters: CharacterInfoProps[]) => {
        set({characters: updateCharactersAfterDraft(characterID, characters)})
    },
    setIsDoneChooseCharacter: (isDone: boolean) => {
        set({isDoneChooseCharacter: isDone})
    },
    setMode: (mode: string) => {
        set({mode: mode})
    },
    updateBanDraftCharacters: (characterID: string, index: string, characterInfo: CharacterInfoProps, ban: DraftBanFormat, banArrangeList: DraftCharacterList) => {
        set({ banListCharacterDraft: updateCharactersDraftList(characterID, index, characterInfo, banArrangeList)})
        set({ ban: updateBanListDraftCharacters(characterID, index, characterInfo, ban) });
    },
    updatePickDraftCharacters: (characterID: string, index: string, characterInfo: CharacterInfoProps,  pick: DraftInfoProps[][], pickArrangeList: DraftCharacterList) => {
        set({ pickListCharacterDraft: updateCharactersDraftList(characterID, index, characterInfo, pickArrangeList)})
        set({ pick: updatePickListDraftCharacters(characterID, index, characterInfo, pick) });
    },
    setWinnerButton: (winnerButton: boolean) => {
        set({winnerButton: winnerButton})
    },
    setIsGMDoneDeclareWinner: (isDeclareWinner: boolean) => {
        set({isGMDoneDeclareWinner: isDeclareWinner})
    },
    setGameType: (gameType: string) => {
        set({gameType: gameType})
    }
}))

mountStoreDevtool('DraftStore', useDraftStore);
