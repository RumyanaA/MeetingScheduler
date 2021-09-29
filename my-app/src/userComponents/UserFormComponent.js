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
        availableHours:[]
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
        capacity:this.state.capacity,
        duration:this.state.duration,
        from:this.state.from
    }
    var result = await axios.post('http://localhost:8081/getUnscheduledHours', userData)
    console.log(result.data)
    this.setState({availableHours:result.data})
}
    render(){
        var thisState=this.state.availableHours
        return(
            <div>
                <DateComponent class='' minDate={moment().toDate()} getData={this.getData} taskDate={moment(this.state.from).toDate()}/>
            <input placeholder='Capacity' name='capacity' onChange={this.handleChange}></input>
            <input placeholder='duration' name='duration' onChange={this.handleChange}></input>
            <button type='button' onClick={this.submit}>Check available times</button>
            {(thisState.length>0)?<AvailableRoomsAndHours HoursToDisplay={thisState}/>:null}
            </div>
        )
    }
}
export default UserForm;