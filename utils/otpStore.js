// otpStore.js
const { createClient } = require('redis');

// Create Redis client
const client = createClient({
    password: 'Cpi1kCLtrEelHIQT0PbLNlUEU7IgaVwe',
    socket: {
        host: 'redis-15098.c8.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 15098
    }
});

// Connect to Redis
client.connect().catch(console.error);

const setOtp = async (mobile, otp) => {
    const timestamp = Date.now();
    await client.set(mobile, JSON.stringify({ otp, timestamp }), {
        EX: 5 * 60 // Expire after 5 minutes
    });
};

const getOtp = async (mobile) => {
    try {
        const data = await client.get(mobile);
        if (data) {
            const { otp, timestamp } = JSON.parse(data);
            if (Date.now() - timestamp < 5 * 60 * 1000) {
                return otp;
            } else {
                // OTP expired
                await client.del(mobile);
            }
        }
        return null;
    } catch (error) {
        console.error('Error getting OTP:', error);
        return null;
    }
};

module.exports = { setOtp, getOtp };
