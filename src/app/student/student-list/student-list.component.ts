import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})

export class StudentListComponent implements OnInit {

  studentData:any;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudentList().subscribe((data: any)=>{
      this.studentData = data;
      console.log(this.studentData);
    });
  }

  onClickDelete(data){
    this.studentService.removeStudentData(data);
  }

  onClickEdit(data){
    this.studentService.EditStud(data);
  }

}
