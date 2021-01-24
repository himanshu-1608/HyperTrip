import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';

import httpReq from '../../utils/http-req';

import './TicketStatus.css';

const TicketStatus = (props) => {
    
    const [ticketId, setTicketId] = useState('');
    const [progress, setProgress] = useState(false);
    const [userCard, setUserCard] = useState();

    const changeTicketHandler = (event) => {
        setTicketId(event.target.value);
    }

    const checkTicketStatus = async() => {
        if(!ticketId.trim()) {
            return;
        }
        setProgress(true);
        const [isHttpError, responseData] = await httpReq(`/query/ticketInfo/${ticketId}`);
        if(!isHttpError) {
            let ticket = responseData.ticket;
            let src_time = new Date(Date.parse(ticket.bus.src_time));
            let dest_time = new Date(Date.parse(ticket.bus.dest_time));
            ticket = {...ticket, src_time: src_time, dest_time: dest_time};
            setUserCard(
                <Container style={{boxShadow: '0px 0px 20px #888888', backgroundColor: '#e6e6e6', padding: '20px', textAlign: 'center', width: '500px', marginBottom: '50px'}}>
                    Ticket ID: {ticket.id} <br/>
                    Bus Name: {ticket.bus.name} <br/>
                    Bus Number: {ticket.bus.bus_no} <br/>
                    Ticket Fare: {ticket.bus.fare} <br/>
                    Seat Number: {ticket.seat_no} <br/>
                    Passenger Name: {ticket.passenger.name} <br/>
                    Passenger Age: {ticket.passenger.age} <br/>
                    Source: {ticket.bus.src} <br/>
                    Departure Date: {ticket.src_time.getDate()}/
                    {ticket.src_time.getMonth()+1}/
                    {ticket.src_time.getFullYear()} <br/>
                    Departure Time: {ticket.src_time.getHours()}:
                    {ticket.src_time.getMinutes()}<br/>
                    Destination: {ticket.bus.dest} <br/>
                    Arrival Date: {ticket.dest_time.getDate()}/
                    {ticket.dest_time.getMonth()+1}/
                    {ticket.dest_time.getFullYear()} <br/>
                    Arrival Time: {ticket.dest_time.getHours()}:
                    {ticket.dest_time.getMinutes()}<br/>
                </Container>
            );
        } else {
            setUserCard(
                <Container style={{boxShadow: '0px 0px 20px #888888', backgroundColor: '#e6e6e6', padding: '20px', textAlign: 'center', width: '200px'}}>
                    No User Found
                </Container>
            );
        }
        setProgress(false);
    }

    return <div className="ticket-status">
        <Container style={{textAlign: 'center', marginTop: '50px'}}>
            <Typography variant="h3" gutterBottom>
                Check Your Ticket Status Here
            </Typography>
        </Container>
        <Container style={{margin: '100px'}} maxWidth="lg">
            <TextField label="Passenger Ticket ID"
                value={ticketId}
                style={{width: '400px'}}
                onChange={changeTicketHandler}
                variant="filled" />
            <Button onClick={checkTicketStatus} variant="contained" style={{display: 'block', margin:'50px 0px', backgroundColor: 'lightgreen'}}>Check Status</Button>
        </Container>
        {progress && (
            <Container style={{textAlign: 'center'}} maxWidth="sm">
                <CircularProgress />
            </Container>
        )}
        {userCard}
    </div>
}

export default TicketStatus;