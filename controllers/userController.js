const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const { response } = require("express");


const registerUser = asyncHandler(
    async (req, res,) => {
        const { name, email, password, pic } = req.body;

        const userExist = await User.findOne({ email })

        if (userExist) {
            res.status(400)
            throw new Error
                ('user allready existssssss')

        }


        const user = await User.create({ name, email, password, pic })


        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: generateToken(user._id)
                ,
            })



        } else {
            res.status(400)
            throw new Error("error occured")

        }

    }
)

const authUser = asyncHandler(
    async (req, res,) => {
        const { email, password } = req.body;
        console.log(email, password , 'nmnm');

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error("Invalid Email or Password!")

        }



    }
)
const updateUser = asyncHandler(async (req, res) => {
    const { email, name, pic, password } = req.body
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        user.pic = pic || user.pic

        if (req.body.password) {
            user.password = password
        }
        
        const updateUser = await user.save()
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            pic: updateUser.pic,
            token: generateToken(updateUser._id),
        })
    }else{
        response.status(404);
        throw new Error("user not found ")
    }
        
})
module.exports = { registerUser, authUser, updateUser }
