const co = require('co');
exports.showData = function(req, res, next) {
co(function* (){
    try{
        var users = yield userService.findAllUsers();
        res.render('index',users);
    }
    catch(err){
        next(err);
    };
});
};
