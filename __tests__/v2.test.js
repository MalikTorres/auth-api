'use strict';
const request = require('supertest')
const express = require('express');
const dataModules = require('../models');
const bearerAuth = require('../auth/middleware/bearer');
const permissions = require('../auth/middleware/acl');
const router = require('./yourRouter');

const app = express();
app.use(express.json());
app.use('/api', router);

describe('API Routes', () => {
  it('should get all records for a model with bearer authentication', async () => {
    const modelName = 'yourModelName';
    dataModules[modelName].get = jest.fn().mockResolvedValueOnce(['record1', 'record2']);

    const response = await request(app)
      .get(`/api/${modelName}`)
      .set('Authorization', 'Bearer <valid_token>')
      .expect(200);

    expect(response.body).toEqual(['record1', 'record2']);
  });

  it('should get a specific record for a model with bearer authentication', async () => {
    const modelName = 'yourModelName';
    const id = 'yourRecordId';
    dataModules[modelName].get = jest.fn().mockResolvedValueOnce('record1');

    const response = await request(app)
      .get(`/api/${modelName}/${id}`)
      .set('Authorization', 'Bearer <valid_token>')
      .expect(200);

    expect(response.body).toBe('record1');
  });

  it('should create a new record for a model with bearer authentication and create permission', async () => {
    const modelName = 'yourModelName';
    const record = { name: 'New Record' };
    dataModules[modelName].create = jest.fn().mockResolvedValueOnce('createdRecord');

    const response = await request(app)
      .post(`/api/${modelName}`)
      .send(record)
      .set('Authorization', 'Bearer <valid_token>')
      .expect(201);

    expect(response.body).toBe('createdRecord');
  });

  it('should update an existing record for a model with bearer authentication and update permission', async () => {
    const modelName = 'yourModelName';
    const id = 'yourRecordId';
    const updatedRecord = { name: 'Updated Record' };
    dataModules[modelName].update = jest.fn().mockResolvedValueOnce('updatedRecord');

    const response = await request(app)
      .put(`/api/${modelName}/${id}`)
      .send(updatedRecord)
      .set('Authorization', 'Bearer <valid_token>')
      .expect(200);

    expect(response.body).toBe('updatedRecord');
  });

  it('should delete an existing record for a model with bearer authentication and delete permission', async () => {
    const modelName = 'yourModelName';
    const id = 'yourRecordId';
    dataModules[modelName].delete = jest.fn().mockResolvedValueOnce('deletedRecord');

    const response = await request(app)
      .delete(`/api/${modelName}/${id}`)
      .set('Authorization', 'Bearer <valid_token>')
      .expect(200);

    expect(response.body).toBe('deletedRecord');
  });
});
