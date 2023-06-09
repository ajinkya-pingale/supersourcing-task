import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  constructor(private commonService: CommonService) {}
  dateOptions = []
  userForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null,[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    date: new FormControl(null,[Validators.required]),
    month: new FormControl(null,[Validators.required]),
    year: new FormControl(null,[Validators.required]),
    Addresses: new FormArray([
      new FormGroup({
        address_line_1: new FormControl(),
        address_line_2: new FormControl(),
        country: new FormControl(),
        state: new FormControl(),
        city: new FormControl(),
      }),
    ]),
  });




  monthOptions = [
    { 'label': 'January', id: 1 },
    { 'label': 'February', id: 2 },
    { 'label': 'March', id: 3 },
    { 'label': 'April', id: 4 },
    { 'label': 'May', id: 5 },
    { 'label': 'June', id: 6 },
    { 'label': 'July', id: 7 },
    { 'label': 'August', id: 8 },
    { 'label': 'September', id: 9 },
    { 'label': 'October', id: 10 },
    { 'label': 'November', id: 11 },
    { 'label': 'December', id: 12 }
  ]
  yearOption = []
  genderOption = [
    { label: 'Male', key: 'male' },
    { label: 'Female', key: 'female' },{ label: 'Other', key: 'other' }
  ]
  errorMsg = [];
  formSubmitFlag: boolean = false;
  dateError: boolean = false;
  currentDate = new Date()
  successmsg = null;
  ngOnInit(): void {
    for(let i = 1; i <= 30; i++){
      let date = {'date': i};
      this.dateOptions.push(date)
    }
    for( let i = 0; i < 100; i++ ){
      let curyear = 2023;
      let year = { 'year': curyear-i }
      this.yearOption.push(year)
    }
  }

  AddressesControl(): any {
    return this.userForm.get('Addresses') as FormArray;
  }

  addUser(){
    this.formSubmitFlag = true;
    let date = new Date(`${this.userForm.value.month} ${this.userForm.value.date}, ${this.userForm.value.year}`);
    if(this.currentDate < date){
      this.dateError = true;
      let msg ='Date should not be greater than current date'
      this.errorMsg.push(msg)
      return
    }
    if(this.userForm.valid){
      this.commonService.apiCall('post',`/users`, this.userForm.value).subscribe(
      data=>{
        console.log(data)
        this.userForm.reset();
        this.successmsg = 'Data saved successfully';
      },error=>{
        console.log(error)
        this.errorMsg = error;
      }
    )
    }else{
      return;
    }
  }

}
