import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'; // Asegúrate de que esta ruta apunte al archivo correcto
import mongoose from 'mongoose';
import User from '../models/user'; // Ajusta según el nombre del modelo de usuario

chai.use(chaiHttp);
const { expect } = chai;

describe('Usuarios API', () => {
  before(async () => {
    // Conectamos a la base de datos de pruebas
    await mongoose.connect('mongodb+srv://andressanchez447:jbvXmn9QWK3DDiOS@cluster0.6u1ge.mongodb.net/');
  });

  after(async () => {
    // Limpiar la base de datos después de los tests
    await User.deleteMany();
    await mongoose.disconnect();
  });

  it('Debe crear un nuevo usuario', async () => {
    const newUser = {
      email: 'test@example.com',
      password: 'password123',
    };

    const res = await chai.request(app)
      .post('/api/sessions/register') // Ajusta según tu ruta
      .send(newUser);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message').eql('Usuario creado correctamente');
  });

  it('Debe obtener todos los usuarios', async () => {
    const res = await chai.request(app).get('/api/users');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('Debe obtener un usuario por ID', async () => {
    const user = await User.create({ email: 'findme@example.com', password: 'password123' });

    const res = await chai.request(app)
      .get(`/api/users/${user._id}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id').eql(user._id.toString());
  });

  it('Debe eliminar un usuario', async () => {
    const user = await User.create({ email: 'delete@example.com', password: 'password123' });

    const res = await chai.request(app)
      .delete(`/api/users/${user._id}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message').eql('Usuario eliminado correctamente');
  });
});
