import { makeAutoObservable } from "mobx";
import { StatusPlayer } from "../enum";
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
                player.position = position;
            }
            return player;
        })   
    }

    setNewBalance(playerName: string, balance: number) {
        this.players = this.players.map(el => {
            if(el.name === playerName) {
                el.setBalance(balance);
            }
            return el;
        })
    }

    getPlayer(playerName: string) {
        return this.players.find(el => el.name === playerName);
    }

    setNewStatus(playerName: string, status: string) {
        this.players = this.players.map(el => {
            if(el.name === playerName) {
                el.status = status;
            }
            return el;
        })
        this.setWinplayer();
    }

    private setWinplayer() {
        let countWin = 0;
        this.players.forEach(el => {
            if(el.status === StatusPlayer.Playing) {
                countWin += 1;
            }
        })
        if(countWin === 1) {
            this.players = this.players.map(el => {
                if(el.status === StatusPlayer.Playing) {
                    el.status = StatusPlayer.Won;
                }
                return el;
            })
        }
    }

    get player() {
        return this.players.find(el => el.name === this.playerName);
    }

    get isAdd() {
        return this.players.length < 4;
    }
}

export default new PalyerState();