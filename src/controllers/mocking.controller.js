import { generateMockPets, generateMockUsers } from "../mocks/mocking.js";
import usersService from "../services/usersService.js";
import petsService from "../services/petsService.js";

const generateMockingUsers = async (req, res) => {
    try {
        const users = await generateMockUsers(50);
        const savedUsers = [];

        for (let user of users) {
            const existingUser = await usersService.findByEmail(user.email);
            if (existingUser) {
                console.log(
                    `Email ${user.email} ya está en uso, saltando este usuario.`
                );
                continue;
            }

            const savedUser = await usersService.save(user);
            savedUsers.push(savedUser);
        }

        res.send({ status: "success", users: savedUsers });
    } catch (error) {
        console.error("Error generando usuarios:", error);
        res
            .status(500)
            .send({ status: "error", error: "Failed to generate mock users" });
    }
};

const generateMockingPets = async (req, res) => {
    try {
        const numPets = parseInt(req.query.num) || 100;

        if (isNaN(numPets) || numPets <= 0) {
            return res.status(400).send({
                status: "error",
                error: "El número de mascotas debe ser un entero positivo",
            });
        }

        const mockPets = generateMockPets(numPets);

        await petsService.createMany(mockPets);
        console.log("Mascotas guardadas en la BD");

        res.send({ status: "success", message: `${numPets} mock pets generated` });
    } catch (error) {
        console.error("Error generando mascotas:", error);
        res
            .status(500)
            .send({ status: "error", error: "Failed to generate mock pets" });
    }
};

const generateData = async (req, res) => {
    try {
        const { users, pets } = req.body;

        if (!users || isNaN(users) || users <= 0) {
            return res.status(400).send({
                status: "error",
                error:
                    "Invalid number of users. Please provide a valid positive number.",
            });
        }

        if (!pets || isNaN(pets) || pets <= 0) {
            return res.status(400).send({
                status: "error",
                error:
                    "Invalid number of pets. Please provide a valid positive number.",
            });
        }

        const generatedUsers = await generateMockUsers(parseInt(users));
        const generatedPets = generateMockPets(parseInt(pets));

        const savedUsers = [];
        for (let user of generatedUsers) {
            const existingUser = await usersService.findByEmail(user.email);
            if (existingUser) {
                console.log(
                    `Email ${user.email} ya está en uso, saltando este usuario.`
                );
                continue;
            }

            const savedUser = await usersService.save(user);
            savedUsers.push(savedUser);
        }

        const savedPets = [];
        for (let pet of generatedPets) {
            const savedPet = await petsService.save(pet);
            savedPets.push(savedPet);
        }

        res.send({
            status: "success",
            users: savedUsers,
            pets: savedPets,
        });
    } catch (error) {
        console.error("Error generando usuarios y mascotas:", error);
        res.status(500).send({ status: "error", error: "Failed to generate data" });
    }
};

export default {
    generateMockingUsers,
    generateMockingPets,
    generateData,
};
