var FileService = require('./FileService');
module.exports=class insertService{
    static insertScheduledTime(userData){
        var selectedRoomName=userData.pickedRoom;
        var selectedTimes=userData.pickedTime;
        var file = FileService.readFromFile();
        file.forEach((item)=>{
            if(item.roomName==selectedRoomName){
                item.schedule.push(selectedTimes)
            }
        })
        
        FileService.writeFile(file)

    }
}