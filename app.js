const express      = require('express'),
      exhbs        = require('express-handlebars'),
      bodyParser   = require('body-parser'),
      mysql        = require('mysql'),
      connectionPv = require('connection-provider'),
      compression  = require('compression'),
      co           = require('co'),
      app          = express();

const dbOptions = {
    host: 'localhost',
    user: 'admin',
    password: 'password',
    port: 3306,
    database: 'data'
};
const data = require('./routes/data');
const UserService = require('./userService');
const serviceSetupCallBack = function(connection) {
    return {
        userService = new UserService(connection)
    }
};
app.use(connectionPv(dbOptions, serviceSetupCallBack));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.engine('handlebars', exhbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

app.get('/', data.show);

const port = process.env.PORT || 2016;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
