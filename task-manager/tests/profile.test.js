const request = require('supertest')
const app = require('../src/app')
const UserModel = require('../src/models/user')
const { mockUser, setupDataBase } = require('./fixtures/db')

beforeEach(setupDataBase)

describe('/profile', () => {
  test('should get profile', async () => {
    await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
      .send()
      .expect(200)
  })

  test('should not get profile for unauthenticated user', async () => {
    await request(app).get('/profile').send().expect(401)
  })

  test('should delete profile', async () => {
    await request(app)
      .delete('/profile')
      .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
      .send()
      .expect(200)

    const user = await UserModel.findById(mockUser._id)
    expect(user).toBeNull()
  })

  test('should not delete profile for unauthenticated user', async () => {
    await request(app).delete('/profile').send().expect(401)
  })

  test('should upload a avatar profile', async () => {
    await request(app)
      .post('/profile/avatar')
      .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
      .attach('avatar', 'tests/fixtures/profile.jpg')
      .expect(200)

    const user = await UserModel.findById(mockUser._id)
    expect(user.avatar).toEqual(expect.any(Buffer))
  })

  test('should update valid user fields', async () => {
    await request(app)
      .patch('/profile')
      .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
      .send({ name: 'updated_name' })
      .expect(200)

    const user = await UserModel.findById(mockUser._id)
    expect(user.name).toBe('updated_name')
  })

  test('should not update invalid user fields', async () => {
    await request(app)
      .patch('/profile')
      .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
      .send({ location: 'updated_name' })
      .expect(400)
  })
})
