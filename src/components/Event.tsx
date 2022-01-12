import React, { FC } from 'react';

type EventProps = {
    name: string,
    members: Array<String>,
    totalSum: number,
    isClosed: boolean,
  }

const Event: FC<EventProps> = ({ name , members, totalSum, isClosed }) => {
   
    return (
        <div className='event-preview'>
                <h2>{name}</h2>
                <div>Total sum: {totalSum} uah</div>
                <div>Members: {members.join(', ')}</div>
                <div>{ isClosed ? 'closed' : 'open' }</div>
        </div>
    )
}

export default Event;
