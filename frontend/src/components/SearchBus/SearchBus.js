import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import httpReq from '../../utils/http-req';
import BusItem from '../BusItem/BusItem';

import './SearchBus.css';

const locations = [
  {
    value: 'Haryana',
    label: 'Haryana',
  },
  {
    value: 'Punjab',
    label: 'Punjab',
  },
  {
    value: 'Delhi',
    label: 'Delhi',
  },
  {
    value: 'UP',
    label: 'UP',
  },
];



const SearchBus = (props) => {
  const [src, setSrc] = useState('');
  const [srcError, setSrcError] = useState(false);
  const [srcMessage, setSrcMessage] = useState('Please select your source/starting point');
  const [dest, setDest] = useState('');
  const [destError, setDestError] = useState(false);
  const [destMessage, setDestMessage] = useState('Please select your destination/ending point');
  const [progress, setProgress] = useState(false);
  const [buses, setBuses] = useState([]);
  const [querySent, setQuerySent] = useState(false);
  const [busList, setBusList] = useState();

  useEffect(()=> {
    if(buses && buses.length>0) {
      setBusList(buses.map((object, index) => {
        return <BusItem key={index} bus_no={object.bus_no} bus_name={object.name} bus_time={new Date(Date.parse(object.bus_time))} bus_src={object.src} bus_dest={object.dest} id={object._id} bus_tickets={object.tickets}/>
      }));
    }
  },[buses]);

  const changeSrcHandler = (event) => {
    setSrc(event.target.value);
  };

  const changeDestHandler = (event) => {
    setDest(event.target.value);
  };

  const getBusesHandler = async(event) => {
    event.preventDefault();
    setProgress(true);
    if(src.trim()==='') {
      setSrcError(true);
      setSrcMessage('Please choose one of the source provided');
      setProgress(false);
      return;
    } else {
      setSrcError(false);
      setSrcMessage('Please select your source/starting point');
    }
    if(dest.trim()==='') {
      setDestError(true);
      setDestMessage('Please choose one of the destination provided');
      setProgress(false);
      return;
    } else {
      setDestError(false);
      setDestMessage('Please select your destination/ending point');
    }
    setQuerySent(true);
    const [isHttpError, responseData] = await httpReq('/query/getBuses',
      'POST',
      {
        'Content-type': 'application/json'
      },
      JSON.stringify({
        src: src, 
        dest: dest
      })
      );
    
    if(isHttpError) {
      setBuses();
    } else {
      setBuses(responseData.buses);
    }
    setProgress(false);
  }

  return (
    <div className='search-bus'>
      <Container maxWidth="sm">
        <Typography variant="h2" style={{textAlign: 'center'}} gutterBottom>
          Search Buses
        </Typography>
      </Container>
      <Container maxWidth="sm">
        <Typography variant="h5" style={{textAlign: 'center'}} gutterBottom>
          Just select your source and destination from the menu provided
        </Typography>
      </Container>
      <form onSubmit={getBusesHandler} noValidate autoComplete="off">
        <div style={{display: 'flex'}}>
          <div className="location-wrapper">
            <div>Source</div>
            <TextField
              select
              error={srcError}
              label="Select"
              value={src}
              onChange={changeSrcHandler}
              helperText={srcMessage}
              variant="filled">
              {locations.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
        </div>
        <div className="location-wrapper">
          <div>Destination</div>
          <TextField
            select
            error={destError}
            label="Select"
            value={dest}
            onChange={changeDestHandler}
            helperText={destMessage}
            variant="filled">
              {locations.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </TextField>  
        </div>
      </div>
      <Container maxWidth="sm" style={{textAlign: 'center', marginBottom: '50px'}} >
        <Button type="submit" variant="contained" color="primary">
          Check Buses
        </Button>
      </Container>
      {progress && (
        <Container style={{textAlign:'center'}} maxWidth="sm">
          <CircularProgress />
        </Container>
      )}
    </form>
    {buses && buses.length===0 && querySent && (
      <Container style={{textAlign:'center'}} maxWidth="sm">
        <div>Could Not Find any Buses</div>
      </Container>
    )}
    <div>
      {buses && buses.length > 0 && busList}
    </div>
    </div>
  );
};

export default SearchBus;
