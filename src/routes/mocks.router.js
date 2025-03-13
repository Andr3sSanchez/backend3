import { Router } from 'express';
import mockingController from '../controllers/mocking.controller.js';

const router = Router();

router.get('/mockingpets', mockingController.generateMockingPets);

router.get('/mockingusers', mockingController.generateMockingUsers);

router.post('/generateData', mockingController.generateData);

export default router;
