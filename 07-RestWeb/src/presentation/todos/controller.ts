import { Request, Response } from "express";

const todos = [
  { id: 1, title: "Buy milk", completed: false },
  { id: 2, title: "Buy bread", completed: false },
  { id: 3, title: "Buy beer", completed: false },
];

export class TodosController {
  constructor() {}

  public getTodos(req: Request, res: Response): void {
    res.json(todos);
    return
  }

  public getTodoById (req: Request, res: Response): void {
    const id = +req.params.id;

    if(isNaN(id)) {
      res.status(400).json({ error: "Invalid id is not a number" })
      return
    };
    
    const todo = todos.find(todo => todo.id === id);
    
    (todo) 
      ? res.json(todo) 
      : res.status(404).json({ error: `TODO with ${id} not found` });
  }

  public createTodo(req: Request, res: Response): void {
    const {text} = req.body;

    if(!text) {
      res.json({ error: "Invalid text is not provided" })
      return
    }
    
    const newTodo = { 
      id: todos.length + 1,
      title: text, 
      completed: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
  }

  public updateTodoById (req: Request, res: Response): void {
    const id = +req.params.id;

    if(isNaN(id)){
      res.status(400).json({ error: "Invalid id, it is not a number" })
      return
    }
    
    const todo = todos.find(todo => todo.id === id);
    
    if(!todo){
      res.status(404).json({ error: `TODO with ${id} not found` })
      return
    }

    const { text, completed } = req.body;

    todo.title = text || todo?.title
    todo.completed = completed || todo?.completed

   res.json(todo);
   return
  }

  public deleteTodoById (req: Request, res: Response): void {
    const id = +req.params.id;

    if(isNaN(id)){
      res.status(400).json({ error: "Invalid id, it is not a number" })
      return
    }
    
    const todo = todos.find(todo => todo.id === id);

    if(!todo){
      res.status(404).json({ error: `TODO with ${id} not found` })
      return
    }

    todos.splice(todos.indexOf(todo), 1);

    res.json(todo);
    return
  }
}
