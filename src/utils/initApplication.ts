import { IField, IInitialResponse} from "../interface";
import { getInitState } from "../backend";
import { setConnect } from "../backend";
import fieldState from '../store/FieldState';
import playerState from "../store/PlayerState";
import sessionState from "../store/SessionState";

export async function setInitState(field: IField, sessionId: string) {
    setConnect(sessionId);
    const initialState: IInitialResponse = await getInitState(sessionId);
    playerState.playerName = await localStorage.getItem(sessionId);
    await fieldState.initPerformance(field, initialState.cards);
    playerState.setPlayers(initialState.players);
    fieldState.cardStates = initialState.cardStates;
    sessionState.state = initialState.state;
    sessionState.currentPlayer = initialState.currentPlayer;
    console.log(initialState)
    playerState.players.forEach(player => {
        const coords = field.border[player.position].movementCoordinates;
        playerState.setCoords(player.name, coords, player.position)
    })
} 