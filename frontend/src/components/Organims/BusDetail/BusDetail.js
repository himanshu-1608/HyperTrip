import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';

import './BusDetail.css';
import useBusDetails from '../../Logic/useBusDetails';
const BusDetail = () => {
  const busId = useParams().busId;
  const {
    busData,
    blockedSeats,
    seats,
    bookArray,
    passObj,
    getNames,
    email,
    changeEmailHandler,
    passengerArray,
    sendTickets,
    loadingPass,
    tickets,
    seatArr
  } = useBusDetails(busId);

  return (
    <div className='bus-detail'>
      <Container style={{ textAlign: 'center', margin: '35px 0px' }}>
        {!busData && (
          <Container
            style={{ textAlign: 'center', marginTop: '35px' }}
            maxWidth='sm'>
            <Typography
              variant='h4'
              style={{ textAlign: 'center' }}
              gutterBottom>
              No bus found!!!
            </Typography>
          </Container>
        )}
        {busData && (
          <React.Fragment>
            <Typography
              variant='h4'
              style={{ textAlign: 'center' }}
              gutterBottom>
              Book Tickets for Bus here
            </Typography>
            <div>
              Name of Bus: {busData.name}
              <br />
              Bus Number: {busData.bus_no} <br />
              Departs from: {busData.src} <br />
              Departure Date: {busData.src_time.getDate()}/
              {'' + busData.src_time.getMonth() + 1}/
              {busData.src_time.getFullYear()} <br />
              Departure Time: {busData.src_time.getHours()}:
              {busData.src_time.getMinutes()} <br />
              Arrives to: {busData.dest} <br />
              Arrival Date: {busData.dest_time.getDate()}/
              {'' + busData.dest_time.getMonth() + 1}/
              {busData.dest_time.getFullYear()} <br />
              Arrival Time: {busData.dest_time.getHours()}:
              {busData.dest_time.getMinutes()} <br />
              Tickets left: {40 - busData.tickets.length}
            </div>
            <h1>Ticket Status</h1>
            {blockedSeats && <div>{seats}</div>}
          </React.Fragment>
        )}
      </Container>
      <Container
        id='seats-to-book'
        style={{ textAlign: 'center', margin: '35px 0px' }}>
        <Typography variant='h4' style={{ textAlign: 'center' }} gutterBottom>
          Seats to Book:
        </Typography>
      </Container>
      {bookArray && bookArray.length > 0 && passObj && (
        <div>
          <div id='pass-list'>{seatArr}</div>
          <Button
            id='get-name-btn'
            onClick={getNames}
            variant='contained'
            style={{
              textAlign: 'center',
              margin: '40px auto',
              display: 'block',
              backgroundColor: 'lightgreen',
            }}>
            Book Selected Tickets
          </Button>
          <div id='pass-details'>
            <Container
              id='email-text'
              maxWidth='sm'
              style={{ textAlign: 'center', display: 'none' }}>
              <TextField
                label='Passenger Email'
                value={email}
                onChange={changeEmailHandler}
                helperText='Add an Email'
                variant='filled'
              />
            </Container>
            {passengerArray}
          </div>
          <Button
            id='send-ticket-btn'
            onClick={sendTickets}
            variant='contained'
            style={{
              textAlign: 'center',
              margin: '40px auto',
              display: 'none',
              backgroundColor: 'lightgreen',
            }}>
            Confirm Book
          </Button>
          {loadingPass && (
            <Container maxWidth='sm' style={{ textAlign: 'center' }}>
              <CircularProgress style={{ color: 'green' }} />
            </Container>
          )}
          {tickets && (
            <Container maxWidth='sm' style={{ textAlign: 'center' }}>
              <Typography
                variant='h4'
                style={{ textAlign: 'center' }}
                gutterBottom>
                Seats Booked and sent to your email successfully!
                <br />
              </Typography>
            </Container>
          )}
          {tickets}
        </div>
      )}
    </div>
  );
};

export default BusDetail;
