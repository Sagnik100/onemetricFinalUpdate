// getNews.js
const News = require('../models/News');
const sequelize = require('../utils/sequelize'); // Assuming sequelize instance is exported from this path

const getNews = async () => {
    try {
        console.log('Starting getNews function');

        // Check database connectivity
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        // Fetch news
        const news = await News.findAll({
            limit: 100, // Limit the number of records returned
            order: [['created_at', 'DESC']] // Example: order by creation date
        });

        console.log(`News retrieved: ${news.length} records found`);
        return {
            statusCode: 200,
            headers: { 'Authorization-Status': 'true' },
            body: JSON.stringify({ success: true, data: news, message: 'News retrieved successfully' }),
        };
    } catch (error) {
        console.error('Error fetching news:', error);
        return {
            statusCode: 500,
            headers: { 'Authorization-Status': 'false', 'Error': 'Internal server error' },
            body: JSON.stringify({ error: 'Database error', details: error.message }),
        };
    }
};

exports.handler = getNews;
