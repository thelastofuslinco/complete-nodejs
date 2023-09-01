const request = require('supertest')
const app = require('../src/app')
const { mockUser, mockTask, setupDataBase } = require('./fixtures/db')
const TaskModel = require('../src/models/task')

beforeEach(setupDataBase)

describe('/tasks', () => {
  test('should create task for user', async () => {
    const response = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
      .send({ description: 'any_description' })
      .expect(201)

    const tasks = await TaskModel.findById(response.body._id)

    expect(tasks).not.toBeNull()
    expect(tasks.description).toBe('any_description')
    expect(tasks.completed).toBe(false)
  })

  test('should get tasks', async () => {
    const response = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
      .expect(200)

    expect(response.body.data).toHaveLength(1)
  })

  test('should not get tasks for unauthenticated user', async () => {
    await request(app).get('/tasks').expect(401)
  })

  test('should get task by id', async () => {
    const response = await request(app)
      .get(`/tasks/${mockTask._id}`)
      .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
      .expect(200)

    expect(response.body).not.toBeNull()
  })

  test('should update task by id', async () => {
    const response = await request(app)
      .get(`/tasks/${mockTask._id}`)
      .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
      .expect(200)

    expect(response.body).not.toBeNull()
  })
})
