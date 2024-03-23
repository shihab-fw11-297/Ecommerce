const { modelsDB } = require('../config/db');
const { TryCatch } = require('../middlewares/error');
const ErrorHandler = require("../utils/errorHandler");
const User = modelsDB.users;

const newUser = TryCatch(
    async (req, res, next) => {
        const { name, email, photo, gender, _id, dob,role } = req.body;
        let user = await User.findOne({
            where:{
                email: email
            }
        });

        console.log(user)
        if (user)
            return res.status(200).json({
                success: true,
                message: `Welcome, ${user.name}`,
            });

        if (!_id || !name || !email || !photo || !gender || !dob)
            return next(new ErrorHandler("Please add all fields", 400));

        user = await User.create({
            name,
            email,
            photo,
            gender,
            role,
            _id,
            dob: new Date(dob),
        });

        return res.status(201).json({
            success: true,
            message: `Welcome new, ${user.name}`,
        });
    }
)

const getAllUsers = TryCatch(
    async (req, res, next) => {
        const users = await User.findAll({});

        return res.status(200).json({
            success: true,
            users,
        });
    }
)

const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findOne({
        where:{
            _id: id
        }});

    if (!user) return next(new ErrorHandler("Invalid Id", 400));

    return res.status(200).json({
        success: true,
        user,
    });
}
)

const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findOne({
        where:{
            _id: id
        }});

    if (!user) return next(new ErrorHandler("Invalid Id", 400));

    await user.deleteOne();

    return res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
}
)

module.exports = { newUser, getAllUsers, getUser, deleteUser };
