const supertest = require('supertest');
const { client } = require('../../src/versions/v1/database');
const { server } = require('../../src/server');

const request = supertest(server);

// eslint-disable-next-line jest/require-top-level-describe
afterAll(async () => {
  await client.end();
});

// eslint-disable-next-line no-unused-vars
let token;

describe('post connect', () => {
  it('created', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/v1/connect').type('form').send({
      email: 'wmainvielle@gmail.com',
      password: 'azerty',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.accessToken).toBe('string');

    token = body.accessToken;
  });

  it('wrong params', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/v1/connect').type('form').send({
      email: 'wmainvielle@gmail.com',
    });

    expect(typeof body).toBe('object');
    expect(body.code).toBe(400);
  });
});

describe('token test', () => {
  it('get randomly', async () => {
    expect.hasAssertions();

    const { body } = await request.get('/v1/categories').set('Authorization', token);

    expect(Array.isArray(body)).toBeTruthy();
  });
});
