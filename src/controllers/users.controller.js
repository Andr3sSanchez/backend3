import { usersService } from "../services/index.js";
import path from 'path';

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.send({ status: "success", payload: users });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Failed to fetch users" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).send({ status: "error", error: "User not found" });
    }
    res.send({ status: "success", payload: user });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Failed to fetch user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).send({ status: "error", error: "User not found" });
    }
    await usersService.update(userId, updateBody);
    res.send({ status: "success", message: "User updated" });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).send({ status: "error", error: "User not found" });
    }
    await usersService.delete(userId);
    res.send({ status: "success", message: "User deleted" });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Failed to delete user" });
  }
};

const uploadDocuments = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersService.getUserById(userId);
  if (!user) {
    return res.status(404).send({ status: "error", error: "User not found" });
  }

  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send({ status: "error", error: "No files uploaded" });
  }

  const docs = files.map(file => ({
    name: file.originalname,
    reference: `/public/${req.query.type === 'pet' ? 'pets' : 'documents'}/${file.filename}`
  }));

  user.documents.push(...docs);
  await user.save();

  res.send({ status: "success", message: "Documents uploaded", documents: user.documents });
};

export default {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  uploadDocuments
};
