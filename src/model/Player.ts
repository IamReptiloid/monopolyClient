import { IPlayer, IPlayerData } from "../interface";

export class Player implements IPlayer {
    readonly id: number; 
    readonly name: string;
    readonly colour: string;
    public balance: number;
    public position: number = 0;
    public role: string;
    
    constructor(data: IPlayerData) {
        this.id = data.id;
        this.balance = data.balance;
        this.colour = data.colour;
        this.name = data.name;
        this.position = data.position;
        this.role = data.role
    }

    setPosition (position: number, playerName: string) {};
}