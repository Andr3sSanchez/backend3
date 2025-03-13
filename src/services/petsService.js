import petModel from '../dao/models/Pet.js';

const createMany = async (pets) => {
    return await petModel.insertMany(pets);
};


const save = async (pet) => {
    try {
        const newPet = new petModel(pet);
        await newPet.save();
        return newPet;
    } catch (error) {
        console.error('Error saving pet:', error);
        throw new Error('Error saving pet');
    }
};

export default {
    save,
    createMany,
};
