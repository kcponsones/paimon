import { CharacterDraftPayloadProps, CharacterInfoProps, DraftBanFormat, DraftBanLayout, DraftCharacterList, DraftInfoProps, DraftSequence, SequenceDraft } from "../helpers/types";


export const pickIndexListPlayer1 = [
    "player-1-pick-1",
    "player-1-pick-2",
    "player-1-pick-3",
    "player-1-pick-4",
  ];

export const pickIndexListPlayer2 = [
    "player-2-pick-1",
    "player-2-pick-2",
    "player-2-pick-3",
    "player-2-pick-4",
  ];

export const banIndexListPlayer1 = [
    "player-1-ban-1",
    "player-1-ban-2",
    "player-1-ban-3",
    "player-1-ban-4",
  ];

export const banIndexListPlayer2 = [
    "player-2-ban-1",
    "player-2-ban-2",
    "player-2-ban-3",
    "player-2-ban-4",
  ];

function getLengthByMode (mode: string): number {
    let length = 0;
    switch(mode){
        case "1v1": {
            length = 1;
            break;
        }
        case "2v2": {
            length = 2;
            break;
        }
        case "3v3": {
            length = 3;
            break;
        }
        case "4v4": {
            length = 4;
            break;
        }
    }
    return length
}

export function generateDraftSlot (mode: string, draftID: string, player1: string, player2: string) : CharacterDraftPayloadProps[]  {
    let length = getLengthByMode(mode),
        payloadDraft = [],
        initPayloadPlayer1Pick: CharacterDraftPayloadProps  = { draftID: '', index: '', playerID: '', status: '' },
        initPayloadPlayer1Ban: CharacterDraftPayloadProps = { draftID: '', index: '', playerID: '', status: '' },
        initPayloadPlayer2Pick: CharacterDraftPayloadProps = { draftID: '', index: '', playerID: '', status: '' },
        initPayloadPlayer2Ban: CharacterDraftPayloadProps = { draftID: '', index: '', playerID: '', status: '' };
    
    for(let i = 0; i < length; i++){
        initPayloadPlayer1Pick = {draftID: draftID, playerID: player1, status: 'pick', index: `player-1-pick-${i + 1}`}
        initPayloadPlayer1Ban = {draftID: draftID, playerID: player1, status: 'ban', index: `player-1-ban-${i + 1}`}

        payloadDraft.push(initPayloadPlayer1Pick)
        payloadDraft.push(initPayloadPlayer1Ban)
    }

    for(let k = 0; k < length; k++){
        initPayloadPlayer2Pick = {draftID: draftID, playerID: player2, status: 'pick', index: `player-2-pick-${k + 1}`}
        initPayloadPlayer2Ban = {draftID: draftID, playerID: player2, status: 'ban', index: `player-2-ban-${k + 1}`}

        payloadDraft.push(initPayloadPlayer2Pick)
        payloadDraft.push(initPayloadPlayer2Ban)
    }

    return payloadDraft;
}


export function draftLayoutBan (mode: string, ban: DraftInfoProps[]): DraftBanFormat  {
    let layout: DraftBanLayout[] = [],
        banList: DraftBanFormat = { player1: [], player2: [] },
        player1: DraftInfoProps[] = [],
        player2: DraftInfoProps[] = [];

    switch(mode){
        case "1v1": {
            layout = [
                {
                  wrapperWidthSize: "100%",
                  imageWidthSize: "100%",
                  indexCharacter: '45'
                },
            ];
            break;
        }
        case "2v2": {
            length = 2;
            layout = [
                {
                  wrapperWidthSize: "100%",
                  imageWidthSize: "50%",
                  indexCharacter: '45'
                },
                {
                  wrapperWidthSize: "50%",
                  imageWidthSize: "100%",
                  indexCharacter: '55'
                },
            ]
            break;
        }
        case "3v3": {
            length = 3;
            layout = [
                {
                  wrapperWidthSize: "100%",
                  imageWidthSize: "33%",
                  indexCharacter: '35'
                },
                {
                  wrapperWidthSize: "66%",
                  imageWidthSize: "50%",
                  indexCharacter: '45'
                },
                {
                  wrapperWidthSize: "33%",
                  imageWidthSize: "100%",
                  indexCharacter: '55'
                },
            ]
            break;
        }
        case "4v4": {
            length = 4;
            layout = [
                {
                    wrapperWidthSize: "100%",
                    imageWidthSize: "25%",
                    indexCharacter: '25'
                    },
                {
                    wrapperWidthSize: "75%",
                    imageWidthSize: "33%",
                    indexCharacter: '35'
                },
                {
                    wrapperWidthSize: "50%",
                    imageWidthSize: "50%",
                    indexCharacter: '45'
                },
                {
                    wrapperWidthSize: "25%",
                    imageWidthSize: "100%",
                    indexCharacter: '55'
                }
            ]
            break;
        }
    }
    ban.map((data: DraftInfoProps, index: number) => {
        if((data.index as string).includes('player-1-ban')){
            player1.push({...data, ...layout[index % layout.length] })
        }
        if((data.index as string).includes('player-2-ban')){
            player2.push({...data, ...layout[index % layout.length] })
        }
    })
    banList.player1 = player1
    banList.player2 = player2

    return banList;
}

export function getBanWidth(mode: string): number {
    let length = getLengthByMode(mode)
    return 106.25 * length;
}

export function draftLayoutPick(mode: string, pick: DraftInfoProps[]) : DraftInfoProps[][]  {
    let newPickDraftFormat = [],
    playerLineFormat1: DraftInfoProps[] = [],
    playerLineFormat2: DraftInfoProps[] = [],
    playerLineFormat3: DraftInfoProps[] = [],
    playerLineFormat4: DraftInfoProps[] = [];

    pick.map((data: DraftInfoProps)  => {
        if(data.index === "player-1-pick-1" || data.index === "player-2-pick-1"){
            playerLineFormat1.push(data)
        }

        if(data.index === "player-1-pick-2" || data.index === "player-2-pick-2"){
            playerLineFormat2.push(data)
        }

        if(data.index === "player-1-pick-3" || data.index === "player-2-pick-3"){
            playerLineFormat3.push(data)
        }

        if(data.index === "player-1-pick-4" || data.index === "player-2-pick-4"){
            playerLineFormat4.push(data)
        }
    })

    switch(mode){
        case "1v1": {
            newPickDraftFormat.push(playerLineFormat1)
            break;
        }
        case "2v2": {
            newPickDraftFormat.push(playerLineFormat1)
            newPickDraftFormat.push(playerLineFormat2)
            break;
        }
        case "3v3": {
            newPickDraftFormat.push(playerLineFormat1)
            newPickDraftFormat.push(playerLineFormat2)
            newPickDraftFormat.push(playerLineFormat3)
            break;
        }
        case "4v4": {
            newPickDraftFormat.push(playerLineFormat1)
            newPickDraftFormat.push(playerLineFormat2)
            newPickDraftFormat.push(playerLineFormat3)
            newPickDraftFormat.push(playerLineFormat4)
            break;
        }
    }
    return newPickDraftFormat;
}

export function arrangeDraftCharacterlistModal(list: DraftInfoProps[]):  DraftCharacterList {
    let player1: DraftInfoProps[] = [],
        player2: DraftInfoProps[] = [];


    list.map((data: DraftInfoProps)  => {
        if(data.index === "player-1-pick-1" || data.index === "player-1-pick-2" || data.index === "player-1-pick-3" || data.index === "player-1-pick-4"){
            player1.push(data)
        }

        if(data.index === "player-2-pick-1" || data.index === "player-2-pick-2" || data.index === "player-2-pick-3" || data.index === "player-2-pick-4"){
            player2.push(data)
        }

        if(data.index === "player-1-ban-1" || data.index === "player-1-ban-2" || data.index === "player-1-ban-3" || data.index === "player-1-ban-4"){
            player1.push(data)
        }

        if(data.index === "player-2-ban-1" || data.index === "player-2-ban-2" || data.index === "player-2-ban-3" || data.index === "player-2-ban-4"){
            player2.push(data)
        }
    })

    let sortedPlayer2 = player2.sort((a, b) => {
        if (a.index < b.index) {
          return 1;
        }
        if (a.index > b.index) {
          return -1;
        }
        return 0;
      });
    
    return {
        player1: player1,
        player2: sortedPlayer2,
    }
}



export function createSequence (mode: string): string {
    let sequenceList:SequenceDraft[] = [];
    switch(mode){
        case "1v1": {
            sequenceList = [
                {
                    audio: 'teamOneBan',
                    player: 'player1',
                    index: 'player-1-ban-1'
                },
                {
                    audio: 'teamTwoBan',
                    player: 'player2',
                    index: 'player-2-ban-1'
                },
                {
                    audio: 'teamOnePick',
                    player: 'player1',
                    index: 'player-1-pick-1'
                },
                {
                    audio: 'teamTwoPick',
                    player: 'player2',
                    index: 'player-2-pick-1'
                },
            ]
            break;
        }
        case "2v2": {
            sequenceList = [
                {
                    audio: 'teamOneBan',
                    player: 'player1',
                    index: 'player-1-ban-1'
                },
                {
                    audio: 'teamTwoBan',
                    player: 'player2',
                    index: 'player-2-ban-1'
                },
                {
                    audio: 'teamOnePick',
                    player: 'player1',
                    index: 'player-1-pick-1'
                },
                {
                    audio: 'teamTwoPick',
                    player: 'player2',
                    index: 'player-2-pick-1'
                },
                {
                    audio: 'teamTwoBan',
                    player: 'player2',
                    index: 'player-2-ban-2'
                },
                {
                    audio: 'teamOneBan',
                    player: 'player1',
                    index: 'player-1-ban-2'
                },
                {
                    audio: 'teamTwoPick',
                    player: 'player2',
                    index: 'player-2-pick-2'
                },
                {
                    audio: 'teamOnePick',
                    player: 'player1',
                    index: 'player-1-pick-2'
                },
            ]
            break;
        }
        case "3v3": {
            sequenceList = [
                {
                    audio: 'teamOneBan',
                    player: 'player1',
                    index: 'player-1-ban-1'
                },
                {
                    audio: 'teamTwoBan',
                    player: 'player2',
                    index: 'player-2-ban-1'
                },
                {
                    audio: 'teamOneBan',
                    player: 'player1',
                    index: 'player-1-ban-2'
                },
                {
                    audio: 'teamTwoBan',
                    player: 'player2',
                    index: 'player-2-ban-2'
                },
                {
                    audio: 'teamOnePick',
                    player: 'player1',
                    index: 'player-1-pick-1'
                },
                {
                    audio: 'teamTwoPick',
                    player: 'player2',
                    index: 'player-2-pick-1'
                },
                {
                    audio: 'teamOnePick',
                    player: 'player1',
                    index: 'player-1-pick-2'
                },
                {
                    audio: 'teamTwoPick',
                    player: 'player2',
                    index: 'player-2-pick-2'
                },
                {
                    audio: 'teamTwoBan',
                    player: 'player2',
                    index: 'player-2-ban-3'
                },
                {
                    audio: 'teamOneBan',
                    player: 'player1',
                    index: 'player-1-ban-3'
                },
                {
                    audio: 'teamTwoPick',
                    player: 'player2',
                    index: 'player-2-pick-3'
                },
                {
                    audio: 'teamOnePick',
                    player: 'player1',
                    index: 'player-1-pick-3'
                }
            ]
            break;
        }
        case "4v4": {
            sequenceList = [
                {
                    audio: 'teamOneBan',
                    player: 'player1',
                    index: 'player-1-ban-1'
                },
                {
                    audio: 'teamTwoBan',
                    player: 'player2',
                    index: 'player-2-ban-1'
                },
                {
                    audio: 'teamOneBan',
                    player: 'player1',
                    index: 'player-1-ban-2'
                },
                {
                    audio: 'teamTwoBan',
                    player: 'player2',
                    index: 'player-2-ban-2'
                },
                {
                    audio: 'teamOnePick',
                    player: 'player1',
                    index: 'player-1-pick-1'
                },
                {
                    audio: 'teamTwoPick',
                    player: 'player2',
                    index: 'player-2-pick-1'
                },
                {
                    audio: 'teamOnePick',
                    player: 'player1',
                    index: 'player-1-pick-2'
                },
                {
                    audio: 'teamTwoPick',
                    player: 'player2',
                    index: 'player-2-pick-2'
                },
                {
                    audio: 'teamTwoBan',
                    player: 'player2',
                    index: 'player-2-ban-3'
                },
                {
                    audio: 'teamOneBan',
                    player: 'player1',
                    index: 'player-1-ban-3'
                },
                {
                    audio: 'teamTwoBan',
                    player: 'player2',
                    index: 'player-2-ban-4'
                },
                {
                    audio: 'teamOneBan',
                    player: 'player1',
                    index: 'player-1-ban-4'
                },
                {
                    audio: 'teamTwoPick',
                    player: 'player2',
                    index: 'player-2-pick-3'
                },
                {
                    audio: 'teamOnePick',
                    player: 'player1',
                    index: 'player-1-pick-3'
                },
                {
                    audio: 'teamTwoPick',
                    player: 'player2',
                    index: 'player-2-pick-4'
                },
               
                {
                    audio: 'teamOnePick',
                    player: 'player1',
                    index: 'player-1-pick-4'
                },
               
            ]
            break;
        }
    }
    return JSON.stringify(sequenceList);
}


export function getSequenceByIndex(index: string, sequenceList:DraftSequence[]) :DraftSequence {
    let sequenceCurrent: DraftSequence = {audio: "", index: "", player: ""}
    sequenceList.map((sequence) => {
        if(index === sequence.index){
            sequenceCurrent.audio = sequence.audio
            sequenceCurrent.index = sequence.index
            sequenceCurrent.player = sequence.player
        }   
    })


    return sequenceCurrent;
}

export function inArray (needle: string, haystack: any):boolean{
    let length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
};

export function updateCharacters (characters:CharacterInfoProps[] , characterDrafts: CharacterDraftPayloadProps[]) : CharacterInfoProps[]  {
    for (const characterDraft of characterDrafts) {
        const character = characters.find((character) => character.id === characterDraft.characterID);
        if (character) {
          character.isPicked = true;
        }
    }

    return characters;
}

export function updateCharactersAfterDraft (characterID: string, characters:CharacterInfoProps[] ) : CharacterInfoProps[] {
    const character = characters.find((character) => character.id === characterID);
    if (character) {
      character.isPicked = true;
    }

    return characters;
}

export function findCharacterByCharacterID (characterID: string, characters:CharacterInfoProps[]) : CharacterInfoProps | undefined {
    const character = characters.find((character) => character.id === characterID);
    return character;
}


export function updatePickListDraftCharacters(characterID: string, index: string, characterInfo: CharacterInfoProps, pick: DraftInfoProps[][]) :DraftInfoProps[][] {
    const [playerIndex, playWorld, pickIndex] = index.split('-').slice(-3);
    let draftInfo = pick[parseInt(playerIndex) - 1].find((draft) => draft.index === index);
    if(draftInfo){
        draftInfo.characterID = characterID
        draftInfo.character = characterInfo
    }
    return pick;
}

export function updateBanListDraftCharacters(characterID: string, index: string, characterInfo: CharacterInfoProps, ban: DraftBanFormat) : DraftBanFormat  {
    for (let playerBans of Object.values(ban)) {
        let banObject = playerBans.find(ban => ban.index === index);
        if (banObject) {
          banObject.characterID = characterID;
          banObject.character = characterInfo;
          return ban;
        }
    }
    return ban;
}

export function updateCharactersDraftList(characterID: string, index: string, characterInfo: CharacterInfoProps, list: DraftCharacterList ) :  DraftCharacterList {
    for (let draftList of Object.values(list)) {
        let draftObject = draftList.find(list => list.index === index);
        if (draftObject) {
            draftObject.characterID = characterID;
            draftObject.character = characterInfo;
            return list;
        }
    }
    return list;
}