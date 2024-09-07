const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helper/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json("test is working");
};

//Register Endpoint
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check if name was entered
        if (!name) {
            return res.json({
                error: 'name is required'
            });
        }

        //check for password and if its good
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be atleast 6 characters long'
            });
        }

        //check if email is already registered
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({
                error: 'Email is already in use'
            });
        }

        const hashedPassword = await hashPassword(password);
        //Creat user in database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(200).json(user);

    } catch (err) {
        console.log(err);
    }
};

//Login Endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            });
        }

        //Check if passwords match
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                    name: user.name,
                    role : user.role,
                },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(user);
                },
            )
        } else {
            res.json({
                error: 'Password does not match',
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err,
        });
    }
};

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

//verifying the user
const verifyUser = (req, res) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            return res.json({
                success: false,
                error: "No token found",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({
            success: true, 
            message : "authorized", 
            user : decoded,
        });

    } catch (err) {
        return res.json({
            success : false,
            error : err,
        });
    }
};

//verifying if user is admin
const verifyAdmin = (req, res, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            return res.json({
                success: false,
                error: "No token found",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role === 'admin'){
            res.json({
                success : true,
                user : decoded,
            })
        } else {
            res.json({
                success : false,
                error : "User is not an admin",
            })
        }

    } catch (err) {
        return res.json({
            success : false,
            error : err,
        });
    }
};

//Logging out functionality
const logoutUser = (req, res) => {
    res.clearCookie('token');
    return res.json({success : true});
} 

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    verifyUser,
    logoutUser,
    verifyAdmin,
}