import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

// register the user

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            sport,
        } = req.body;
        //salts the passwords
        const salt = await bcrypt.genSalt();
        //hashes password for security 
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password: passwordHash,
            picturePath, 
            friends, 
            location, 
            sport,
            viewedProfile: Math.floor(Math.random() * 500),
            impressions: Math.floor(Math.random() * 500)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

//logging in
//most likely a third party will be doing this. 
//this is a small mock version
export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        //try to find the user with that specific email
        const user = await User.findOne({email: email})
        //if user does not exists, we send an error to the front end
        if(!user) return res.status(400).json({msg: "This user does not exist in database. "})
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Credentials don't match."})

        const token = jwt.sign({ id: user._id} , process.env.JWT_SECRET)
        //once we log in, delete password so it is not visible on front end
        delete user.password;
        res.status(200).json({ token, user})

    } catch(error) {
        res.status(500).json({error: error.message})
    }
}