import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DAY_NAME, MONTH_NAME } from '../../constants';
import ShowAllEvents from '../../components/ShowAllEvents';
import ShowEventChart from '../../components/ShowEventChart';
import data from '../../data/event';
import { SingleEvent } from '../../interfaces';

const TimetablePage = () => {
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
    const [formattedDate, setformattedDate] = useState([] as String[]);
    const [currentDayEventData, setCurrentDayEventDay] = useState([] as SingleEvent[]);

    const setNewDate = (date : Date) :void => {
        setCurrentDate(date.toLocaleDateString());
        const dateArray = [MONTH_NAME[date.getMonth()], date.getDate().toString(), DAY_NAME[date.getDay()]];
        setformattedDate(dateArray);
        const filteredEvents = data.filter(el => date.toLocaleDateString() === el.date);
        setCurrentDayEventDay(filteredEvents);
    };

    useEffect(() => {
        setNewDate(new Date());
    }, []);

    return (
        <React.Fragment>
            <div className="row mx-auto w-100 mt-5">
                <div className="mt-4 mt-md-0 col-md-3 d-flex h-100 justify-content-center">
                    <Calendar value={new Date(currentDate)} onChange={setNewDate} />
                </div>
                <div className="mt-4 mt-md-0 col-md-6">
                    <h3 className="title-text"><b>{formattedDate[0]} {formattedDate[1]}</b> {formattedDate[2]}</h3>
                    <ShowEventChart currentDate={currentDate} currentDayEventData={currentDayEventData} />
                </div>
                <div className="mt-4 mt-md-0 col-md-3 pt-50">
                    <ShowAllEvents currentDate={currentDate} currentDayEventData={currentDayEventData} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default TimetablePage;
