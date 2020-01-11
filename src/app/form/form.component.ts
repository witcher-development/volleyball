import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameI, TeamI, TeamInfoI, TeamNameI } from '../../model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  constructor(public store: StoreService) {}

  onClickStart() {
    this.store.initRound();
  }

  onTeamChange(name: TeamNameI, team: TeamI) {
    this.store.game.field[name] = team;
  }

  get areTeamsReady(): boolean {
    let ready = true;

    [...this.store.team1.players, ...this.store.team2.players].forEach(({ skill }) => {
      if (!skill) ready = false;
    });

    if (!this.store.team1.name || !this.store.team2.name) {
      ready = false;
    }

    return ready;
  }
}
