import React, { FC } from 'react';
import { Member } from './NewEventCreation';
import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppState } from '../redux/rootReducer';
import { useSelector } from 'react-redux';


type EventProps = {
    name: string,
    id: number,
    members: Array<Member>,
    totalSum: number,
    isClosed: boolean,
  }

const Event: FC<EventProps> = ({ name , id, members, totalSum, isClosed }) => {
    const totalEventSum: number = useSelector((state: AppState) => state.totalSums.sums[id]);
    console.log(totalEventSum)
    return (
        <div>
            <Box>
              <Card 
                sx={{
                    width: 200,
                    height: 250,
                    backgroundColor: 'rgb(80, 170, 185)',
                    '&:hover': {
                    backgroundColor: 'rgb(149, 95, 151)',
                    },
                }} variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold'}} color="text.secondary" gutterBottom>
                            {name}
                        </Typography>
                        <Typography>
                            Members: {members.map(member => member.name).join(', ')}      
                        </Typography>
                        <Typography>
                            Total sum: {totalEventSum}  
                        </Typography>
                        <Typography>
                            {isClosed}      
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={`/events/${id}`}>Edit</Link>
                    </CardActions>
              </Card>
           </Box>   
        </div>
        
    )
}

export default Event;
