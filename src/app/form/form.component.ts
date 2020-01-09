import { Component, OnInit } from '@angular/core';
import { TeamInfoI, TeamNameI } from '../../model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  mode: 'PvP' | 'PvE' = 'PvP';
  team1: TeamInfoI = {
    name: '',
    players: [],
  };
  team2: TeamInfoI = {
    name: '',
    players: [],
  };

  log(value) {
    console.log(value.tab.textLabel);
  }

  ngOnInit() {}
}
