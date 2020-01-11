import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  positions = new Array(6).fill(null);

  @Input()
  halves: 'top' | 'bottom' | 'both';
}
