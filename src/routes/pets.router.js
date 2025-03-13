import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

// Obtener todas las mascotas
router.get('/', petsController.getAllPets);

// Crear una nueva mascota
router.post('/', petsController.createPet);

// Crear una mascota con imagen
router.post('/withimage', uploader.single('image'), petsController.createPetWithImage);

// Actualizar una mascota existente
router.put('/:pid', petsController.updatePet);

// Eliminar una mascota
router.delete('/:pid', petsController.deletePet);

export default router;
