import React, { useContext, useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import httpReq from '../../utils/http-req';

import AuthContext from '../../context/auth-context';
import './AdminAddBus.css';

const AdminAddBus = (props) => {

    const auth = useContext(AuthContext);
    const [name, setName] = useState('');
    const [busNo, setBusNo] = useState('');
    const [fare, setFare] = useState('');
    const [src, setSrc] = useState('');
    const [dest, setDest] = useState('');
    const [src_time, setSrcTime] = useState('');
    const [dest_time, setDestTime] = useState('');
    const [createStatus, setCreateStatus] = useState();

    const changeNameHandler = (e) => {
        setName(e.target.value);
    }
    const changeBusHandler = (e) => {
        setBusNo(e.target.value);
    }
    const changeFareHandler = (e) => {
        setFare(e.target.value);
    }
    const changeSrcHandler = (e) => {
        setSrc(e.target.value);
    }
    const changeDestHandler = (e) => {
        setDest(e.target.value);
    }
    const changeSrcTimeHandler = (e) => {
        setSrcTime(e.target.value);
    }
    const changeDestTimeHandler = (e) => {
        setDestTime(e.target.value);
    }

    const addBusHandler = async() => {
        const [isHttpError, responseData] = await httpReq('/admin/addBus',
        'POST', {
            'authorization': `Bearer ${auth.token}`,
            'Content-type': 'application/json'
        }, JSON.stringify({
            name: name,
            bus_no: busNo,
            fare: fare,
            src: src,
            dest: dest,
            src_time: src_time,
            dest_time: dest_time
        }))
        if(!isHttpError) {
            setCreateStatus(
                <div style={{textAlign: 'center'}}>Bus Created!</div>
            );
        } else {
            setCreateStatus(
                <div style={{textAlign: 'center'}}>Bus Creation Failed!</div>
            );
        }
    }
    return (
    <div className="admin-add-bus">
        <Container style={{textAlign: 'center', margin: '50px'}}>
            <h2>Add New Bus</h2>
            <div>
            <TextField type="text" style={{width: '300px', marginTop: '50px'}} label="Bus Name" value={name} onChange={changeNameHandler} helperText="Add Bus Name" variant="filled"/>
            </div>
            <div>
            <TextField type="text" style={{width: '300px', marginTop: '50px'}} label="Bus Number" value={busNo} onChange={changeBusHandler} helperText="Add Bus Number" variant="filled"/>
            </div>
            <div>
            <TextField type="text" style={{width: '300px', marginTop: '50px'}} label="Route Fare" value={fare} onChange={changeFareHandler} helperText="Add Fare" variant="filled"/>
            </div>
            <div>
            <TextField type="text" style={{width: '300px', marginTop: '50px'}} label="Route Source" value={src} onChange={changeSrcHandler} helperText="Add Route Source(Starting Point)" variant="filled"/>
            </div>
            <div>
            <TextField type="text" style={{width: '300px', marginTop: '50px'}} label="Route Destination" value={dest} onChange={changeDestHandler} helperText="Add Route Destination(Ending Point)" variant="filled"/>
            </div>
            <div>
            <TextField type="text" style={{width: '300px', marginTop: '50px'}} label="Bus Source Time" value={src_time} onChange={changeSrcTimeHandler} helperText="Add Bus Starting Time" variant="filled"/>
            </div>
            <div>
            <TextField type="text" style={{width: '300px', marginTop: '50px'}} label="Bus Destination Time" value={dest_time} onChange={changeDestTimeHandler} helperText="Add Bus Reaching Time" variant="filled"/>
            </div>
            <Button onClick={addBusHandler} variant="contained" style={{margin: '10px auto', border: '4px solid blue', backgroundColor: 'lightgreen'}}>Add New Bus</Button>
            {createStatus}
        </Container>
    </div>
    );
};

export default AdminAddBus;