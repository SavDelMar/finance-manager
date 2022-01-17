import { Box, Card } from '@mui/material';

import React from 'react'
import { useSelector } from 'react-redux';
import { EventType } from '../redux/eventAction';
import { AppState } from '../redux/rootReducer';
import Event from './Event';
import {BasicModal} from './Modal';

function Home() {
    const events: EventType[] = useSelector((state: AppState) => state.events.events);
    console.log('events', events)

    return (
            <div className='events-container'>
                {events.map((event, i) =>
                    <Event key={event.eventName + ' '}
                            id={i}
                            name={event.eventName}
                            members={event.members}
                            totalSum={event.totalSum}
                            isClosed={true} 
                        />
            )}  
                    <Box>
                        <Card  sx={{
                            width: 200,
                            height: 250,
                            backgroundColor: 'rgb(80, 170, 185)',
                            '&:hover': {
                            backgroundColor: 'rgb(80, 170, 185)',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }} variant="outlined">
                            
                            <BasicModal text={'+ NEW EVENT'}/>
                            
                        </Card>
                    </Box>
                   
            </div>
        
        
    )
}

export default Home
