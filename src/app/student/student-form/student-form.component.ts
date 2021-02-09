import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private studentService: StudentService) { }

  ngOnInit(): void {

    this.studentService.getStud().subscribe((data) => {
      if (data !== null) {
        this.formGroup.controls['id'].setValue(data.id);
        this.formGroup.controls['email'].setValue(data.email);
        this.formGroup.controls['phone'].setValue(data.phone);
        this.formGroup.controls['address'].setValue(data.address);
        this.formGroup.controls['name'].setValue(data.name);
      }
      else {
        this.createForm();
      }
    }

    )
  }

  createForm() {
    console.log("in createForm");
    this.formGroup = this.formBuilder.group({
      'id': [],
      'email': [null, [Validators.required, Validators.email]],
      'name': [null, Validators.required],
      'phone': [null, [Validators.required]],
      'address': [null, [Validators.required]],
    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }



  onSubmit() {
    if(this.formGroup.valid){
      let id = this.formGroup.controls['id'].value;
      if (id != null) {
        this.studentService.editStudentInfo(this.formGroup.value)
      }
      else {
        this.formGroup.controls['id'].setValue(Math.random())
        this.studentService.addStudentData(this.formGroup.value);
      }
      this.formGroup.reset();
      this.createForm();
    }
    else{
     
      this.showValidationMsg(this.formGroup)
    }
   
  }

  showValidationMsg(formGroup: FormGroup) {

    for (const key in formGroup.controls) {
        if (formGroup.controls.hasOwnProperty(key)) {
            const control: FormControl = <FormControl>formGroup.controls[key];
            if (Object.keys(control).includes('controls')) {
                const formGroupChild: FormGroup = <FormGroup>formGroup.controls[key];
                this.showValidationMsg(formGroupChild);
            }
            control.markAsTouched();
        }
    }
}


}
