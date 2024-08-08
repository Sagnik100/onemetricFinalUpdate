const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY; 

const userVerification = async (event) => {
    const { email, mobile } = JSON.parse(event.body);

    if (!email || !mobile) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please provide both email and mobile number' }),
        };
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'User not found' }),
            };
        }

        // Check if mobile number is provided and valid
        if (!user.mobile || user.mobile.trim() === '') {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: true, message: 'Please provide a mobile number' }),
            };
        }

        // Check if mobile number already exists
        const existingUser = await User.findOne({ where: { mobile } });

        if (!existingUser) {
            // Mobile number does not exist, add it to the user record
            user.mobile = mobile;
            await user.save();

            // Generate JWT token including mobile number
            const token = jwt.sign({ user_id: user.id, mobile: user.mobile }, secretKey, { expiresIn: '1h' });

            // Log the token
            console.log(`Authorization Token for ${user.mobile}: ${token}`);

            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, message: 'Mobile number added and token generated.', token: token, redirectUrl: '/registration' }),
            };
        } else {
            // Mobile number already exists
            const userData = existingUser;

            // Generate JWT token including mobile number
            const token = jwt.sign({ user_id: userData.id, mobile: user.mobile }, secretKey, { expiresIn: '1h' });

            // Log the token
            console.log(`Authorization Token for ${user.mobile}: ${token}`);

            if (userData.name && userData.email && userData.country_code && userData.address && userData.mobile) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ success: true, message: 'All fields are filled and token generated.', token: token, redirectUrl: '/' }),
                };
            } else {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ success: true, message: 'Not all fields are filled and token generated.', token: token, redirectUrl: '/registration' }),
                };
            }
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database error', details: error.message }),
        };
    }
};

exports.handler = userVerification;
