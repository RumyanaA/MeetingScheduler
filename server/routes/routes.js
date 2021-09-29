const express = require('express');
const router = express.Router();
const Controller = require('./../controller/Controller');
// router.post('/ResetPassword', userController.generatePassword);
router.post('/getUnscheduledHours',Controller.handleGetRequest);
router.post('/insertScheduledTime',Controller.handleInsert);
module.exports=router;