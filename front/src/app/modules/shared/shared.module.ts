import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NotificationComponent } from './components/notification/notification.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [LoaderComponent, NotificationComponent],
  entryComponents: [
    NotificationComponent
  ],  
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    LoaderComponent,
    NotificationComponent,
    MatSelectModule
  ]
})
export class SharedModule { }
