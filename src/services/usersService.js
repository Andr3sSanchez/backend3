import User from '../dao/models/User.js';

const save = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
};

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

export default {
    save,
    findByEmail,
};
