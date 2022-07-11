import { makeAutoObservable } from "mobx";
import { IPlayer, IPlayerData } from '../interface/index';
import { Player } from "../model/Player";

class PalyerState {
    playerName: string | null = null;
    players: IPlayer[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setName(playerName: string) {
        this.playerName = playerName;
    }

    setPlayers(playersData: IPlayerData[]) {
        this.players = playersData.map(playerData => {
            return new Player(playerData);
        })
    }

    addPlayer(player: IPlayerData) {
        this.players.push(new Player(player))
    }
}

export default new PalyerState();