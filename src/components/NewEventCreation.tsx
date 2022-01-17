import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setEvent } from '../redux/eventAction';
export type Member = {
    name: string,
    limit: string,
    id: number
}

function NewEventCreation() {
    const dispatch = useDispatch();
    const [eventName, setEventName] = useState('');
    const [members, setMembersNames] = useState<Member[]>([]);
    const [name, setName] = useState('');
    const [limit, setLimit] = useState('');

    let setEvName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEventName(e.target.value.trim());
    }
     const addMember = (e: React.MouseEvent) => {
        e.preventDefault();
         setMembersNames([...members, { name: name, limit: limit, id: members.length },]);
         setName('');
         setLimit('');
     }
     const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setName(e.target.value)
    }
    const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setLimit(e.target.value)
    }
    
    const createNewEvent = React.useCallback((obj) => {
    dispatch(setEvent(obj));
    }, [dispatch]);
    const createEvent = () => {
    let newEventObj = {
      members: members,
      newEventName: eventName
    };
        
    createNewEvent(newEventObj);
  };
    

    return (
        <div className='event-creation'>
            <form className='event-creation-form' >
                <TextField
                    sx={{ width: '25ch'}}
                    id="name"
                    label="Event name"
                    value={eventName}
                    onChange={setEvName}
                    color="secondary" 
                />
                
                {members && <div className='members'>
                    <p>
                        Members:
                    </p>
                    {members.map((member) => <div>
                        Name: {member.name},  {member.limit ? `limit: ${member.limit},` : ''}
                    </div>)}
                </div>}
                <TextField
                    sx={{ width: '15ch', marginRight: '20px'}}
                    label="Name:"
                    value={name}
                    onChange={handleNameChange}
                    color="secondary" 
                />
                <TextField
                    sx={{ width: '15ch', marginRight: '20px' }}
                    label="Limit(optional):"
                    value={limit}
                    onChange={handleLimitChange}
                    color="secondary" 
                />
                {name 
                        ? <Button sx={{ height: '7ch', marginRight: '20px' }} color="secondary"  variant="outlined" onClick={addMember}>Add member</Button>
                        : <Button sx={{ height: '7ch', marginRight: '20px' }} color="secondary"  variant="outlined" disabled>Add member</Button>
                }
                
            </form>
            <Link to={`/events/${eventName}`} className='start-event' onClick={createEvent}>
                <Button color="secondary" sx={{ height: '7ch', width: '20ch', backgroundColor: '#aa2299', color: '#d7d'}} variant="outlined">Let's go!</Button>
            </Link>
          
        </div>
    )
}

export default NewEventCreation
