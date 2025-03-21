import { prisma } from "../../data/postgres";
import { TodoDataSource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";
import  CustomError from "../../domain/errors/custom.error";

export class TodoDataSourceImpl implements TodoDataSource {
   async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
      const todo = await prisma.todo.create({
         data: createTodoDto!
      })

      return TodoEntity.fromObject(todo)
   }

   async getAll(): Promise<TodoEntity[]> {
      const todos = await prisma.todo.findMany();

      return todos.map(todo => TodoEntity.fromObject(todo));
   }

   async findById(id: number): Promise<TodoEntity> {
      const todo = await prisma.todo.findUnique({
      where: {
         id,
      },
      });

      if(!todo) throw new CustomError(`Todo id ${id} not found`, 404);

      return TodoEntity.fromObject(todo);
   }

   async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
      await this.findById(updateTodoDto.id)

      const { id } = updateTodoDto

      const updatedTodo = await prisma.todo.update({
         where: {id},
         data: updateTodoDto!.values
      })

      return TodoEntity.fromObject(updatedTodo)
   }

   async deleteById(id: number): Promise<TodoEntity> {
      await this.findById(id)

      const deletedTodo = await prisma.todo.delete({
         where: {id}
      })

      return TodoEntity.fromObject(deletedTodo)
   }
}
