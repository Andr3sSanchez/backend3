import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const generateMockPets = (numPets) => {
    const pets = [];
    for (let i = 0; i < numPets; i++) {
        pets.push({
            name: faker.animal.dog(),
            specie: faker.animal.type(),
            birthDate: faker.date.past(5),
            adopted: false,
            owner: null,
        });
    }
    return pets;
};

const generateMockUsers = async (numUsers) => {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        const role = Math.random() > 0.5 ? 'user' : 'admin';
        const password = await bcrypt.hash('coder123', 10);
        const user = {
            first_name: `User${i}`,
            last_name: `Lastname${i}`,
            email: faker.internet.email(),
            password,
            role,
            pets: [],
        };
        users.push(user);
    }
    return users;
};

export { generateMockPets, generateMockUsers };
