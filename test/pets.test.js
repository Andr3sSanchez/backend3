import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'; // Asegúrate de que esta ruta apunte al archivo correcto
import Pet from '../models/pet'; // Ajusta según el nombre del modelo de mascotas

chai.use(chaiHttp);
const { expect } = chai;

describe('Mascotas API', () => {
  before(async () => {
    // Conectamos a la base de datos de pruebas
    await mongoose.connect('mongodb+srv://andressanchez447:jbvXmn9QWK3DDiOS@cluster0.6u1ge.mongodb.net/');
  });

  after(async () => {
    // Limpiar la base de datos después de los tests
    await Pet.deleteMany();
    await mongoose.disconnect();
  });

  it('Debe crear una nueva mascota', async () => {
    const newPet = {
      name: 'Rex',
      breed: 'Labrador',
      age: 3,
    };

    const res = await chai.request(app)
      .post('/api/pets')
      .send(newPet);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('name').eql('Rex');
  });

  it('Debe obtener todas las mascotas', async () => {
    const res = await chai.request(app).get('/api/pets');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('Debe obtener una mascota por ID', async () => {
    const pet = await Pet.create({ name: 'Bella', breed: 'Bulldog', age: 4 });

    const res = await chai.request(app)
      .get(`/api/pets/${pet._id}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id').eql(pet._id.toString());
  });

  it('Debe eliminar una mascota', async () => {
    const pet = await Pet.create({ name: 'Lucky', breed: 'Poodle', age: 2 });

    const res = await chai.request(app)
      .delete(`/api/pets/${pet._id}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message').eql('Mascota eliminada correctamente');
  });
});
