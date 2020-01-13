import { PlayerInfoI, TeamNameI } from '../../model';

export interface TeamInfoI {
  name: TeamNameI;
  players: PlayerInfoI[];
  nameError: boolean;
}
