const jwt = require('jsonwebtoken');
require('dotenv').config();

const protectedRoute = async (event) => {
    const token = event.headers.Authorization;

    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Unauthorized access. Token required.' }),
        };
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Access granted', user: decoded }),
        };
    } catch (error) {
        console.error('Error verifying token:', error);
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Invalid or expired token' }),
        };
    }
};

exports.handler = protectedRoute;
