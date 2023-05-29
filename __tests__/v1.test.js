const request = require('supertest');
const express = require('express');
const dataModules = require('../models');
const router = require('./yourRouter');

const app = express();
app.use(express.json());
app.use('/api', router);

describe('API Routes', () => {
  it('should get all records for a model', async () => {
    const modelName = 'yourModelName';
    dataModules[modelName].get = jest.fn().mockResolvedValueOnce(['record1', 'record2']);

    const response = await request(app).get(`/api/${modelName}`).expect(200);

    expect(response.body).toEqual(['record1', 'record2']);
  });

  it('should get a specific record for a model', async () => {
    const modelName = 'yourModelName';
    const id = 'yourRecordId';
    dataModules[modelName].get = jest.fn().mockResolvedValueOnce('record1');

    const response = await request(app).get(`/api/${modelName}/${id}`).expect(200);

    expect(response.body).toBe('record1');
  });

  it('should create a new record for a model', async () => {
    const modelName = 'yourModelName';
    const record = { name: 'New Record' };
    dataModules[modelName].create = jest.fn().mockResolvedValueOnce('createdRecord');

    const response = await request(app).post(`/api/${modelName}`).send(record).expect(201);

    expect(response.body).toBe('createdRecord');
  });

  it('should update an existing record for a model', async () => {
    const modelName = 'yourModelName';
    const id = 'yourRecordId';
    const updatedRecord = { name: 'Updated Record' };
    dataModules[modelName].update = jest.fn().mockResolvedValueOnce('updatedRecord');

    const response = await request(app).put(`/api/${modelName}/${id}`).send(updatedRecord).expect(200);

    expect(response.body).toBe('updatedRecord');
  });

  it('should delete an existing record for a model', async () => {
    const modelName = 'yourModelName';
    const id = 'yourRecordId';
    dataModules[modelName].delete = jest.fn().mockResolvedValueOnce('deletedRecord');

    const response = await request(app).delete(`/api/${modelName}/${id}`).expect(200);

    expect(response.body).toBe('deletedRecord');
  });
});
