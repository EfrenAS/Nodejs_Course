import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";


export class TodosRoutes {
  static get routes(): Router {
    const router = Router()
    
    const datasource = new TodoDataSourceImpl()
    const todoRepository = new TodoRepositoryImpl(datasource)
        
    const todosController = new TodosController(todoRepository)
    
    router.get('/', todosController.getTodos)
    router.get('/:id', todosController.getTodoById)
    router.post('/', todosController.createTodo)
    router.put('/:id', todosController.updateTodoById)
    router.delete('/:id', todosController.deleteTodoById)

    return router
  }
}