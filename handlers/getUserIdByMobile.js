const User = require('./models/User');

const getUserIdByMobile = async (event) => {
    const { mobile } = JSON.parse(event.body);

    if (!mobile) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please provide a mobile number' }),
        };
    }

    try {
        const user = await User.findOne({ where: { mobile } });
        if (user) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, data: { userId: user.id } }),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'User not found' }),
            };
        }
    } catch (error) {
        console.error('Error getting user ID by mobile:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database error', details: error.message }),
        };
    }
};

exports.handler = getUserIdByMobile;
