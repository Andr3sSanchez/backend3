import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js'; 
import { connectMemoryDB, closeMemoryDB } from './setupMongoMemory.js';
import AdoptionModel from '../src/dao/models/Adoption.js';
import UserModel from '../src/dao/models/User.js';
import PetModel from '../src/dao/models/Pet.js';

const expect = chai.expect;
const request = supertest(app);

describe('🐾 Adoption API (in‑memory DB)', () => {
  let user;
  let pet;
  let adoptionId;

  before(connectMemoryDB);

  beforeEach(async () => {
    // Crear usuario
    user = new UserModel({
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        role: 'user',
        pets: [],
      });      
    await user.save();

    // Crear mascota
    pet = new PetModel({
        name: 'Buddy',
        specie: 'dog', 
        adopted: false,
        owner: null,
      });    
    await pet.save();
  });

  afterEach(async () => {
    await AdoptionModel.deleteMany({});
    await UserModel.deleteMany({});
    await PetModel.deleteMany({});
  });

  after(closeMemoryDB);

  it('POST /api/adoptions/:uid/:pid → should create adoption', async () => {
    const res = await request.post(`/api/adoptions/${user._id}/${pet._id}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.message).to.equal('Pet adopted');

    // Verificar que la adopción fue creada
    const adoption = await AdoptionModel.findOne({ owner: user._id, pet: pet._id });
    expect(adoption).to.not.be.null;
  });

  it('POST /api/adoptions/:uid/:pid → should return error if user is not found', async () => {
    const res = await request.post(`/api/adoptions/invalidUserId/${pet._id}`);
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal('error');
    expect(res.body.error).to.equal('Invalid user ID');
  });

  it('POST /api/adoptions/:uid/:pid → should return error if pet is not found', async () => {
    const res = await request.post(`/api/adoptions/${user._id}/invalidPetId`);
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal('error');
    expect(res.body.error).to.equal('Pet not found');
  });

  it('POST /api/adoptions/:uid/:pid → should return error if pet is already adopted', async () => {
    pet.adopted = true;
    await pet.save();

    const res = await request.post(`/api/adoptions/${user._id}/${pet._id}`);
    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal('error');
    expect(res.body.error).to.equal('Pet is already adopted');
  });

  it('GET /api/adoptions → should list all adoptions', async () => {
    await request.post(`/api/adoptions/${user._id}/${pet._id}`);

    const res = await request.get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.payload).to.be.an('array').and.have.length(1);
  });

  it('GET /api/adoptions/:aid → should return a specific adoption', async () => {
    const adoption = await AdoptionModel.create({ owner: user._id, pet: pet._id });

    const res = await request.get(`/api/adoptions/${adoption._id}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.payload).to.have.property('owner', user._id.toString());
  });

  it('GET /api/adoptions/:aid → should return error if adoption is not found', async () => {
    const res = await request.get('/api/adoptions/invalidAdoptionId');
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal('error');
    expect(res.body.error).to.equal('Invalid adoption ID');
  });
});
