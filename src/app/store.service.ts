import { Injectable } from '@angular/core';
import { Game, GameI, TeamI, TeamInfoI, TeamNameI } from '../model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public game: GameI;
  public isGameStarted = false;
  public teams: { [s: string]: TeamI } = {};

  initGame() {
    this.game = new Game();
  }

  initRound() {
    const team1Name = 'DeepMind';
    const team2Name = 'AlphaGo';
    const test = 'test';
    this.game.initRound(test);
    this.isGameStarted = true;
  }

  setTeam(team) {}

  setRandomTeam(name: TeamNameI) {
    this.teams[name].randomTeam();
  }

  mapTeamToTeamInfo(team: TeamI): TeamInfoI {
    return team
      ? {
          name: team.name,
          players: team.players,
        }
      : null;
  }
}
