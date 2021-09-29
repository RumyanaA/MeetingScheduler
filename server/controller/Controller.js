var Service = require('./../services/Service.js');
class Controller {
    static  getUnscheduledHours(req, res) {
        var userData = req.body;
        var response =  Service.sendUnscheduledHours(userData);
        res.send(response);
    };
}
module.exports=Controller;