const Stock = require('../models/Stock');

const getStocks = async () => {
    try {
        const stocks = await Stock.findAll();
        return {
            statusCode: 200, // OK status code
            headers: {
                'Authorization-Status': 'true',
            },
            body: JSON.stringify({ success: true, data: stocks, message: 'Stocks retrieved successfully' }),
        };
    } catch (error) {
        console.error('Error fetching stocks:', error);
        return {
            statusCode: 500, // Internal Server Error status code
            headers: {
                'Authorization-Status': 'false',
                'Error': 'Database error',
            },
            body: JSON.stringify({ error: true, message: 'Database error', details: error.message }),
        };
    }
};

exports.handler = getStocks;
