const Stock = require('../models/Stock');
const { Op } = require('sequelize');

const searchStocks = async (event) => {
    const { query } = JSON.parse(event.body);

    if (!query) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please provide a search query' }),
        };
    }

    try {
        const stocks = await Stock.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { symbol: { [Op.like]: `%${query}%` } },
                ],
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, data: stocks }),
        };
    } catch (error) {
        console.error('Error searching stocks:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database error', details: error.message }),
        };
    }
};

exports.handler = searchStocks;
