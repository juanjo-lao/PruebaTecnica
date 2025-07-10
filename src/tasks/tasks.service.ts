// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  // Devuelve todas las tareas
  findAll(): Task[] {
    return this.tasks;
  }

  // Devuelve una tarea por su ID
  findOne(id: string | number): Task {
    const task = this.tasks.find(task => task.id == id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  // Crea una nueva tarea
  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.idCounter++, // puedes hacerlo string o number; aquí number por simplicidad
      title: createTaskDto.title,
      description: createTaskDto.description,
      isDone: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  // Elimina una tarea por su ID
  delete(id: string | number): void {
    const index = this.tasks.findIndex(task => task.id == id);
    if (index === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(index, 1);
  }
}
