import { Component, Input, OnInit } from '@angular/core';
import { TeamInfoI } from '../../model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  mode: 'PvP' | 'PvE' = 'PvP';

  @Input()
  team1: TeamInfoI;

  @Input()
  team2: TeamInfoI;

  log(value) {
    console.log(value.tab.textLabel);
  }

  ngOnInit() {}
}
