const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
require('dotenv').config();

const News = sequelize.define('News', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    news_id: {
        type: DataTypes.STRING(36),
        unique: true,
        allowNull: false,
    },
    scrip_cd: {
        type: DataTypes.STRING(255),
    },
    news_sub: {
        type: DataTypes.STRING(255),
    },
    news_date_time: {
        type: DataTypes.DATE(3),
    },
    critical_news: {
        type: DataTypes.TINYINT,
    },
    announcement_type: {
        type: DataTypes.CHAR(1),
    },
    attachment_name: {
        type: DataTypes.STRING(255),
    },
    headline: {
        type: DataTypes.STRING(255),
    },
    category_name: {
        type: DataTypes.STRING(255),
    },
    pdf_flag: {
        type: DataTypes.TINYINT,
    },
    stock_long_name: {
        type: DataTypes.STRING(255),
    },
    agenda_id: {
        type: DataTypes.BIGINT,
    },
    news_submission_date_time: {
        type: DataTypes.DATE(3),
    },
    dissem_date_time: {
        type: DataTypes.DATE(3),
    },
    sub_category_name: {
        type: DataTypes.STRING(255),
    },
    attachment_id: {
        type: DataTypes.STRING(255),
    },
    more_details: {
        type: DataTypes.TEXT,
    },
    sub_category_id: {
        type: DataTypes.STRING(255),
    },
    created_at: {
        type: DataTypes.DATE(3),
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE(3),
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'bse_news',
});

module.exports = News;