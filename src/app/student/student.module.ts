import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student/student.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [StudentComponent, StudentFormComponent, StudentListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
