import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class Todo {

  newTask = '';

  tasks: {
    title: string;
    completed: boolean;
  }[] = [

    {
      title: 'Learn Angular Components',
      completed: true
    },

    {
      title: 'Complete Calculator',
      completed: false
    },

    {
      title: 'Complete Feedback Form',
      completed: false
    }

  ];


  addTask(): void {

    if (this.newTask.trim() === '') {
      return;
    }


    this.tasks.push({

      title: this.newTask,

      completed: false

    });


    this.newTask = '';

  }


  deleteTask(index: number): void {

    this.tasks.splice(index, 1);

  }


  toggleTask(index: number): void {

    this.tasks[index].completed =
      !this.tasks[index].completed;

  }


  get completedCount(): number {

    return this.tasks.filter(
      task => task.completed
    ).length;

  }


  get remainingCount(): number {

    return this.tasks.length -
      this.completedCount;

  }

}