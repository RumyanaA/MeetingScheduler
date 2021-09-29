var FileService = require('./FileService');
module.exports = class UserService {
    static sendUnscheduledHours(userData) {
        var userCapacity = userData.capacity;
        var filteredByCapacity = [];
        var availableRoomsAndHours = [];
        var file = FileService.readFromFile();
        file.forEach((room) => {
            if (room.capacity == userCapacity || room.capacity > userCapacity) {
                filteredByCapacity.push(room)
            }
        })
        function getFreeRoomsAndHours(availableRoomsAndHours, filteredByCapacity) {
            if (filteredByCapacity.length == 0) {
                return availableRoomsAndHours;
            } else {
                var Room = {
                    name: filteredByCapacity[0].roomName,
                    availableHours: []
                }
                var scheduleArr = filteredByCapacity[0].schedule;
                var duration = userData.duration
                var userDate = new Date(userData.from);
                var starthour = filteredByCapacity[0].availableFrom;
                var endhour = filteredByCapacity[0].availableTo;
                var hourMinutesArray = starthour.split(':');
                var endhourMinutesArray = endhour.split(':');
                var h = hourMinutesArray[0];
                var min = hourMinutesArray[1];
                var endh = endhourMinutesArray[0];
                var endmin = endhourMinutesArray[1];
                var taskFrom = new Date(userDate.setHours(h, min));
                var taskUntil = new Date(userDate.setHours(endh, endmin));
                var i;
                var mins = parseInt(min)
                do {
                    var isFree = false;
                    i = new Date(taskFrom.setHours(h, mins))
                    var obj = {
                        from: i,
                        to: new Date(i.getTime() + duration * 60000)
                    }
                    for (var k = 0; k < scheduleArr.length; k++) {
                        if (!((obj.from.getTime() >= new Date(scheduleArr[k].to).getTime()) == false && (obj.to.getTime() <= new Date(scheduleArr[k].from).getTime() == false))) {
                            isFree = true;
                        } else {
                            isFree = false;
                            break;
                        }
                    }
                    if (isFree) {
                        Room.availableHours.push(obj);
                    }
                    mins += 15
                } while (new Date(i.getTime() + duration * 60000) < taskUntil)
                availableRoomsAndHours.push(Room)
                filteredByCapacity.splice(0, 1)
                return (getFreeRoomsAndHours(availableRoomsAndHours, filteredByCapacity))
            }
        }
        var result = getFreeRoomsAndHours(availableRoomsAndHours, filteredByCapacity)
        return result;
    }
}