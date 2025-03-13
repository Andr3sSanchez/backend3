import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js";
import __dirname from "../utils/index.js";
import CustomError from '../utils/customError.js'; // Asegúrate de tener el CustomError

const getAllPets = async (req, res, next) => {
  try {
    const pets = await petsService.getAll();
    res.send({ status: "success", payload: pets });
  } catch (error) {
    next(error); // Pasa el error al manejador global
  }
};

const createPet = async (req, res, next) => {
  try {
    const { name, specie, birthDate } = req.body;

    // Validación de los campos requeridos
    if (!name || !specie || !birthDate) {
      throw new CustomError(400, "Incomplete values"); // Usando CustomError para manejar el error
    }

    // Crear la mascota usando el DTO
    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
    const result = await petsService.create(pet);

    res.send({ status: "success", payload: result });
  } catch (error) {
    next(error); // Pasa el error al manejador global
  }
};

const updatePet = async (req, res, next) => {
  try {
    const petUpdateBody = req.body;
    const petId = req.params.pid;

    const result = await petsService.update(petId, petUpdateBody);

    if (!result) {
      throw new CustomError(404, "Pet not found"); // Si no se encuentra la mascota, lanzar un error
    }

    res.send({ status: "success", message: "Pet updated" });
  } catch (error) {
    next(error); // Pasa el error al manejador global
  }
};

const deletePet = async (req, res, next) => {
  try {
    const petId = req.params.pid;
    const result = await petsService.delete(petId);

    if (!result) {
      throw new CustomError(404, "Pet not found"); // Si no se encuentra la mascota, lanzar un error
    }

    res.send({ status: "success", message: "Pet deleted" });
  } catch (error) {
    next(error); // Pasa el error al manejador global
  }
};

const createPetWithImage = async (req, res, next) => {
  try {
    const file = req.file;
    const { name, specie, birthDate } = req.body;

    // Validación de los campos requeridos
    if (!name || !specie || !birthDate) {
      throw new CustomError(400, "Incomplete values");
    }

    // Crear la mascota con la imagen y los datos
    const pet = PetDTO.getPetInputFrom({
      name,
      specie,
      birthDate,
      image: `${__dirname}/../public/img/${file.filename}`,
    });

    const result = await petsService.create(pet);
    res.send({ status: "success", payload: result });
  } catch (error) {
    next(error); // Pasa el error al manejador global
  }
};

export default {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage,
};
