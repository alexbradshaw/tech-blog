const Posts = require('./Posts');
const User = require('./User');

User.hasMany(Posts, {
    foreignKey: 'id',
    as: 'User_Posts'
})

Posts.belongsTo(User, {
    as: 'User_Posts'
})

module.exports = { User };
