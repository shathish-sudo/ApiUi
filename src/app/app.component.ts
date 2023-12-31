import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { Employee } from './models/employee';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'EmployeeAPI';
  EmployeeArray : Employee[]  = [];
  EmployeeformGroup : FormGroup
  ZeroVAlue : string = "No data Found"
  constructor(private empservice : ApiServiceService, private fb:FormBuilder)
  {
this.EmployeeformGroup = this.fb.group({
  id : [""],
  name : [""],
  emailId : [""],
  mobileNo : [""],
})
  }
  ngOnInit(): void 
  {
   this.GetEmp()
  }

  GetEmp()
  {
    this.empservice.GetEmployee().subscribe(obj => 
      {
        console.log(obj);
        console.log(obj.length);
        if(obj.length == 0)
        {
         this.ZeroVAlue
        }
        else
        {
          this.EmployeeArray = obj;
        }        

    })
  }

  Onsubmit()
  {
        console.log(this.EmployeeformGroup.value)
        if (this.EmployeeformGroup.value.id != null && this.EmployeeformGroup.value.id != "")
        {
          this.empservice.EditEmployee(this.EmployeeformGroup.value).subscribe(response =>{
            this.GetEmp()
            this.EmployeeformGroup.setValue({id:"",mobileNo:"",emailId:"",name:""})
            })
        }
        else
        {
          this.empservice.CreateEmployee(this.EmployeeformGroup.value).subscribe(response =>{
            this.GetEmp()
            this.EmployeeformGroup.setValue({id:"",mobileNo:"",emailId:"",name:""})
            })
        }
        
  }

  EditEmp(objid:Employee)
  {
    this.EmployeeformGroup.setValue({
      id: objid.id,
      mobileNo:objid.mobileNo,
      emailId:objid.emailId,
      name:objid.name
    })
  }

  Deletemp(id : string)
  {
       this.empservice.DeleteEmployee(id).subscribe(obj => {
      this.GetEmp()
       })
  }
 
}
