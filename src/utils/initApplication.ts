import { ICardData, IField, IInitialResponse} from "../interface";
import { getCard, getInitState } from "../backend";
import { setConnect } from "../backend";
import fieldState from '../store/FieldState';
import playerState from "../store/PlayerState";
import sessionState from "../store/SessionState";
import chatState from "../store/ChatState";

export async function setInitState(field: IField, sessionId: string, cardData: ICardData) {
    setConnect(sessionId);
    const initialState: IInitialResponse = await getInitState(sessionId);
    console.log(cardData.cards)
    await fieldState.initPerformance(field, cardData.cards);
    playerState.setPlayers(initialState.players);
    fieldState.cardStates = initialState.cardStates;
    sessionState.state = initialState.state;
    sessionState.currentPlayer = initialState.currentPlayer;
    sessionState.moveStatus = initialState.moveStatus;
    chatState.chatHistory =  initialState.chatHistory;
    playerState.players.forEach(player => {
        const coords = field.border[player.position].movementCoordinates;
        playerState.setCoordsPlayer(player.name, coords, player.position)
    })
} 