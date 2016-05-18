const assert = require('assert');
const mysql = require('mysql');
const co = require('co');
const password = process.env.MYSQL_PWD !== null ? process.env.MYSQL_PWD : 'passw0rd';
const UserService = require('../data-services/userService');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: password,
    port: 3306,
    database: 'travis_db'
});

connection.connect();
const userService = new UserService(connection)

describe('testing co module', function() {
    it('should return a list of users', function(done) {
        co(function*() {
            try {
                var users = yield userService.findAllUsers();
                assert(users);
                done();
            } catch (err) {
                next(err);
            }
        })
    });
});
