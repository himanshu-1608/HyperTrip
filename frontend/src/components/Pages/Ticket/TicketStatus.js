import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import './TicketStatus.css';
import useTicketStatus from '../../Logic/useTicketStatus';

const TicketStatus = () => {
    const {
        ticketId,
        changeTicketHandler,
        checkTicketStatus,
        progress,
        userCard
     } = useTicketStatus();
    return (
        <div className="ticket-status">
            <Container style={{ textAlign:'center', marginTop: '50px'}}>
                <Typography variant="h3" gutterBottom>
                    Check Your Ticket Status Here
                </Typography>
            </Container>
            <Container style={{textAlign:'center',padding:'100px 0px'}} maxWidth="lg">
                <TextField label="Passenger Ticket ID"
                    value={ticketId}
                    style={{width: '400px'}}
                    onChange={changeTicketHandler}
                    variant="filled" />
                <div style={{width:'100%', textAlign:'center', padding:'50px 0px'}}>
                    <Button onClick={checkTicketStatus} variant="contained" style={{ backgroundColor: 'lightgreen'}}>Check Status</Button>
                </div>
            </Container>
            {progress && (
                <Container style={{textAlign: 'center'}} maxWidth="sm">
                    <CircularProgress />
                </Container>
            )}
            {userCard}
        </div>
    );
}

export default TicketStatus;