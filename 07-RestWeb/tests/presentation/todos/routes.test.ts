import request from 'supertest'
import { testServer } from '../../test-server'
import { prisma } from '../../../src/data/postgres'

describe('Todo routes testing', () => {
  beforeAll(async () => await testServer.start())
  afterAll(() => testServer.stop())

  beforeEach(async () => await prisma.todo.deleteMany())

  const todoMessage = {
    text: 'Test todo message',
  }
  
  const todoTest = {
    text: 'Test todo',
  }
  
  test('should return TODOs api/todos', async () => {
    await prisma.todo.createMany({
      data: [
        todoMessage,
        todoTest
      ],
    })

    const { body } = await request(testServer.app)
      .get('/api/todos')
      .expect(200)

    expect(body).toBeInstanceOf(Array)
    expect(body.length).toBe(2)
    expect(body[0].text).toBe(todoMessage.text)
    expect(body[1].text).toBe(todoTest.text)
  })

  test('should return TODO api/todos/:id', async () => {
    const todo = await prisma.todo.create({
      data: todoTest,
    })

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200)

    expect(body).toBeInstanceOf(Object)
    expect(body).toEqual({
      id: todo.id,
      text: todoTest.text,
      completed: todo.completed,
    })
  })

  test('should return 404 Not Found api/todos/:id', async () => {
    const todoId = 999

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(404)

    expect(body).toEqual({ error: `Todo id ${todoId} not found` })
  })

  test('should create TODO api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send(todoMessage)
      .expect(201)

      expect(body).toBeInstanceOf(Object)
      expect(body).toEqual({
        id: expect.any(Number),
        text: todoMessage.text,
        completed: false,
      })
  })

  test('should return an error if text is not provided api/todos', async () => {
    const {body } = await request(testServer.app)
      .post('/api/todos')
      .send({})
      .expect(400)
    
    expect(body).toEqual({ error: 'Text property is required' })
  })

  test('should reutnr an error if text is empty api/todos', async () => {
    const {body} = await request(testServer.app)
      .post('/api/todos')
      .send({ text: '' })
      .expect(400)

    expect(body).toEqual({ error: 'Text property is required' })
  })

  test('should return an updated TODO api/todos/:id', async () => {
    const createdTodo = await prisma.todo.create({
      data: todoTest
    })

    const { body } = await request(testServer.app)
      .put(`/api/todos/${createdTodo.id}`)
      .send({ text: 'Test todo updated' })
      .expect(200)
    
    expect(body).toEqual({
      id: expect.any(Number),
      text: 'Test todo updated',
      completed: createdTodo.completed
    })
  })

  // TODO: Realizar la operación con errores personalizados
  test('should return 404 if TODO not found api/todos/:id', async () => {
    const todoId = 999

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todoId}`)
      .send({ text: 'Test todo updated' })
      .expect(404)

    expect(body).toEqual({ error: `Todo id ${todoId} not found` })
  })

  test('should return an updated TODO only the completed property api/todos/:id', async () => {
    const createdTodo = await prisma.todo.create({
      data: todoTest
    })

    const { body } = await request(testServer.app)
      .put(`/api/todos/${createdTodo.id}`)
      .send({ completed: true })
      .expect(200)
    
    expect(body).toEqual({
      id: expect.any(Number),
      text: 'Test todo',
      completed: true
    })
  })

  test ('should delete TODO api/todos/:id', async () => {
    const createdTodo = await prisma.todo.create({
      data: todoTest
    })

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${createdTodo.id}`)
      .expect(200)
    
      expect(body).toEqual({
        id: expect.any(Number),
        text: 'Test todo',
        completed: false
      })
  })

  test('should return 404 if TODO not found to try to delete api/todos/:id', async () => {
    const todoId = 999

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todoId}`)
      .expect(404)

    expect(body).toEqual({ error: `Todo id ${todoId} not found` })
  })

})
