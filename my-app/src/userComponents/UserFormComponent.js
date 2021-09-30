import React, {Component} from 'react';
import DateComponent from './dateComponent';
import AvailableRoomsAndHours from './availableRoomsAndHours';
import axios from "axios";
import moment from "moment";
class UserForm extends Component{
constructor(props){
    super();
    this.state={
        capacity: 0,
        from: new Date(),
        duration:0,
        availableHours:[],
        messageOnSave:'',
        messageOnError:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.getData = this.getData.bind(this);
}
handleChange(event) {
    var userData = this.state;
    userData[event.target.name] = event.target.value;
    this.setState(userData);
}
getData(field, data) {
    this.setState({ [field]: data });
}
async submit(){
    var userData={
        capacity:parseInt(this.state.capacity),
        duration:parseInt(this.state.duration),
        from:this.state.from
    }
    if(!(userData.capacity>0 && userData.capacity<13)){
        this.setState({messageOnError:'Capacity must be between 1 and 13 people'})
    }else if(userData.duration<=0){
        this.setState({messageOnError: 'Duration time required'})
    }
    else{
    var result = await axios.post('http://localhost:8081/getUnscheduledHours', userData)
    console.log(result.data)
    this.setState({availableHours:result.data,messageOnError:''})
}
}
    render(){
        var hoursToDisplay=this.state.availableHours;
        var selectedDate=this.state.from;
        if(this.state.messageOnSave.length>0){
            setTimeout(() => {
                this.setState({messageOnSave:''})
            }, 3000);
        }
        return(
            <div className='userForm'>
                <h className='heading'><b>Schedule a meeting</b></h>
                <DateComponent class='userInput' minDate={moment().toDate()} getData={this.getData} taskDate={moment(this.state.from).toDate()}/>
            <input className='userInput' placeholder='Capacity' name='capacity' onChange={this.handleChange}></input>
            <input className='userInput' placeholder='Meeting duration in minutes' name='duration' onChange={this.handleChange}></input>
            <span className='errorMsg'>{this.state.messageOnError}</span>
            <button type='button' onClick={this.submit}>Check available times</button>
            <span className='onSaveMsg'>{this.state.messageOnSave}</span>
            {(hoursToDisplay.length>0)?<AvailableRoomsAndHours displayDate={selectedDate} HoursToDisplay={hoursToDisplay} getData={this.getData}/>:null}
            </div>
        )
    }
}
export default UserForm;