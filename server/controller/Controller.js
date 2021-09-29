var sortAndSendService = require('../services/sortAndSendService.js');
var insertDataService = require('../services/insertDataService.js')
class Controller {
    static  handleGetRequest(req, res) {
        var userData = req.body;
        var response =  sortAndSendService.sendUnscheduledHours(userData);
        res.send(response);
    };
    static handleInsert(req,res){
        var userData=req.body;
        var response = insertDataService.insertScheduledTime(userData);
        res.send(response);
    }
}
module.exports=Controller;