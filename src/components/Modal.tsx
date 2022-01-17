import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Chip, Stack, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { EventType, setEvent } from '../redux/eventAction';
import { useDispatch, useSelector } from 'react-redux';
import { Member } from './NewEventCreation';
import { AppState } from '../redux/rootReducer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
type BasicModalType = {
    text: string
}

export const BasicModal: React.FC<BasicModalType> = ({ text }) => {
  const events: EventType[] = useSelector((state: AppState) => state.events.events);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [eventName, setEventName] = React.useState('');
  const [members, setMembersNames] = React.useState<Member[]>([]);
  const [name, setName] = React.useState('');
  const [limit, setLimit] = React.useState('');

    const setEvName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEventName(e.target.value);
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
      eventName: eventName,
      totalSum: 0
    };
        
    createNewEvent(newEventObj);
    };
    const handleDelete = (memberToDelete:Member) => () => {
    setMembersNames((members) => members.filter((member) => member.name !== memberToDelete.name));
  };
  

  return (
    <div>
        <Button onClick={handleOpen}>{text}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                    <Stack direction="row" spacing={2} justifyContent='start' flexWrap='wrap'>
                        {members.map((member) => {
                            return (
                                <div className='member'>
                                    <Chip
                                    key={member.name + member.limit}
                                    label={member.name + ' limit: ' + member.limit}
                                    onDelete={handleDelete(member)}
                                    />
                                </div>
                                
                               );
                            })}
                    </Stack>
                 </div>}
                <div className='add-members-form'>
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
                </div> 
            </form>
                      {members.length >= 2
                       ? <Link to={`/events/${events.length}`} className='start-event' onClick={createEvent}>
                          <Button color="secondary"
                              sx={{ height: '7ch', width: '20ch', backgroundColor: '#aa2299', color: '#d7d' }}
                              variant="outlined"
                             >Let's go!</Button>
                      </Link>
                        : <div><Button color="secondary"
                              sx={{ height: '7ch', width: '20ch', backgroundColor: '#aa2299', color: '#d7d' }}
                              variant="outlined" disabled
                          >Let's go!</Button> <span>Add 2 or more members</span>
                          </div>
                      }
        </div>
        </Box>
      </Modal>
    </div>
  );
}