import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { SingleEvent } from '../../interfaces';
import EventCard from '../EventCard';

const ShowEventCharts = (props : {currentDate: String, currentDayEventData: SingleEvent[]}) => {
    const timeIndicators = ['00:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM', '12:00 PM'];

    interface CategoryObject {
        [key: string]: SingleEvent[]
    }

    const [dueDate, setDueDate] = useState({} as CategoryObject);
    const [contentPublish, setContentPublish] = useState({} as CategoryObject);
    const [release, setRelease] = useState({} as CategoryObject);

    const getKey = (time : String) => {
        const timeSplit = time.split('');
        return timeSplit[0] + timeSplit[1] + ' ' + timeSplit[timeSplit.length - 2] + timeSplit[timeSplit.length - 1];
    };
    const getMinutes = (time : String) => {
        const timeSplit = time.split('');
        return timeSplit[3] + timeSplit[4];
    };

    useEffect(() => {
        const newdueDate:CategoryObject = {};
        const newContentPublish:CategoryObject = {};
        const newRelease:CategoryObject = {};

        props.currentDayEventData.forEach((el: SingleEvent) => {
            const key = getKey(el.time);
            el.minutes = getMinutes(el.time);
            if (el.category === 'DUE DATE') {
                if (newdueDate[key] === undefined) newdueDate[key] = [];
                newdueDate[key].push(el);
            } else if (el.category === 'CONTENT PUBLISH') {
                if (newContentPublish[key] === undefined) newContentPublish[key] = [];
                newContentPublish[key].push(el);
            } else if (el.category === 'RELEASE') {
                if (newRelease[key] === undefined) newRelease[key] = [];
                newRelease[key].push(el);
            }
        });

        setDueDate(newdueDate);
        setRelease(newRelease);
        setContentPublish(newContentPublish);
    }, [props.currentDayEventData]);

    return (
        <div className="contain-elements mt-3 py-5">
            {timeIndicators.map((singleTime) => {
                return <div key={uuid()} className="chart-block">
                    <div className="d-flex">
                        <p className="time-indicator">{singleTime}</p>
                        <div className="event-container row w-100 justify-content-around">
                            <div className="col-4 event-card-container">
                                {dueDate[getKey(singleTime)] !== undefined && dueDate[getKey(singleTime)].map((event : SingleEvent) => {
                                    return <EventCard key={uuid()} data={event} time={event.time} classes={'absolute-card'}/>;
                                })}
                            </div>
                            <div className="col-4 event-card-container">
                                {contentPublish[getKey(singleTime)] !== undefined && contentPublish[getKey(singleTime)].map((event : SingleEvent) => {
                                    return <EventCard key={uuid()} data={event} time={event.time} classes={'absolute-card'}/>;
                                })}
                            </div>
                            <div className="col-4 event-card-container">
                                {release[getKey(singleTime)] !== undefined && release[getKey(singleTime)].map((event : SingleEvent) => {
                                    return <EventCard key={uuid()} data={event} time={event.time} classes={'absolute-card'}/>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>;
            })}
        </div>
    );
};

export default ShowEventCharts;
