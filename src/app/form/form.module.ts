import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormComponent } from './form.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { BotFormComponent } from './bot-form/bot-form.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { SharingModule } from '../sharing/sharing.module';

@NgModule({
  declarations: [
    FormComponent,
    TeamFormComponent,
    BotFormComponent,
    FormModalComponent,
  ],
  entryComponents: [FormModalComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    SharingModule,
  ],
  bootstrap: [FormComponent],
  exports: [FormComponent],
})
export class FormModule {}
