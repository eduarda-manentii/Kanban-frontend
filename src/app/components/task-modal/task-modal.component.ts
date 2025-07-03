import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule,  } from '@angular/forms';

export interface Task {
  title: string;
  description: string;
  priority: number;
  category: string;
  dueDate: string;
}

@Component({
  selector: 'app-task-modal',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './task-modal.component.html'
})
export class TaskModalComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();

  task: Task = {
    title: '',
    description: '',
    priority: 1,
    category: '',
    dueDate: ''
  };

  onSave() {
    this.save.emit(this.task);
    this.task = {
      title: '',
      description: '',
      priority: 1,
      category: '',
      dueDate: ''
    };
  }

}
