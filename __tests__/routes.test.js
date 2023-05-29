;'use strict'

const request = require('supertest');
const express = require('express');
const authRouter = require('./authRouter');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('Auth Routes', () => {
  it('should sign up a user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        username: 'testuser',
        password: 'testpassword',
      })
      .expect(201);

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });

  it('should sign in a user', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .auth('testuser', 'testpassword')
      .expect(200);

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });

  it('should get a list of users', async () => {
    const response = await request(app)
      .get('/auth/users')
      .set('Authorization', 'Bearer <valid_token>')
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should access the secret area', async () => {
    const response = await request(app)
      .get('/auth/secret')
      .set('Authorization', 'Bearer <valid_token>')
      .expect(200);

    expect(response.text).toBe('Welcome to the secret area');
  });
});
