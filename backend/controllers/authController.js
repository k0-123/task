import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};


export const registerUser = async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {

        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('Register attempt: email already taken:', email);
            return res.status(400).json({ msg: 'That email is already in our system' });
        }


        const user = await User.create({
            fullName,
            email,
            password,
            role: role || 'User'
        });

        if (user) {
            console.log('New user created successfully:', user.email);
            res.status(201).json({
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                },
                token: createToken(user._id)
            });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ msg: 'Server error while registering user' });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ msg: 'No user found with that email' });
        }


        const isMatch = await user.checkPassword(password);

        if (isMatch) {
            console.log('Login success for:', user.email);
            res.json({
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                },
                token: createToken(user._id)
            });
        } else {
            res.status(401).json({ msg: 'Wrong password, please try again' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Server error during login' });
    }
};


export const getMyProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ msg: 'User not found in DB' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch profile' });
    }
};
