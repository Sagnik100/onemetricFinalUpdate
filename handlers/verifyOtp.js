const { createClient } = require('redis');

// Redis client setup
const client = createClient({
    password: 'Cpi1kCLtrEelHIQT0PbLNlUEU7IgaVwe',
    socket: {
        host: 'redis-15098.c8.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 15098
    }
});

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

const connectToRedis = async () => {
    try {
        await client.connect();
    } catch (error) {
        console.error('Redis Connection Error', error);
    }
};

// Get OTP from Redis
const getOtp = async (mobile) => {
    const otpData = await client.get(mobile);
    if (otpData) {
        return JSON.parse(otpData).otp;
    } else {
        throw new Error('No OTP found for this mobile number');
    }
};

const verifyOtp = async (event) => {
    await connectToRedis();
    
    const { mobile, otp } = JSON.parse(event.body);

    if (!mobile || !otp) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please provide a mobile number and OTP' }),
        };
    }

    try {
        const storedOtp = await getOtp(mobile);
        if (storedOtp === otp) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, message: 'OTP verified successfully' }),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid OTP or OTP expired' }),
            };
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error', details: error.message }),
        };
    }
};

module.exports = { handler: verifyOtp };