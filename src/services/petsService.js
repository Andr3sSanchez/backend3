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

const getById = async (id) => {
    try {
        return await petModel.findById(id);
    } catch (error) {
        console.error('Error fetching pet by ID:', error);
        throw new Error('Error fetching pet');
    }
};

const getAll = async () => {
    return await petModel.find();
};

const update = async (id, updateData) => {
    return await petModel.findByIdAndUpdate(id, updateData, { new: true });
};

const remove = async (id) => {
    return await petModel.findByIdAndDelete(id);
};

export default {
    save,
    createMany,
    getById,
    getAll,
    update,
    delete: remove,
};
