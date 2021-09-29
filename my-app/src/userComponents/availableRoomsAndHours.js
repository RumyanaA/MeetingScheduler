import React from "react";
import { Component } from "react";
import moment from 'moment-timezone';

class AvailableRoomsAndHours extends Component {
    constructor(props) {
        super();
        this.state={
            pickedRoom:'',
            pickedTime:''
        }
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
                                            <span>{'from: ' + moment(convertFromDate).format("HH:mm")}</span>
                                            <span>{' to ' + moment(convertToDate).format("HH:mm")}</span>
                                            <button>Select</button>
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