const Posts = require('./Posts');
const User = require('./User');

User.hasMany(Posts, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE'
})

Posts.belongsTo(User, {
    foreignKey: 'author_id'
})

module.exports = { User, Posts };
