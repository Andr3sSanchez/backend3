import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';
import { connectMemoryDB, closeMemoryDB } from './setupMongoMemory.js';
import PetModel from '../src/dao/models/Pet.js';

const expect = chai.expect;
const request = supertest(app);

describe('🐶 Pets API (in‑memory DB)', () => {
  before(connectMemoryDB);
  after(async () => {
    await PetModel.deleteMany({});
    await closeMemoryDB();
  });

  let petId;

  it('POST  /api/pets         →  should create pet', async () => {
    const res = await request.post('/api/pets').send({
      name: 'Rex',
      specie: 'Dog',
      birthDate: '2020-01-01'
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status','success');
    petId = res.body.payload && res.body.payload._id;
expect(petId).to.exist;
console.log('🐾 Created pet ID:', petId);
  });

  it('GET   /api/pets         →  should list pets', async () => {
    const res = await request.get('/api/pets');
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an('array').and.have.length(1);
  });

  it('GET   /api/pets/:pid     →  should get pet by id', async () => {
    const res = await request.get(`/api/pets/${petId}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.include({ name: 'Rex', specie: 'Dog' });
  });

  it('PUT   /api/pets/:pid     →  should update pet', async () => {
    const res = await request.put(`/api/pets/${petId}`).send({ name: 'RexUpdated' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message','Pet updated');
  });

  it('DELETE /api/pets/:pid     →  should delete pet', async () => {
    const res = await request.delete(`/api/pets/${petId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message','Pet deleted');
  });
});
