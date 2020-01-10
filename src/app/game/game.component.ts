import { Component, Input } from '@angular/core';
import { sortPlayersArrayAccordingToCells } from '../../helpers';
import { GameI, TeamI } from '../../model';

type Phase = 'serve' | 'pass' | 'attack';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  @Input()
  game: GameI;

  @Input()
  team1: TeamI;

  @Input()
  team2: TeamI;

  phase: Phase = 'serve';

  get playersTop() {
    return sortPlayersArrayAccordingToCells('top', this.team1.players);
  }

  get playersBottom() {
    return sortPlayersArrayAccordingToCells('bottom', this.team2.players);
  }

  get currentRound() {
    return this.game.currentRound;
  }
}
