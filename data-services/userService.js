var QueryService = require('./queryService');
module.exports = function(connection) {
    const queryService = new QueryService(connection);

    this.findAllUsers = function() {
        return queryService.executeQuery('select * from users');
    };
};
