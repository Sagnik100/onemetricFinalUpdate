// checkMobile.js
const User = require('../models/User');

const checkMobile = async (event) => {
  const { mobile } = JSON.parse(event.body);

  if (!mobile) {
    return {
      statusCode: 400, // Bad Request status code
      body: JSON.stringify({ error: 'Please provide a mobile number' }),
    };
  }

  try {
    const user = await User.findOne({ where: { mobile } });
    if (user) {
      return {
        statusCode: 200, // OK status code
        body: JSON.stringify({ success: true, message: 'Mobile number exists', data: user, redirect:'/otpverify' }),
      };
    } else {
      return {
        statusCode: 404, // Not Found status code
        body: JSON.stringify({ error: 'Mobile number not found' }),
      };
    }
  } catch (error) {
    console.error('Error checking mobile number:', error);
    return {
      statusCode: 500, // Internal Server Error status code
      body: JSON.stringify({ error: 'Database error', details: error.message }),
    };
  }
};

exports.handler = checkMobile;
