import { Component, OnInit } from '@angular/core';
import { Team } from '../model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'volleyball';

  ngOnInit(): void {
    const team = new Team();
  }
}
