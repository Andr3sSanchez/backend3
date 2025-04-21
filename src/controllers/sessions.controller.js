import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import logger from '../config/logger.js';

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!first_name) return res.status(400).send({ status: "error", error: "First name is required" });
        if (!last_name) return res.status(400).send({ status: "error", error: "Last name is required" });
        if (!email) return res.status(400).send({ status: "error", error: "Email is required" });
        if (!password) return res.status(400).send({ status: "error", error: "Password is required" });

        const exists = await usersService.getUserByEmail(email);
        if (exists) {
            logger.warn(`Intento de registro con email ya existente: ${email}`);
            return res.status(400).send({ status: "error", error: "User already exists" });
        }

        const hashedPassword = await createHash(password);

        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        };

        const result = await usersService.create(user);
        logger.info(`Usuario registrado exitosamente: ${email}`);

        res.status(200).send({ status: "success", payload: result._id });
    } catch (error) {
        logger.error(`Error en registro: ${error.message}`);
        res.status(500).send({ status: "error", error: "An unexpected error occurred" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ status: "error", error: "Email is required" });
    if (!password) return res.status(400).send({ status: "error", error: "Password is required" });

    try {
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            logger.warn(`Intento de login con email no registrado: ${email}`);
            return res.status(404).send({ status: "error", error: "User doesn't exist" });
        }

        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            logger.warn(`Contraseña incorrecta en login para usuario: ${email}`);
            return res.status(400).send({ status: "error", error: "Incorrect password" });
        }

        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });

        user.last_connection = new Date();
        await user.save();

        logger.info(`Login exitoso: ${email}`);
        res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Logged in" });
    } catch (error) {
        logger.error(`Error en login: ${error.message}`);
        res.status(500).send({ status: "error", error: "Login failed" });
    }
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

const logout = async (req, res) => {
    try {
        const cookie = req.cookies['coderCookie'];
        const decoded = jwt.verify(cookie, 'tokenSecretJWT');
        const user = await usersService.getUserByEmail(decoded.email);
        if (user) {
            user.last_connection = new Date();
            await user.save();
            logger.info(`Logout exitoso: ${decoded.email}`);
        }
        res.clearCookie('coderCookie').send({ status: "success", message: "Logged out" });
    } catch (error) {
        logger.error(`Error en logout: ${error.message}`);
        res.status(500).send({ status: "error", error: "Logout failed" });
    }
};

export default {
    current,
    login,
    register,
    unprotectedLogin,
    unprotectedCurrent,
    logout
};
