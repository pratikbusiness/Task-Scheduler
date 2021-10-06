import React from 'react';
import { SingleEvent } from '../../interfaces';

const EventCard = (props : {data : SingleEvent, classes?: String, time?: String }) => {
    const getColor = () => {
        let color = null;
        if (props.data?.category === 'DUE DATE') color = 'yellow-color';
        if (props.data?.category === 'RELEASE') color = 'green-color';
        if (props.data?.category === 'CONTENT PUBLISH') color = 'red-color';
        return ' ' + color + ' ';
    };

    const marginClass = () => {
        let marginClass = 'event-card-margin-0';
        const minutes = (props.data.minutes === undefined) ? '00' : props.data.minutes;
        if (minutes > '00' && minutes <= '15') marginClass = 'event-card-margin-25';
        if (minutes > '15' && minutes <= '30') marginClass = 'event-card-margin-30';
        if (minutes > '30' && minutes <= '59') marginClass = 'event-card-margin-45';
        return ' ' + marginClass + ' ';
    };

    return (
        <div className={props.classes + ' event-card px-2 py-2 mb-3' + getColor() + marginClass()}>
            <div className={'triangle-left'}></div>
            <div className="px-2 pb-2">
                <p className="text-secondary mt-1 mb-2" style={{ fontWeight: 600 }}>{props?.time}</p>
                <div dangerouslySetInnerHTML={{ __html: props.data.html }}>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
