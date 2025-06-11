import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { CommonModule } from '@angular/common';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { Task } from './components/task-modal/task-modal.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    TaskModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  backlogTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];

  modalVisible = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getBacklog().subscribe(data => this.backlogTasks = data);
    this.taskService.getDoing().subscribe(data => this.doingTasks = data);
    this.taskService.getDone().subscribe(data => this.doneTasks = data);
  }

  openAddTaskModal() {
    this.modalVisible = true;
  }

  handleTaskSave(newTask: Task) {
    this.taskService.addToBacklog(newTask).subscribe(() => {
      this.modalVisible = false;
      this.loadTasks();
    });
  }

  getDueDateColor(task: Task): string {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    dueDate.setDate(dueDate.getDate() + 1);
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (dueDate.getTime() < today.getTime()) {
      return 'text-danger';
    } else if (dueDate.getTime() === today.getTime()) {
      return 'text-warning';
    } else {
      return 'text-success';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  moveToDoing(): void {
    const confirmed = window.confirm('Tem certeza que deseja mover para "Em andamento"?');
    if (!confirmed) return;

    const task = this.backlogTasks.shift();
    if (task) {
      this.doingTasks.unshift(task);
    }
  }

  moveToDone(): void {
    const confirmed = window.confirm('Tem certeza que deseja mover para "Concluído"?');
    if (!confirmed) return;

    const task = this.doingTasks.shift();
    if (task) {
      this.doneTasks.unshift(task);
    }
  }

  moveDoneToDoing(): void {
    const confirmed = window.confirm('Tem certeza que deseja mover para "Em andamento"?');
    if (!confirmed) return;

    const task = this.doneTasks.shift();
    if (task) {
      this.doingTasks.unshift(task);
    }
  }

}