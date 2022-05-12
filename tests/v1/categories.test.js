const supertest = require('supertest');
const { server } = require('../../src/server');
const { client } = require('../../src/versions/v1/database');

const request = supertest(server);

// eslint-disable-next-line jest/require-top-level-describe
afterAll(async () => {
  await client.end();
});

// eslint-disable-next-line no-unused-vars
let categoryId;
const token = process.env.SECRET_API_TOKEN;

describe('post category', () => {
  it('created', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/v1/categories').type('form').set('Authorization', token).send({
      name: `category${Date.now()}`,
      icon: 'chips',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.icon).toBe('string');

    categoryId = body.id;
  });

  it('wrong params', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/v1/categories').type('form').set('Authorization', token).send({
      name: `category${Date.now()}`,
    });

    expect(typeof body).toBe('object');
    expect(body.code).toBe(400);
  });
});

describe('update category', () => {
  it('updated', async () => {
    expect.hasAssertions();

    const { body } = await request.patch(`/v1/categories/${categoryId}`).type('form').set('Authorization', token).send({
      name: `updated${Date.now()}`,
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.icon).toBe('string');
  });

  it('wrong params', async () => {
    expect.hasAssertions();

    const { body } = await request.patch(`/v1/categories/${categoryId}`).type('form').set('Authorization', token).send({
      prop: true,
    });

    expect(typeof body).toBe('object');
    expect(body.code).toBe(400);
  });
});

describe('get all categories', () => {
  it('getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get('/v1/categories').set('Authorization', token);

    expect(Array.isArray(body)).toBeTruthy();
    body.forEach((category) => {
      expect(typeof category).toBe('object');
      expect(typeof category.id).toBe('number');
      expect(typeof category.name).toBe('string');
      expect(typeof category.icon).toBe('string');
    });
  });
});

describe('get category', () => {
  it('getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get(`/v1/categories/${categoryId}`).set('Authorization', token);

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.name).toBe('string');
    expect(typeof body.icon).toBe('string');
  });
});

describe('delete category', () => {
  it('deleted', async () => {
    expect.hasAssertions();

    const { body } = await request.delete(`/v1/categories/${categoryId}`).set('Authorization', token);

    expect(typeof body).toBe('object');
  });
});
