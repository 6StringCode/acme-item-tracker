const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/the_acme_item_tracker_db');

const { STRING, INTEGER, VIRTUAL } = Sequelize;

const User = conn.define('user', {
  name: {
    type: STRING 
  }
});

const Thing = conn.define('thing', {
  name: {
    type: STRING 
  },
  ranking: {
    type: INTEGER,
    defaultValue: 1
  },
  highRanked: {
    type: VIRTUAL,
    get: function(){
      return this.ranking > 5;
    }
  }
});

Thing.belongsTo(User);

module.exports = {
  conn,
  User,
  Thing
};
