import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import './SearchBus.css';
import useSearchBus from '../../Logic/useSearchBus';

const SearchBus = () => {
  const {
    src,
    dest,
    buses,
    busList,
    srcError,
    progress,
    destError,
    locations,
    querySent,
    srcMessage,
    destMessage,
    getBusesHandler,
    changeSrcHandler,
    changeDestHandler
  } = useSearchBus();
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
