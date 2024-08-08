const User = require('./User');
const Plan = require('./Plan');
const RegisteredUserPlan = require('./RegisteredUserPlan');
const Transaction = require('./Transaction');
const Stock = require('./Stock');
const Otp = require('./Otp');
const News = require('./News');

// Define associations
Transaction.belongsTo(Plan, { foreignKey: 'plan_id' });
Transaction.hasOne(RegisteredUserPlan, { foreignKey: 'transaction_id' });

// Export models
module.exports = {
  User,
  Plan,
  RegisteredUserPlan,
  Transaction,
  News,
  Stock,
  Otp
};


