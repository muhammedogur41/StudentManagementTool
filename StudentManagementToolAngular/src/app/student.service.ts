import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Student } from './student';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) { }

  createStudent(student: Student): Observable<Message> {
      return this.http.post<Message>(`${this.baseUrl}` + `/create`, student)
                  .pipe(
                    retry(3),
                    catchError(this.handleError)
                  );
  }

  updateStudent(student: Student): Observable<Message> {
      return this.http.put<Message> (`${this.baseUrl}` + `/updatebyid/` + student.id, student)
        .pipe(
            retry(3),
            catchError(this.handleError)
          );
  }

  deleteStudent(id: number): Observable<Message> {
      return this.http.delete<Message>(`${this.baseUrl}` + `/deletebyid/` + id)
            .pipe(
              retry(3),
              catchError(this.handleError)
            );
  }

  retrieveAllStudent(): Observable<Message> {
      return this.http.get<Message>(`${this.baseUrl}` + `/retrieveinfos`)
                    .pipe(
                      retry(3),
                      catchError(this.handleError)
                    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}

