import e, { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain/repositories/todo.repository";

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

  public getTodos = async (req: Request, res: Response): Promise<void>  =>{
    console.log('Todo correcto hasta este punto');
    const todos = await this.todoRepository.getAll()
    
    res.status(200).json(todos)

    return
  }

  public getTodoById = async (req: Request, res: Response): Promise<void> => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findById(id)
      res.json(todo)
      
      return
    }catch(error){
      res.status(404).json({ error: `TODO with ${id} not found` })
      return
    }
  }

  public createTodo = async (req: Request, res: Response): Promise<void> => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    
    if(error) {
      res.status(400).json({ error })
      return
    }    
    
    const todo = await this.todoRepository.create(createTodoDto!)
    res.status(201).json(todo)

    return
  }

  public updateTodoById = async (req: Request, res: Response): Promise<void> => {
    const id = +req.params.id;

    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

    if (error) {
      res.status(400).json({ error })
      return
    }

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)
    res.json(updatedTodo)

   return
  }

  public deleteTodoById = async (req: Request, res: Response): Promise<void> => {
    const id = +req.params.id;

    const deletedTodo = await this.todoRepository.deleteById(id)

    res.json(deletedTodo);
    return
  }
}
