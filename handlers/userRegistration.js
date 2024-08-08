const User = require('./models/User');

const userRegistration = async (event) => {
    const { fullname, email, countrycode, mobile } = JSON.parse(event.body);

    if (!fullname || !email || !countrycode || !mobile) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please provide fullname, email, mobile, and countrycode' }),
        };
    }

    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'User already exists with this email' }),
            };
        }

        const newUser = await User.create({
            name: fullname,
            email,
            country_code: countrycode,
            mobile,
            created_at: new Date(), // Explicitly setting created_at
        });

        return {
            statusCode: 201,
            body: JSON.stringify({ success: true, message: 'User registered successfully', data: newUser }),
        };
    } catch (error) {
        console.error('Error registering user:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database error', details: error.message }),
        };
    }
};

exports.handler = userRegistration;
