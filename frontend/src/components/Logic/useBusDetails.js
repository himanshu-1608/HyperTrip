import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import CustomButton from '../Atoms/Button/Button';

import httpReq from '../../utils/http-req';

const useBusDetails = (busId) => {
  const [busData, setBusData] = useState();
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
  return {
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
  };
};
export default useBusDetails;
