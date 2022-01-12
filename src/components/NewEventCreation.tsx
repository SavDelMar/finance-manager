import React, { useState } from 'react'
import { Link } from 'react-router-dom';
type Member = {
    name: string,
    limit: string,
    id: number
}

function NewEventCreation() {
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
    
    const createEvent = () => {
        
    }

    return (
        <div className='event-creation'>
            <form className='event-creation-form' >
                <label>
                    Event name
                    <input id='name' onChange={setEvName}></input>
                </label> 
                <p>
                   Members:
                </p>
                
                <div className='members'>
                    {members.map((member) => <div>
                        Name: {member.name},  {member.limit ? `limit: ${member.limit},` : ''}
                        </div>)}
                </div>
                <p>Add member:</p>
                <label>
                    Name:
                    <input value={name} onChange={handleNameChange}></input>
                </label>
                <label>
                    Limit(optional):
                    <input value={limit} onChange={handleLimitChange}></input>
                </label>
                <button onClick={addMember}> + add member </button>
                <Link to={`/events/${eventName}`} className='start-event' onClick={createEvent}>
                    Let's go!
                </Link>
            </form>
        </div>
    )
}

export default NewEventCreation
