var QueryService = require('./query-service');
module.exports = function(connection) {
    const queryService = new QueryService(connection);

    this.findAllUsers = function() {
        return queryService.executeQuery('select * from users');
    };
};
};
