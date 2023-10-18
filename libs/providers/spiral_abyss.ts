import { CharacterDraftPayloadProps, SequenceDraft } from "../helpers/types";


export const pickIndexListSpiralAbyssPlayer1 = [
    "player-1-pick-1",
    "player-1-pick-2",
    "player-1-pick-3",
    "player-1-pick-4",
    "player-1-pick-5",
    "player-1-pick-6",
    "player-1-pick-7",
    "player-1-pick-8",
  ];

export const pickIndexListSpiralAbyssPlayer2 = [
    "player-2-pick-1",
    "player-2-pick-2",
    "player-2-pick-3",
    "player-2-pick-4",
    "player-2-pick-5",
    "player-2-pick-6",
    "player-2-pick-7",
    "player-2-pick-8",
];

export const banIndexListSpiralAbyssPlayer1 = [
    "player-1-ban-1",
    "player-1-ban-2",
    "player-1-ban-3",
    "player-1-ban-4",
  ];

export const banIndexListSpiralAbyssPlayer2 = [
    "player-2-ban-1",
    "player-2-ban-2",
    "player-2-ban-3",
    "player-2-ban-4",
  ];


export function createSpiralAbyssSequence (): string {
    let sequenceList: SequenceDraft[] = [];
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
            audio: 'teamTwoPick',
            player: 'player2',
            index: 'player-2-pick-2'
        },
        {
            audio: 'teamOnePick',
            player: 'player1',
            index: 'player-1-pick-2'
        },
        {
            audio: 'teamOnePick',
            player: 'player1',
            index: 'player-1-pick-3'
        },
        {
            audio: 'teamTwoPick',
            player: 'player2',
            index: 'player-2-pick-3'
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
            index: 'player-2-pick-5'
        },
        {
            audio: 'teamOnePick',
            player: 'player1',
            index: 'player-1-pick-5'
        },
        {
            audio: 'teamOnePick',
            player: 'player1',
            index: 'player-1-pick-6'
        },
        {
            audio: 'teamTwoPick',
            player: 'player2',
            index: 'player-2-pick-6'
        },
        {
            audio: 'teamTwoPick',
            player: 'player2',
            index: 'player-2-pick-7'
        },
        {
            audio: 'teamOnePick',
            player: 'player1',
            index: 'player-1-pick-7'
        },
        {
            audio: 'teamOnePick',
            player: 'player1',
            index: 'player-1-pick-8'
        },
        {
            audio: 'teamTwoPick',
            player: 'player2',
            index: 'player-2-pick-8'
        },
    ]

    return JSON.stringify(sequenceList);
}


export function generateSpiralAbyssDraft (draftID: string, player1: string, player2: string): CharacterDraftPayloadProps[] {
    let payloadDraft = [],
        initPayloadPlayer1Pick: CharacterDraftPayloadProps  = { draftID: '', index: '', playerID: '', status: '' },
        initPayloadPlayer1Ban: CharacterDraftPayloadProps = { draftID: '', index: '', playerID: '', status: '' },
        initPayloadPlayer2Pick: CharacterDraftPayloadProps = { draftID: '', index: '', playerID: '', status: '' },
        initPayloadPlayer2Ban: CharacterDraftPayloadProps = { draftID: '', index: '', playerID: '', status: '' };

    for (let b = 0; b < 4; b++){
        initPayloadPlayer1Ban = {draftID: draftID, playerID: player1, status: 'ban', index: `player-1-ban-${b + 1}`}
        initPayloadPlayer2Ban = {draftID: draftID, playerID: player2, status: 'ban', index: `player-2-ban-${b + 1}`}

        payloadDraft.push(initPayloadPlayer1Ban)
        payloadDraft.push(initPayloadPlayer2Ban)
    }

    for (let p = 0; p < 8; p++){
        initPayloadPlayer1Pick = {draftID: draftID, playerID: player1, status: 'pick', index: `player-1-pick-${p + 1}`}
        initPayloadPlayer2Pick = {draftID: draftID, playerID: player2, status: 'pick', index: `player-2-pick-${p + 1}`}

        payloadDraft.push(initPayloadPlayer1Pick)
        payloadDraft.push(initPayloadPlayer2Pick)
    }

    return payloadDraft
}