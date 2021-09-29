const fs = require('fs')
class FileService {
    static readFromFile() {
        try {
            const str = fs.readFileSync('C:\\Users\\rumya\\Desktop\\meetingScheduler\\MeetingScheduler\\server\\config\\Room Scheduled_JSON file.txt', 'utf8')
            var data = str.replace(/\s/g, "");
            var parsedData = JSON.parse(data);
            return parsedData;
        } catch (err) {
            console.error(err)
        }
    }
    static writeFile(file){
        try {
            var StringifiedData=JSON.stringify(file);
            fs.writeFileSync('C:\\Users\\rumya\\Desktop\\meetingScheduler\\MeetingScheduler\\server\\config\\Room Scheduled_JSON file.txt', StringifiedData)
           
          } catch (err) {
            console.error(err)
          }
    }
}
module.exports = FileService