import { Router } from 'express';
import { generateMockPets } from '../mocks/mocking.js';
import petsService from '../services/petsService.js';

const router = Router();

router.get('/mockingpets', async (req, res) => {
  try {
    const numPets = parseInt(req.query.num) || 100;
    if (isNaN(numPets) || numPets <= 0) {
        return res.status(400).send({
          status: 'error',
          error: 'Invalid number of pets. Please provide a positive number.',
        });
      }
    const mockPets = generateMockPets(numPets);
    
    
    await petsService.createMany(mockPets);  

    res.send({ status: 'success', message: `${numPets} mock pets generated` });
  } catch (error) {
    res.status(500).send({ status: 'error', error: 'Failed to generate mock pets' });
  }
});

export default router;
