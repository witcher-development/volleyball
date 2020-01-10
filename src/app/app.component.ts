import { Component, OnInit } from '@angular/core';
import { Game, TeamI, TeamInfoI } from '../model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isGameStarted = false;
  team1: TeamI;
  team2: TeamI;

  ngOnInit(): void {
    const game = new Game();

    const team1Name = 'team1';
    const team2Name = 'team2';

    game.initGame(team1Name, team2Name);

    this.team1 = game.field[team1Name];
    this.team2 = game.field[team2Name];

    // this.team1.randomTeam();
    // this.team2.randomTeam();

    // game.field[team1].setPlayer(1, 1);
    // game.field[team1].setPlayer(2, 2);
    //
    // game.field[team2].setPlayer(1, 1);
    // game.field[team2].setPlayer(2, 2);
    //
    // game.initRound(team1);
    //
    // game.field[team1].players[0].makeHit(team2, 2, 1, 'arc');
    // game.field[team2].players[1].makeHit(team1, 2, 1, 'arc');
    // game.field[team1].players[0].makeHit(team2, 1, 1, 'arc');
    // game.field[team2].players[0].makeHit(team1, 1, 1, 'arc');
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
