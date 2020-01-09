import { Component, OnInit } from '@angular/core';
import { Game } from '../model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isGameStarted = false;

  ngOnInit(): void {
    const game = new Game();

    const team1 = 'team1';
    const team2 = 'team2';

    game.initGame(team1, team2);

    game.field[team1].randomTeam();
    game.field[team2].randomTeam();

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
}
