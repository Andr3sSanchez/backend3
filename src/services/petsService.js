import Pet from '../dao/models/Pet.js'; 

const createPet = async (name, type) => {
  const pet = new Pet({
    name,
    type,
    adopted: false, // Las mascotas nuevas no están adoptadas
  });

  await pet.save();
  return pet;
};

const createMany = async (pets) => {
    try {
      // Inserta varias mascotas en la base de datos
      const result = await Pet.insertMany(pets);
      return result;
    } catch (error) {
      throw new Error('Error al insertar las mascotas');
    }
  };

const getAllPets = async (limit = 10, skip = 0) => {
  return await Pet.find().skip(skip).limit(limit);
};

const getPetById = async (id) => {
  return await Pet.findById(id);
};

const updatePet = async (id, data) => {
  return await Pet.findByIdAndUpdate(id, data, { new: true });
};

const deletePet = async (id) => {
  return await Pet.findByIdAndDelete(id);
};

export default {
  createPet,
  createMany,
  getAllPets,
  getPetById,
  updatePet,
  deletePet,
};
