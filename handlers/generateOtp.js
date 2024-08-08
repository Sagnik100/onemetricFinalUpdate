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

// Generate OTP function
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Store OTP in Redis
const setOtp = async (mobile, otp) => {
    await client.set(mobile, JSON.stringify({ otp, timestamp: Date.now() }));
};

// Handler function for generating OTP
const generateOtp = async (event) => {
    await connectToRedis();
    
    const { mobile } = JSON.parse(event.body);

    if (!mobile) {
        return {
            statusCode: 400,
            headers: { 'Authorization-Status': 'true' },
            body: JSON.stringify({ error: 'Please provide a mobile number' }),
        };
    }

    try {
        const otp = generateOTP();
        await setOtp(mobile, otp); // Use Redis to set OTP

        // Simulate sending OTP to user
        console.log(`OTP for ${mobile}: ${otp}`);

        return {
            statusCode: 200,
            headers: { 'Authorization-Status': 'true' },
            body: JSON.stringify({ success: true, message: 'OTP generated successfully', otp }),
        };
    } catch (error) {
        console.error('Error generating OTP:', error);
        return {
            statusCode: 500,
            headers: { 'Authorization-Status': 'true' },
            body: JSON.stringify({ error: 'Internal server error', details: error.message }),
        };
    }
};

// Export the handler function
module.exports = { handler: generateOtp };
