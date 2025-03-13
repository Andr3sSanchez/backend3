import { faker } from '@faker-js/faker';

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

export { generateMockPets };
