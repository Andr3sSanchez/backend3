import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Validación de campos requeridos
        if (!first_name) return res.status(400).send({ status: "error", error: "First name is required" });
        if (!last_name) return res.status(400).send({ status: "error", error: "Last name is required" });
        if (!email) return res.status(400).send({ status: "error", error: "Email is required" });
        if (!password) return res.status(400).send({ status: "error", error: "Password is required" });

        // Verificar si el usuario ya existe
        const exists = await usersService.getUserByEmail(email);
        if (exists) return res.status(400).send({ status: "error", error: "User already exists" });

        // Encriptar contraseña
        const hashedPassword = await createHash(password);

        // Crear el objeto de usuario
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        };

        // Crear el usuario en la base de datos
        let result = await usersService.create(user);
        console.log(result);
        
        // Enviar la respuesta
        res.status(200).send({ status: "success", payload: result._id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "An unexpected error occurred" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validación de campos requeridos
    if (!email) return res.status(400).send({ status: "error", error: "Email is required" });
    if (!password) return res.status(400).send({ status: "error", error: "Password is required" });

    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });

    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });

    const userDto = UserDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });

    res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Logged in" });
    user.last_connection = new Date();
await user.save();

};

const current = async (req, res) => {
    const cookie = req.cookies['coderCookie'];
    const user = jwt.verify(cookie, 'tokenSecretJWT');
    if (user) {
        return res.send({ status: "success", payload: user });
    } else {
        return res.status(401).send({ status: "error", error: "User not authenticated" });
    }
};

const unprotectedLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ status: "error", error: "Email is required" });
    if (!password) return res.status(400).send({ status: "error", error: "Password is required" });

    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });

    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });

    const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: "1h" });
    res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Unprotected Logged in" });
};

const unprotectedCurrent = async (req, res) => {
    const cookie = req.cookies['unprotectedCookie'];
    const user = jwt.verify(cookie, 'tokenSecretJWT');
    if (user) {
        return res.send({ status: "success", payload: user });
    } else {
        return res.status(401).send({ status: "error", error: "User not authenticated" });
    }
};

export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent
};
