const request = require('supertest')
const app = require('../src/app')
const UserModel = require('../src/models/user')
const { mockUser, setupDataBase } = require('./fixtures/db')

beforeEach(setupDataBase)

describe('/users', () => {
  test('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'valid_name',
        email: 'valid_mail@mail.com',
        password: '12345678'
      })
      .expect(201)

    const user = await UserModel.findById(response.body.user._id)

    expect(user).not.toBeNull()
    expect(response.body).toMatchObject({
      user: {
        name: 'valid_name',
        email: 'valid_mail@mail.com'
      },
      token: user.tokens[0].token
    })
  })

  test('should get existing users', async () => {
    await request(app)
      .get('/users')
      .expect(200)
      .then((response) => {
        expect(response.body[0].name).toBe(mockUser.name)
        expect(response.body[0].email).toBe(mockUser.email)
      })
  })

  test('should get user by id', async () => {
    await request(app)
      .get(`/users/${mockUser._id.toString()}`)
      .expect(200)
      .then((response) => {
        expect(response.body.name).toBe(mockUser.name)
        expect(response.body.email).toBe(mockUser.email)
      })
  })
})
