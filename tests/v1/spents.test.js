const supertest = require('supertest');
const { client } = require('../../src/versions/v1/database');
const { server } = require('../../src/server');

const request = supertest(server);

// eslint-disable-next-line jest/require-top-level-describe
afterAll(async () => {
  await client.end();
});

const token = process.env.SECRET_API_TOKEN;
// eslint-disable-next-line no-unused-vars
let spentId;

describe('post spent', () => {
  it('created', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/v1/spents').set('Authorization', token).type('form').send({
      amount: 700,
      comment: 'ferret',
      categoryId: 17,
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.comment).toBe('string');
    expect(typeof body.date).toBe('string');
    expect(typeof body.subscription).toBe('boolean');
    expect(typeof body.accountId).toBe('number');
    expect(typeof body.categoryId).toBe('number');

    spentId = body.id;
  });

  it('wrong params', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/v1/spents').set('Authorization', token).type('form').send({
      amount: 200,
    });

    expect(typeof body).toBe('object');
    expect(body.code).toBe(400);
  });
});

describe('get spent', () => {
  it('getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get(`/v1/spents/${spentId}`).set('Authorization', token).type('form');

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.comment).toBe('string');
    expect(typeof body.date).toBe('string');
    expect(typeof body.subscription).toBe('boolean');
    expect(typeof body.accountId).toBe('number');
    expect(typeof body.categoryId).toBe('number');
  });
});

describe('get all spents', () => {
  it('getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get('/v1/spents').set('Authorization', token).type('form');

    expect(Array.isArray(body)).toBeTruthy();
  });
});

describe('get all spents by category', () => {
  it('getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get('/v1/spents/category/11').set('Authorization', token).type('form');

    expect(Array.isArray(body)).toBeTruthy();
  });
});

describe('delete spent', () => {
  it('deleted', async () => {
    expect.hasAssertions();

    const { body } = await request.delete(`/v1/spents/${spentId}`).set('Authorization', token).type('form');

    expect(typeof body).toBe('object');
  });
});
