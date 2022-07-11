import { IField, IInitialResponse} from "../interface";
import { getInitState } from "../backend";
import { setConnect } from "../backend";
import fieldState from '../store/FieldState';
import playerState from "../store/PlayerState";

export async function setInitState(field: IField, sessionId: string | null) {
    setConnect();
    const initialState: IInitialResponse = await getInitState(sessionId);
    fieldState.initPerformance(field, initialState.cards);
    playerState.setPlayers(initialState.players);
} 