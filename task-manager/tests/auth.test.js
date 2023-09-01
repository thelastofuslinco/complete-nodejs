const request = require('supertest')
const app = require('../src/app')
const UserModel = require('../src/models/user')
const { mockUser, setupDataBase } = require('./fixtures/db')

beforeEach(setupDataBase)

describe('/auth', () => {
  test('should login existing user', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(200)

    const user = await UserModel.findById(mockUser._id)

    expect(user.tokens[1].token).toBe(response.body.token)
  })

  test('should not login nonexistent user', async () => {
    await request(app)
      .post('/login')
      .send({
        email: mockUser.email,
        password: 'invalid_password'
      })
      .expect(400)
  })

  test('should logout authenticated user', async () => {
    await request(app)
      .post('/logout')
      .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
      .send()
      .expect(200)
  })

  test('should not logout unauthenticated user', async () => {
    await request(app).post('/logout').send().expect(401)
  })
})
