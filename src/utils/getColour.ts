import { IPlayer } from "../interface";
import { COLOUR } from "../const/clour";

export function getColour(players: IPlayer[]): string {
    // if(!players) {
    //     return COLOUR.RED;
    // }
    // const keys = Object.keys(COLOUR);
    // const colour = keys.find(colour => {
    //     return !players.some(player => player.colour === colour)
    // })

    return COLOUR.RED;
}