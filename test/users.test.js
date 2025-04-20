import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';
import { connectMemoryDB, closeMemoryDB } from './setupMongoMemory.js';
import UserModel from '../src/dao/models/User.js';

const expect = chai.expect;
const request = supertest(app);

describe('🔥 Users API (in‑memory DB)', () => {
  before(connectMemoryDB);
  after(async () => {
    await UserModel.deleteMany({});
    await closeMemoryDB();
  });

  let createdId;

  it('POST /api/sessions/register → should create user', async () => {
    const res = await request.post('/api/sessions/register').send({
      first_name: 'Ana',
      last_name: 'Test',
      email: 'ana@test.com',
      password: '123456'
    });
    expect(res.status).to.be.oneOf([200, 201]);
    expect(res.body).to.have.property('status', 'success');
    createdId = res.body.payload; // según tu controller, payload = _id
  });

  it('POST /api/sessions/login → should login user', async () => {
    const res = await request.post('/api/sessions/login').send({
      email: 'ana@test.com',
      password: '123456'
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body).to.have.property('message').that.includes('Logged in');
  });

  it('GET /api/users → should list users', async () => {
    const res = await request.get('/api/users');
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an('array').and.have.length(1);
  });

  it('GET /api/users/:uid → should get user by id', async () => {
    const res = await request.get(`/api/users/${createdId}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.include({ email: 'ana@test.com' });
  });

  it('PUT /api/users/:uid → should update user', async () => {
    const res = await request.put(`/api/users/${createdId}`).send({ last_name: 'Updated' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'User updated');
  });

  it('DELETE /api/users/:uid → should delete user', async () => {
    const res = await request.delete(`/api/users/${createdId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'User deleted');
  });
});
