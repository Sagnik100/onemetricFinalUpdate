const Stock = require('./models/Stock');

const deleteStock = async (event) => {
    const { id } = JSON.parse(event.body);

    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please provide the stock ID' }),
        };
    }

    try {
        const result = await Stock.destroy({ where: { id } });

        if (result) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, message: 'Stock deleted successfully' }),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Stock not found' }),
            };
        }
    } catch (error) {
        console.error('Error deleting stock:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database error', details: error.message }),
        };
    }
};

exports.handler = deleteStock;
