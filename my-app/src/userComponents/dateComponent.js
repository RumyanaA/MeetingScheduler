import React from "react";
import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class DateComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            StartDate: new Date()
        }
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    handleDateChange(date){
        this.setState({startDate: date});
        this.props.getData('from', moment(date).format("YYYY-MM-DD"));
    }
    render(){
        return(
            <DatePicker 
            className={this.props.class}
            onChange={this.handleDateChange}
            minDate={this.props.minDate}
            selected={this.props.taskDate}
            name="startDate"
            dateFormat="yyyy-MM-dd">            
            </DatePicker>
        )
    }

}
export default DateComponent;