import { Pawns } from './pawns';
import { Player } from './player';

export class Room {
  deck: Pawns[];
  graveyard: Pawns[];
  players: {};
  turn: string;
  winner: string;
}
