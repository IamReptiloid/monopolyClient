import { makeAutoObservable } from "mobx";
import axios from "axios";
import { IPlayer, IPlayerData } from '../interface/index';
import { URL } from '../const/url'
import { Player } from "../model/Player";

class PalyerState {
    player: null | IPlayer = null;
    players: null | IPlayer[] = null;

    constructor() {
        makeAutoObservable(this)
    }

    async setPlayer(playerName: string, sessionId: string) {
        const dataPlayer = await axios.post<IPlayerData>(URL + "/sessions/add-player", {
            sessionId,
            playerName,
        })
        this.player = new Player(dataPlayer.data)
    }

    setPlayers(players: IPlayer[]) {}
}

export default new PalyerState();