import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AdminAddBus.css';
import useAdminAddBus from '../../Logic/useAdminAddBus';

const AdminAddBus = () => {
  const {
    name,
    busNo,
    fare,
    src,
    dest,
    src_time,
    dest_time,
    createStatus,
    addBusHandler,
    changeSrcHandler,
    changeBusHandler,
    changeFareHandler,
    changeNameHandler,
    changeDestHandler,
    changeDestTimeHandler,
    changeSrcTimeHandler,
  } = useAdminAddBus();
  return (
    <div className='admin-add-bus'>
      <Container style={{ textAlign: 'center', margin: '50px' }}>
        <h2>Add New Bus</h2>
        <div>
          <TextField
            type='text'
            style={{ width: '300px', marginTop: '50px' }}
            label='Bus Name'
            value={name}
            onChange={changeNameHandler}
            helperText='Add Bus Name'
            variant='filled'
          />
        </div>
        <div>
          <TextField
            type='text'
            style={{ width: '300px', marginTop: '50px' }}
            label='Bus Number'
            value={busNo}
            onChange={changeBusHandler}
            helperText='Add Bus Number'
            variant='filled'
          />
        </div>
        <div>
          <TextField
            type='text'
            style={{ width: '300px', marginTop: '50px' }}
            label='Route Fare'
            value={fare}
            onChange={changeFareHandler}
            helperText='Add Fare'
            variant='filled'
          />
        </div>
        <div>
          <TextField
            type='text'
            style={{ width: '300px', marginTop: '50px' }}
            label='Route Source'
            value={src}
            onChange={changeSrcHandler}
            helperText='Add Route Source(Starting Point)'
            variant='filled'
          />
        </div>
        <div>
          <TextField
            type='text'
            style={{ width: '300px', marginTop: '50px' }}
            label='Route Destination'
            value={dest}
            onChange={changeDestHandler}
            helperText='Add Route Destination(Ending Point)'
            variant='filled'
          />
        </div>
        <div>
          <TextField
            type='text'
            style={{ width: '300px', marginTop: '50px' }}
            label='Bus Source Time'
            value={src_time}
            onChange={changeSrcTimeHandler}
            helperText='Add Bus Starting Time'
            variant='filled'
          />
        </div>
        <div>
          <TextField
            type='text'
            style={{ width: '300px', marginTop: '50px' }}
            label='Bus Destination Time'
            value={dest_time}
            onChange={changeDestTimeHandler}
            helperText='Add Bus Reaching Time'
            variant='filled'
          />
        </div>
        <Button
          onClick={addBusHandler}
          variant='contained'
          style={{
            margin: '10px auto',
            border: '4px solid blue',
            backgroundColor: 'lightgreen',
          }}>
          Add New Bus
        </Button>
        {createStatus}
      </Container>
    </div>
  );
};

export default AdminAddBus;
