import bcrypt from 'bcrypt';
import { usersService } from "../services/index.js";
import UserDTO from "../dto/User.dto.js";

// Módulo para generar usuarios de manera mockeada
const generateMockingUsers = async (req, res) => {
    const users = [];
    
    // Generar 50 usuarios mockeados
    for (let i = 0; i < 50; i++) {
        const role = Math.random() > 0.5 ? 'user' : 'admin';
        const password = await bcrypt.hash('coder123', 10); // Encriptando la contraseña

        const user = {
            first_name: `User${i}`,
            last_name: `Lastname${i}`,
            email: `user${i}@example.com`,
            password,
            role,
            pets: [],
        };

        // Guardamos el usuario en la base de datos
        const result = await usersService.save(user);
        users.push(result);
    }

    res.send({ status: 'success', payload: users });
};

// Endpoint para generar datos personalizados
const generateData = async (req, res) => {
    const { users, pets } = req.body;

    const generatedUsers = [];
    for (let i = 0; i < users; i++) {
        const password = await bcrypt.hash('coder123', 10);
        const role = Math.random() > 0.5 ? 'user' : 'admin';

        const user = {
            first_name: `GeneratedUser${i}`,
            last_name: `GeneratedLastname${i}`,
            email: `generateduser${i}@example.com`,
            password,
            role,
            pets: [],
        };

        const result = await usersService.save(user);
        generatedUsers.push(result);
    }

    const generatedPets = [];
    for (let i = 0; i < pets; i++) {
        const pet = {
            name: `GeneratedPet${i}`,
            specie: 'Dog',
            birthDate: new Date(),
            adopted: false,
        };

        const result = await petsService.save(pet);
        generatedPets.push(result);
    }

    res.send({ status: 'success', users: generatedUsers, pets: generatedPets });
};

export default {
    generateMockingUsers,
    generateData,
};
