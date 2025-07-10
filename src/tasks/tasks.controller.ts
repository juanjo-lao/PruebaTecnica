import { Controller, Get, Post, Param, Body, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // GET /tasks - devuelve todas las tareas
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  // GET /tasks/:id - devuelve una tarea por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  // POST /tasks - crea una nueva tarea
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  // DELETE /tasks/:id - borra una tarea por su ID
  @Delete(':id')
  delete(@Param('id') id: string) {
    this.tasksService.delete(id);
    return { message: `Task with ID ${id} deleted successfully` };
  }
}
