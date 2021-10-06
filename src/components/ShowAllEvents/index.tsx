import React from 'react';
import { ARRAY_EMPTY } from '../../constants';
import EventCard from '../EventCard';
import { v4 as uuid } from 'uuid';
import { SingleEvent } from '../../interfaces';

const ShowAllEvents = (props : {currentDate: String, currentDayEventData: SingleEvent[]}) => {
    return (
        <>
            <p className="title-text small mb-4">All Day Event(s)</p>
            {props.currentDayEventData?.length === ARRAY_EMPTY
                ? <p>No Events Scheduled</p>
                : <div className="contain-elements">
                    {props.currentDayEventData.map((el : SingleEvent) => {
                        return <EventCard key={uuid()} data={el}/>;
                    })}
                </div>}
        </>
    );
};

export default ShowAllEvents;
