import { makeAutoObservable } from "mobx";
import { IPlayer, IPlayerData } from '../interface/index';
import { Player } from "../model/Player";

class PalyerState {
    playerName: string | null = null;
    players: IPlayer[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setNewName(playerName: string, sessionId: string) {
        localStorage.setItem(sessionId, playerName)
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

    setCoords(playerName: string, coords: [number, number], position: number) {
        //todo go to sreet
        this.players = this.players.map(player => {
            if(player.name === playerName) {
                player.coords = coords;
            }
            return player;
        })
        
    }

    get isAdd() {
        return this.players.length < 4;
    }
}

export default new PalyerState();