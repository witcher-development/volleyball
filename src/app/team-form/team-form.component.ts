import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamNameI, PlayerI } from '../../model';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent {
  @Input()
  name: TeamNameI;

  @Input()
  players: PlayerI[];

  @Output() nameChange = new EventEmitter<TeamNameI>();
  @Output() playersChange = new EventEmitter<PlayerI[]>();

  onNameChange(name: TeamNameI) {
    console.log(name);
    this.name = name;
    this.nameChange.emit(name);
  }

  onPlayersChange(name: TeamNameI) {
    console.log(name);
    this.name = name;
    this.nameChange.emit(name);
  }
}
