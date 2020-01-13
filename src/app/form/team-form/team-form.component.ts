import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  TeamNameI,
  PlayerInfoI,
  FieldPartI,
  PlayerSkillI,
} from '../../../model';
import { FormModalComponent } from '../form-modal/form-modal.component';
import {
  checkIfCanSetLevel,
  sortPlayersArrayAccordingToCells,
} from '../../../helpers';
import { TeamInfoI } from '../types';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent {
  @Input()
  team: TeamInfoI;

  @Input()
  fieldPart: FieldPartI;

  @Input()
  teamNameError: boolean;

  @Output() teamChange = new EventEmitter<TeamInfoI>();

  constructor(public dialog: MatDialog) {}

  onNameChange(name: TeamNameI) {
    this.teamChange.emit({
      ...this.team,
      name,
    });
  }

  setPlayer(player: PlayerInfoI) {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '250px',
      data: { skill: player.skill },
    });

    dialogRef.afterClosed().subscribe((skill: PlayerSkillI) => {
      if (skill === player.skill) return;
      if (!checkIfCanSetLevel(this.players, skill)) {
        alert('There are already two players with this level');
        return;
      }

      const index = this.team.players.findIndex(
        ({ position }) => position === player.position,
      );
      this.team.players[index] = {
        ...this.team.players[index],
        skill,
      };
    });
  }

  get players() {
    return sortPlayersArrayAccordingToCells(this.fieldPart, this.team.players);
  }
}
