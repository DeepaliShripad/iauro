import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentData$: BehaviorSubject<any> = new BehaviorSubject([
    {
      id: 1,
      name: "Deepali",
      email: 'deepalishinde0909@gmail.com',
      phone: 9881535070,
      address: "ABCD"
    }
  ]);

  private EditStud$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  addStudentData(data: any) {
    let arr = []
    this.studentData$.subscribe((data) => {
      arr = data;
    })
    arr.push(data);
    this.studentData$.next(arr);
  }

  editStudentInfo(data) {
    let studArr = this.studentData$.getValue();
    for (let index = 0; index < studArr.length; index++) {
      const item = studArr[index];
      if (item.id === data.id) {
        studArr.pop();
        studArr.push(data);
        break;
      }
    }
    this.studentData$.next(studArr);
  }

  EditStud(data: any) {
    this.EditStud$.next(data);
  }

  getStud() {
    return this.EditStud$.asObservable();
  }

  removeStudentData(removeItem) {
    const studArr: any[] = this.studentData$.getValue();
    studArr.forEach((item, index) => {
      if (item === removeItem) { studArr.splice(index, 1); }
    });
    this.studentData$.next(studArr);
  }

  getStudentList() {
    return this.studentData$.asObservable();
  }

}
