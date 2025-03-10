import { CreateTodoDto } from "../dtos/todos/create-todo.dto"
import { UpdateTodoDto } from "../dtos/todos/update-todo.dto"
import { TodoEntity } from "../entities/todo.entity"

export interface TodoRepository {
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity>
  
  //todo: paginacion
  getAll(): Promise<TodoEntity[]>

  findById(id: number): Promise<TodoEntity>

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>

  deleteById(id: number): Promise<TodoEntity>
}
