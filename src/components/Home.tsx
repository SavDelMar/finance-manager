import React from 'react'
import { Link } from 'react-router-dom';
import Event from './Event';

function Home() {
  
    const events = [
        {
            name: 'banya',
            members: ['Masha', 'Katya', 'Andrii', 'Sasha'],
            totalSum: 4000,
            isClosed: true
        },
        {
            name: 'turkey',
            members: ['Masha', 'Katya', 'Andrii', 'Sasha'],
            totalSum: 4322,
            isClosed: false
        },
        {
            name: 'papaFeta',
            members: ['Masha', 'Katya', 'Andrii', 'Sasha'],
            totalSum: 1200,
            isClosed: true
        }
    ];

    return (
        <div>
            <div>My Events</div>
            <div className='events-container'>
                {events.map(event =>
                    <Link to={`/events/${event.name}`} >
                        <Event key={ event.name + ' ' + event.totalSum}
                            name={event.name}
                            members={event.members}
                            totalSum={event.totalSum}
                            isClosed={event.isClosed} 
                        />
                     </Link>
                )}
                <Link to={`/create`} >
                    <div className='event-preview'>+ ADD NEW EVENT</div>
                </Link>
            </div>
        </div>
        
    )
}

export default Home
