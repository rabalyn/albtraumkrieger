import React, { Component } from 'react'

import Event from './Event'
import eventInfos from './Events-description'

class Events extends Component {
  render() {
    return (
      <div className="content row justify-content-center">
        <Event cols="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4" day={eventInfos.monday.day} start={eventInfos.monday.start.getHours()} end={eventInfos.monday.end.getHours()} infoText={eventInfos.monday.info}/>
        <Event cols="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4" day={eventInfos.tuesday.day} start={eventInfos.tuesday.start.getHours()} end={eventInfos.tuesday.end.getHours()} infoText={eventInfos.tuesday.info} />
        <Event cols="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4" day={eventInfos.wednesday.day} start={eventInfos.wednesday.start.getHours()} end={eventInfos.wednesday.end.getHours()} infoText={eventInfos.wednesday.info} />
        <Event cols="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4" day={eventInfos.thursday.day} start={eventInfos.thursday.start.getHours()} end={eventInfos.thursday.end.getHours()} infoText={eventInfos.thursday.info} />
        <Event cols="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4" day={eventInfos.friday.day} start={eventInfos.friday.start.getHours()} end={eventInfos.friday.end.getHours()} infoText={eventInfos.friday.info} />
        <Event cols="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4" day={eventInfos.saturday.day} start={eventInfos.saturday.start.getHours()} end={eventInfos.saturday.end.getHours()} infoText={eventInfos.saturday.info} />
        <Event cols="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4" day={eventInfos.sunday.day} start={eventInfos.sunday.start.getHours()} end={eventInfos.sunday.end.getHours()} infoText={eventInfos.sunday.info} />
      </div>
    )
  }
}

export default Events