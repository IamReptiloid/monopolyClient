import { IPlayer } from "../interface";
import { COLOUR } from "../const/clour";

export function getColour(players: IPlayer[]): string {
    const keys = Object.keys(COLOUR);
    const colour = keys.find(colour => {
        return !players.some(player => player.colour === colour)
    })

    if(colour) {
        return COLOUR[colour];
    }

    return COLOUR.RED;
}