import { Component } from '@angular/core';
import { sortPlayersArrayAccordingToCells } from '../../helpers';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  constructor(public store: StoreService) {}

  get playersTop() {
    return sortPlayersArrayAccordingToCells('top', this.store.team1.players);
  }

  get playersBottom() {
    return sortPlayersArrayAccordingToCells('bottom', this.store.team2.players);
  }
}
