import { IField, IInitialResponse} from "../interface";
import { getInitState } from "../backend";
import { setConnect } from "../backend";
import fieldState from '../store/FieldState';
import playerState from "../store/PlayerState";

export async function setInitState(field: IField, sessionId: string) {
    setConnect(sessionId);
    const initialState: IInitialResponse = await getInitState(sessionId);
    playerState.playerName = localStorage.getItem(sessionId);
    fieldState.initPerformance(field, initialState.cards);
    playerState.setPlayers(initialState.players);
} 