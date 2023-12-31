import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './models/employee';
import { getuid } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  readonly ApiUrl = "https://apicurd.azurewebsites.net/api/";

  constructor(private http:HttpClient) { }
  GetEmployee():Observable<Employee[]>
  {
        return this.http.get<Employee[]>(this.ApiUrl)
  }
  CreateEmployee(emp : Employee):Observable<Employee>
  {
         emp.id = "9799e58f-a3e2-455f-af8d-c50bc6c2eb7a"
        return this.http.post<Employee>(this.ApiUrl, emp)
  }
  DeleteEmployee(id: string):Observable<Employee>
  {
       return this.http.delete<Employee>(this.ApiUrl + '/' + id)
  }
  EditEmployee(emp : Employee): Observable<Employee>
  {
    return this.http.put<Employee>(this.ApiUrl + '/' + emp.id,emp)
  }
}
