import { Router } from "express";
import { TodosController } from "./controller";


export class TodosRoutes {
  static get routes(): Router {
    const router = Router()
    const todosController = new TodosController()

    router.get('/', todosController.getTodos)
    router.get('/:id', todosController.getTodoById)
    router.post('/', todosController.createTodo)
    router.put('/:id', todosController.updateTodoById)
    router.delete('/:id', todosController.deleteTodoById)

    return router
  }
}