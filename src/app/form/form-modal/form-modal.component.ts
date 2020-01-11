import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerSkillI } from '../../../model';

export interface DialogData {
  skill: PlayerSkillI;
}

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent {
  skillLevels: (PlayerSkillI | 0)[] = [0, 1, 2, 3];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
