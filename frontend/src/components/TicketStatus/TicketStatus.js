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
                <React.Fragment>
                <Container style={{boxShadow: '0px 0px 20px #888888', backgroundColor: '#e6e6e6', padding: '20px', textAlign: 'center', width: '400px', marginBottom: '50px'}}>
                <div style={{display: 'flex'}}>
                    <div style={{borderRadius: '10px', padding: '10px',margin: 'auto', width: '150px', backgroundColor: '#00004d', color: 'white', float: 'left'}}>Hyper Book<br/>Ticketing System</div>
                    <div style={{borderRadius: '10px', padding: '10px',margin: 'auto', width: '150px', backgroundColor: '#00004d', color: 'white', float: 'right'}}>Contact for Query<br/>+919876543210 </div>
                </div>
                <div style={{border: '1px solid black', margin: '10px 50px'}}>
                <strong>Ticket ID</strong> {ticket.id} <br/>
                </div>
                <div style={{border: '1px solid black', margin: '10px 50px'}}>
                    <strong>Bus Details</strong><br />
                    <strong>Bus Name:</strong> {ticket.bus.name} <br/>
                    <strong>Bus Number:</strong> {ticket.bus.bus_no} <br/>
                    <strong>Ticket Fare:</strong> {ticket.bus.fare} <br/>
                    <strong>Seat Number:</strong> {ticket.seat_no} <br/>
                </div>
                <div style={{border: '1px solid black', margin: '10px 50px'}}>
                    <strong>Passenger Details</strong><br />
                    <strong>Passenger Name:</strong> {ticket.passenger.name} <br/>
                    <strong>Passenger Age:</strong> {ticket.passenger.age} <br/>
                </div>
                <div style={{border: '1px solid black', margin: '10px 50px'}}>
                    <strong>Journey Details</strong><br />
                    <strong>Source:</strong> {ticket.bus.src} <br/>
                    <strong>Departure Date:</strong> {ticket.src_time.getDate()}/
                        {ticket.src_time.getMonth()+1}/
                        {ticket.src_time.getFullYear()} <br/>
                    <strong>Departure Time:</strong> {ticket.src_time.getHours()}:
                        {ticket.src_time.getMinutes()}<br/>
                    <strong>Destination:</strong> {ticket.bus.dest} <br/>
                    <strong>Arrival Date:</strong> {ticket.dest_time.getDate()}/
                {ticket.dest_time.getMonth()+1}/
                {ticket.dest_time.getFullYear()} <br/>
                    <strong>Arrival Time:</strong> {ticket.dest_time.getHours()}:
                {ticket.dest_time.getMinutes()}<br/>
                </div>
            </Container>
            </React.Fragment>
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