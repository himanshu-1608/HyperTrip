import React, { useCallback, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomButton from '../../Atoms/Button/Button';
import { useParams } from 'react-router-dom';

import httpReq from '../../../utils/http-req';

import './BusDetail.css';

const BusDetail = (props) => {
  const [busData, setBusData] = useState();
  const busId = useParams().busId;
  const [seats, changeSeats] = useState([]);
  const [bookArray, setBookArray] = useState([]);
  const [seatArr, setSeatArr] = useState();
  const [passengerArray, setPassengerArray] = useState();
  const [passObj, setPassObj] = useState([]);
  const [loadingPass, setLoadingPass] = useState(false);
  const [tickets, setTickets] = useState();
  const [blockedSeats, setBlockedSeats] = useState([]);
  const [email, setEmail] = useState('');

  const updateSeats = useCallback(async () => {
    const [isHttpError, responseData] = await httpReq(`/query/bus/${busId}`);
    if (!isHttpError) {
      const src_time = new Date(Date.parse(responseData.bus.src_time));
      const dest_time = new Date(Date.parse(responseData.bus.dest_time));
      setBusData({
        ...responseData.bus,
        src_time: src_time,
        dest_time: dest_time,
      });
    } else {
      setBusData();
    }
  });

  useEffect(() => {
    updateSeats();
  }, []);

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const buttonClicked = (index) => {
    let temp, ind;
    temp = busData.tickets.map((ticket) => {
      return ticket.seat_no;
    });
    if (temp && temp.indexOf(index) !== -1) {
      return;
    }
    if (bookArray.indexOf(index) === -1) {
      temp = bookArray;
      temp.push(index);
      document.getElementById(`seat${index}`).style.backgroundColor = 'yellow';
    } else {
      temp = bookArray;
      ind = bookArray.indexOf(index);
      temp.splice(ind, 1);
      document.getElementById(`seat${index}`).style.backgroundColor =
        'lightgreen';
    }
    setBookArray(temp);
    temp = bookArray.map((seat, index) => {
      return (
        <Button
          variant='contained'
          style={{
            margin: '10px auto',
            border: '2px solid blue',
            backgroundColor: 'yellow',
          }}
          key={index}>
          {seat}
        </Button>
      );
    });
    setSeatArr(
      <Container maxWidth='sm' style={{ display: 'flex' }}>
        {temp}
      </Container>
    );
  };

  const changeNameHandler = (event, index) => {
    const val = event.target.value;
    const list = [...passObj];
    list[index].name = val;
    setPassObj(list);
  };

  const changeAgeHandler = (event, index) => {
    const val = event.target.value;
    const list = [...passObj];
    list[index].age = val;
    setPassObj(list);
  };

  const sendTickets = async () => {
    document.getElementById('send-ticket-btn').style.display = 'none';
    document.getElementById('pass-details').style.display = 'none';
    setLoadingPass(true);
    const [isHttpError, responseData] = await httpReq(
      `/booking/bookTicket`,
      'POST',
      {
        'Content-type': 'application/json',
      },
      JSON.stringify({
        busId: busId,
        seats: bookArray,
        passengers: passObj,
        email: email,
      })
    );
    if (!isHttpError) {
      setTickets(
        responseData.tickets.map((ticketId, index) => {
          return (
            <Container
              key={index}
              maxWidth='sm'
              style={{ textAlign: 'center' }}>
              <h3>Ticket ID: {ticketId}</h3>
            </Container>
          );
        })
      );
    }
    setLoadingPass(false);
  };

  const getNames = () => {
    document.getElementById('seats-to-book').style.display = 'none';
    document.getElementById('get-name-btn').style.display = 'none';
    document.getElementById('pass-list').style.display = 'none';
    document.getElementById('email-text').style.display = 'block';
    document.getElementById('send-ticket-btn').style.display = 'block';
    let temp = bookArray.map((object) => {
      return { name: '', age: '' };
    });
    setPassObj(temp);
  };

  useEffect(() => {
    setPassengerArray(
      passObj.map((object, index) => {
        return (
          <Container
            maxWidth='sm'
            index={index}
            key={index}
            style={{ textAlign: 'center', display: 'flex', marginTop: '5px' }}>
            <Button
              variant='contained'
              style={{
                margin: '0px auto',
                backgroundColor: 'lightgreen',
                padding: '0px',
                height: '55px',
              }}>
              {bookArray[index]}
            </Button>
            <TextField
              style={{ marginRight: '10px' }}
              label='Passenger Name'
              index={index}
              value={object.name}
              onChange={(e) => {
                changeNameHandler(e, index);
              }}
              helperText='Add Passenger Name'
              variant='filled'
            />
            <TextField
              type='number'
              label='Passenger Age'
              index={index}
              value={object.age}
              onChange={(e) => {
                changeAgeHandler(e, index);
              }}
              helperText='Add Passenger Age'
              variant='filled'
            />
          </Container>
        );
      })
    );
  }, [passObj]);

  useEffect(async () => {
    if (!busData) return;
    let temp = busData.tickets.map((ticket) => {
      return ticket.seat_no;
    });
    await setBlockedSeats(temp);
  }, [busData]);

  useEffect(() => {
    if (!blockedSeats) return;
    blockedSeats.map((seat_no) => {
      if (document.getElementById(`seat${seat_no}`)) {
        document.getElementById(`seat${seat_no}`).disabled = true;
        document.getElementById(`seat${seat_no}`).style.backgroundColor = 'red';
      }
    });
  }, [blockedSeats]);
  useEffect(() => {
    let totalSeats = [];
    for (let seatRow = 0; seatRow < 10; seatRow++) {
      totalSeats.push(
        <Container maxWidth='sm' key={seatRow} style={{ display: 'flex' }}>
          <CustomButton
            seatRow={seatRow}
            number={1}
            onClick={buttonClicked}
            variant='contained'
          />
          <CustomButton
            seatRow={seatRow}
            number={2}
            onClick={buttonClicked}
            variant='contained'
          />
          <CustomButton
            seatRow={seatRow}
            number={3}
            onClick={buttonClicked}
            variant='contained'
          />
          <CustomButton
            seatRow={seatRow}
            number={4}
            onClick={buttonClicked}
            variant='contained'
          />
        </Container>
      );
    }
    changeSeats(totalSeats);
  }, [busData]);

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
