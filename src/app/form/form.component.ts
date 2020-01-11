import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameI, TeamI, TeamInfoI, TeamNameI } from '../../model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input()
  game: GameI;

  @Input()
  team1: TeamInfoI;

  @Input()
  team2: TeamInfoI;

  @Output()
  startGame = new EventEmitter();

  onClickStart() {
    this.startGame.emit();
  }

  onTeamChange(name: TeamNameI, team: TeamI) {
    this.game.field[name] = team;
  }

  get areTeamsReady(): boolean {
    let ready = true;

    [...this.team1.players, ...this.team2.players].forEach(({ skill }) => {
      if (!skill) ready = false;
    });

    if (!this.team1.name || !this.team2.name) {
      ready = false;
    }

    return ready;
  }
}
