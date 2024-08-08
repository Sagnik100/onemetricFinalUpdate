const Stock = require('./models/Stock');

const addStock = async (event) => {
    const { name, symbol, price } = JSON.parse(event.body);

    if (!name || !symbol || !price) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please provide name, symbol, and price' }),
        };
    }

    try {
        const newStock = await Stock.create({
            name,
            symbol,
            price,
        });

        return {
            statusCode: 201,
            body: JSON.stringify({ success: true, message: 'Stock added successfully', data: newStock }),
        };
    } catch (error) {
        console.error('Error adding stock:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database error', details: error.message }),
        };
    }
};

exports.handler = addStock;
