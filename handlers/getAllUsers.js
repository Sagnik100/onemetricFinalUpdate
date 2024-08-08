const User = require('./models/User');

const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, data: users, message: 'Users retrieved successfully' }),
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database error', details: error.message }),
        };
    }
};

exports.handler = getAllUsers;
