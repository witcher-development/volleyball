import { Injectable } from '@angular/core';
import { Game, GameI, TeamI, TeamInfoI } from '../model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public game: GameI;
  public isGameStarted = false;
  public team1: TeamI;
  public team2: TeamI;

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


  mapTeamToTeamInfo(team: TeamI): TeamInfoI {
    return team
      ? {
          name: team.name,
          players: team.players,
        }
      : null;
  }
}
