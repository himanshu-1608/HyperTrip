import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useParams} from 'react-router-dom';
import httpReq from '../../utils/http-req';

import './AdminBusDetail.css';

const AdminBusDetail = (props) => {
    
    const busId = useParams().busId;
    const [busData, setBusData] = useState([]);
    const [seatsArr, setSeatsArr] = useState();
    const [seatInfo, setSeatInfo] = useState();

    const removeTicket = () => {
        setSeatInfo();
    }

    let bookedArray, bookedTickets;
    useEffect(()=> {
        const getBusData = async () => {
            const [isHttpError, responseData] = await httpReq(`/query/bus/${busId}`);
            if(!isHttpError) {
                let temp = responseData.bus;
                setBusData(temp);
                bookedArray = responseData.bus.tickets.map(ticket=> ticket.seat_no);
                bookedTickets = responseData.bus.tickets;
                temp=[];
                for(let i=0;i<10;i++) {
                    temp.push(
                    <Container key={i*4+1} maxWidth="sm" style={{textAlign: 'center'}}>
                        { bookedArray.indexOf((i*4 + 1)) === -1  && (
                            <Button onClick={removeTicket} variant="contained" style={{margin: '10px auto', border: '2px solid blue', backgroundColor: 'lightgreen'}}>{i*4 + 1}</Button>
                        )}
                        { bookedArray.indexOf((i*4 + 1)) !== -1  && (
                            <Button onClick={()=> {showTicket(i*4 + 1)}} variant="contained" style={{margin: '10px auto', border: '2px solid blue', backgroundColor: 'pink'}}>{i*4 + 1}</Button>
                        )}
                        { bookedArray.indexOf((i*4 + 2)) === -1  && (
                            <Button onClick={removeTicket} variant="contained" style={{margin: '10px auto', border: '2px solid blue', backgroundColor: 'lightgreen'}}>{i*4 + 2}</Button>
                        )}
                        { bookedArray.indexOf((i*4 + 2)) !== -1  && (
                            <Button onClick={()=> {showTicket(i*4 + 2)}} variant="contained" style={{margin: '10px auto', border: '2px solid blue', backgroundColor: 'pink'}}>{i*4 + 2}</Button>
                        )}
                        { bookedArray.indexOf((i*4 + 3)) === -1  && (
                            <Button onClick={removeTicket} variant="contained" style={{margin: '10px auto', border: '2px solid blue', backgroundColor: 'lightgreen'}}>{i*4 + 3}</Button>
                        )}
                        { bookedArray.indexOf((i*4 + 3)) !== -1  && (
                            <Button onClick={()=> {showTicket(i*4 + 3)}} variant="contained" style={{margin: '10px auto', border: '2px solid blue', backgroundColor: 'pink'}}>{i*4 + 3}</Button>
                        )}
                        { bookedArray.indexOf((i*4 + 4)) === -1  && (
                            <Button onClick={removeTicket} variant="contained" style={{margin: '10px auto', border: '2px solid blue', backgroundColor: 'lightgreen'}}>{i*4 + 4}</Button>
                        )}
                        { bookedArray.indexOf((i*4 + 4)) !== -1  && (
                            <Button onClick={()=> {showTicket(i*4 + 4)}} variant="contained" style={{margin: '10px auto', border: '2px solid blue', backgroundColor: 'pink'}}>{i*4 + 4}</Button>
                        )}
                    </Container>);
                };
                setSeatsArr(temp);
            } else {
                console.log(responseData);
            }
        }
        getBusData();
    },[]);

    const showTicket = (index) => {
        const ticketData = bookedTickets.find((ticket)=> ticket.seat_no == index);
        setSeatInfo(
            <Container style={{boxShadow: '0px 0px 20px #888888', backgroundColor: '#e6e6e6', padding: '20px', textAlign: 'center', width: '500px', marginBottom: '50px'}}>
                    Ticket ID: {ticketData._id} <br/>
                    Bus Name: {ticketData.bus.name} <br/>
                    Bus Number: {ticketData.bus.bus_no} <br/>
                    Ticket Fare: {ticketData.bus.fare} <br/>
                    Seat Number: {ticketData.seat_no} <br/>
                    Passenger Name: {ticketData.passenger.name} <br/>
                    Passenger Age: {ticketData.passenger.age} <br/>
                    Source: {ticketData.bus.src} <br/>
                    Destination: {ticketData.bus.dest} <br/>
                </Container>
        );
    }

    return (
        <div className="admin-bus-detail" maxWidth="sm">
            <Container style={{textAlign: 'center', marginTop: '35px'}} >
                <Typography variant="h4"  gutterBottom>
                    Admin View
                </Typography>
            </Container>
            {seatsArr}
            <Container style={{textAlign: 'center', marginTop: '15px'}} >
                <Typography variant="h4"  gutterBottom>
                    Seat Info
                </Typography>
                {seatInfo}
            </Container>
        </div>
    );
}

export default AdminBusDetail;