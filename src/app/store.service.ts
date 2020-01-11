import { Injectable } from '@angular/core';
import { Game, GameI, TeamI, TeamInfoI } from '../model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private game: GameI;

  initGame() {
    this.game = new Game();
  }

  initRound() {
    const test = 'test';
    this.game.initRound(test);
  }

  setTeam(team) {}

  mapTeamToTeamInfo(team: TeamI): TeamIsnfoI {
    return team
      ? {
          name: team.name,
          players: team.players,
        }
      : null;
  }
}
