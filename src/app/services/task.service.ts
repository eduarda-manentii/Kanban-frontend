import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../components/task-modal/task-modal.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8090/tasks';

  constructor(private http: HttpClient) {}

  getBacklog(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/backlog`);
  }

  getDoing(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/doing`);
  }

  getDone(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/done`);
  }

  addToBacklog(task: Task): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/backlog`, task);
  }

  moveBacklogToDoing(): Observable<any> {
    return this.http.post<void>(`${this.baseUrl}/move/backlog-to-doing`, {});
  }

  moveDoingToDone(): Observable<any> {
    return this.http.post<void>(`${this.baseUrl}/move/doing-to-done`, {});
  }

  moveDoneToDoing(): Observable<any> {
    return this.http.post<void>(`${this.baseUrl}/move/done-to-doing`, {});
  }

}
