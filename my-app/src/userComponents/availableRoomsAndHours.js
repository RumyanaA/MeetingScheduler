import React from "react";
import { Component } from "react";
import moment from 'moment-timezone';
import axios from "axios";

class AvailableRoomsAndHours extends Component {
    constructor(props) {
        super();
        this.state={
            pickedRoom:'',
            pickedTime:''
        }
        this.allAvailable=props.HoursToDisplay
        this.submit=this.submit.bind(this);
    }

    async submit(event){
        var value=event.currentTarget.name
        var firstIndex=parseInt(value[0]);
        var secondIndex=parseInt(value[2]);
        var userData={
            pickedRoom:this.allAvailable[firstIndex].name,
            pickedTime:this.allAvailable[firstIndex].availableHours[secondIndex]
        }
        var convertTimeZone=moment(new Date(userData.pickedTime.from).toString()).format('YYYY-MM-DDTHH:mm');
        userData.pickedTime.from=convertTimeZone;
        convertTimeZone= moment(new Date(userData.pickedTime.to).toString()).format('YYYY-MM-DDTHH:mm');
        userData.pickedTime.to=convertTimeZone;
        var result = await axios.post('http://localhost:8081/insertScheduledTime', userData)
        var arr=[];
        this.props.getData('availableHours', arr);
    }
    render() {
        var availableTimes = this.props.HoursToDisplay
        var convertFromDate;
        var convertToDate;
        var DateOnly=new Date(availableTimes[0].availableHours[0].from).toDateString();
        return (
            <div>
                <span>{'On ' + moment(DateOnly).format('YYYY/MM/DD') + ' you can select:' }</span>
                {
                    availableTimes.map((item,index) => {
                        return (
                            <div key={index}>
                                <p>{item.name}</p>
                                <ul className='li_of_times'>
                                    {item.availableHours.map((time,i) => {
                                        convertFromDate=new Date(time.from).toString();
                                        convertToDate=new Date(time.to).toString();
                                        return(
                                        <li  key={i}>
                                            {/* <button onClick={this.submit} id={i}>{'from: ' + moment(convertFromDate).format("HH:mm")} {' to ' + moment(convertToDate).format("HH:mm")}</button> */}
                                            <span>{'from: ' + moment(convertFromDate).format("HH:mm")}</span>
                                            <span>{' to ' + moment(convertToDate).format("HH:mm")}</span>
                                            <button name={`${index},${i}`} onClick={this.submit}>Select</button>
                                        </li>
                                        )
                                    })}
                                    <li></li>
                                </ul>
                            </div>
                        )
                    })
                }
            </div>

        )
    }
}
export default AvailableRoomsAndHours;