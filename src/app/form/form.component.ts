import { Component } from '@angular/core';
import { TeamInfoI } from './types';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  public teams: TeamInfoI[] = [];
  constructor(public store: StoreService) {
    this.teams[0] = this.getEmptyTeam();
    this.teams[1] = this.getEmptyTeam();
  }

  getEmptyTeam(): TeamInfoI {
    return {
      name: '',
      players: [],
      nameError: false,
    };
  }

  onClickStart() {
    this.store.initRound();
  }

  onTeamChange(index: number, team: TeamInfoI) {
    const isSameName = this.teams
      .filter((_, i) => i !== index)
      .find((anotherTeam) => anotherTeam.name === name);
    if (isSameName) {
      this.teams[index].nameError = true;
    }
    this.teams[index] = team;
  }

  get areTeamsReady(): boolean {
    let ready = true;
    const teamsArray = Object.values(this.teams);

    teamsArray.forEach(({ players }) => {
      players.forEach(({ skill }) => {
        if (!skill) ready = false;
      });
    });

    if (
      teamsArray[0].name === teamsArray[1].name ||
      !teamsArray[0].name ||
      !teamsArray[1].name
    ) {
      ready = false;
    }

    return ready;
  }
}
