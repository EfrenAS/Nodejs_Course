import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain/repositories/todo.repository";

import { GetTodos } from "../../domain/use-cases/todo/get-todos";
import { GetTodo } from "../../domain/use-cases/todo/get-todo";
import { CreateTodo } from "../../domain/use-cases/todo/create-todo";
import { UpdateTodo } from "../../domain/use-cases/todo/update-todo";
import { DeleteTodo } from "../../domain/use-cases/todo/delete-todo";
import CustomError from "../../domain/errors/custom.error";

type Todo = {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

export class TodosController {
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  private handleError = (res: Response, error: unknown): void => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Internal server error - check the logs' })
    return
  }

  public getTodos = (req: Request, res: Response): void => {
    new GetTodos(this.todoRepository)
    .execute()
    .then(todos => res.json(todos))
    .catch(error => this.handleError(res, error))
  }

  public getTodoById =(req: Request, res: Response): void => {
    const id = +req.params.id;

    new GetTodo(this.todoRepository)
    .execute(id)
    .then(todo => res.json(todo))
    .catch(error => this.handleError(res, error))
  }

  public createTodo = (req: Request, res: Response): void => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    
    if(error) {
      res.status(400).json({ error })
      return
    }    
    
    new CreateTodo(this.todoRepository)
    .execute(createTodoDto!)
    .then(todo => res.status(201).json(todo))
    .catch(error => this.handleError(res, error))
  }

  public updateTodoById = (req: Request, res: Response): void => {
    const id = +req.params.id;

    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

    if (error) {
      res.status(400).json({ error })
      return
    }

    new UpdateTodo(this.todoRepository)
    .execute(updateTodoDto!)
    .then(todo => res.json(todo))
    .catch(error => this.handleError(res, error))

  }

  public deleteTodoById = (req: Request, res: Response): void => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRepository)
    .execute(id)
    .then(todo => res.json(todo))
    .catch(error => this.handleError(res, error))
  }
}
