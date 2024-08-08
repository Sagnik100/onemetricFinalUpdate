const User = require('./models/User');

const createUsers = async (event) => {
    const users = JSON.parse(event.body);

    if (!Array.isArray(users) || users.length === 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please provide a list of users' }),
        };
    }

    try {
        const newUsers = await User.bulkCreate(users);

        return {
            statusCode: 201,
            body: JSON.stringify({ success: true, message: 'Users created successfully', data: newUsers }),
        };
    } catch (error) {
        console.error('Error creating users:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database error', details: error.message }),
        };
    }
};

exports.handler = createUsers;
