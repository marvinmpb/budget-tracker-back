const supertest = require('supertest');
const { server } = require('../../src/server');
const { client } = require('../../src/versions/v1/database');

const request = supertest(server);

// eslint-disable-next-line jest/require-top-level-describe
afterAll(async () => {
  await client.end();
});

let accountId; // eslint-disable-line no-unused-vars
const token = process.env.SECRET_API_TOKEN;

describe('post accounts', () => {
  it('created', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/v1/accounts').type('form').send({
      firstname: 'prénom',
      lastname: 'nom',
      email: `${Date.now()}@gmail.com`,
      password: 'azerty',
      moneyDevise: 'euro',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.firstname).toBe('string');
    expect(typeof body.lastname).toBe('string');
    expect(typeof body.email).toBe('string');
    expect(body.password).toBeFalsy();
    expect(typeof body.moneyDevise).toBe('string');

    accountId = body.id;
  });

  it('missing params', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/v1/accounts').type('form').send({
      firstname: 'prénom',
      lastname: 'nom',
    });

    expect(typeof body).toBe('object');
    expect(body.code).toBe(400);
  });
});

describe('update accounts', () => {
  it('updated', async () => {
    expect.hasAssertions();

    const { body } = await request.patch(`/v1/accounts/${accountId}`).type('form').set('Authorization', token).send({
      firstname: 'wilfried',
      lastname: 'mainvielle',
    });

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.firstname).toBe('string');
    expect(typeof body.lastname).toBe('string');
    expect(typeof body.email).toBe('string');
    expect(body.password).toBeFalsy();
    expect(typeof body.moneyDevise).toBe('string');
  });

  it('wrong params', async () => {
    expect.hasAssertions();

    const { body } = await request.post('/v1/accounts').type('form').set('Authorization', token).send({
      firstname: 878,
    });

    expect(typeof body).toBe('object');
    expect(body.code).toBe(400);
  });
});

describe('get accounts', () => {
  it('getted', async () => {
    expect.hasAssertions();

    const { body } = await request.get(`/v1/accounts/${accountId}`).set('Authorization', token);

    expect(typeof body).toBe('object');
    expect(typeof body.id).toBe('number');
    expect(typeof body.firstname).toBe('string');
    expect(typeof body.lastname).toBe('string');
    expect(typeof body.email).toBe('string');
    expect(body.password).toBeFalsy();
    expect(typeof body.moneyDevise).toBe('string');
  });
});

describe('delete accounts', () => {
  it('deleted', async () => {
    expect.hasAssertions();

    const { body } = await request.delete(`/v1/accounts/${accountId}`).set('Authorization', token);

    expect(typeof body).toBe('object');
  });
});
