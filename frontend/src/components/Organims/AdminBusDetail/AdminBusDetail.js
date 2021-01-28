import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useParams} from 'react-router-dom';
import './AdminBusDetail.css';
import useAdminBusDetails from '../../Logic/useAdminBusDetails';

const AdminBusDetail = () => {
    const busId = useParams().busId;
    const {
        busStatus,
        seatsArr,
        seatInfo,
        removeBus
    } = useAdminBusDetails(busId);
    return (
        <div className="admin-bus-detail" maxWidth="sm">
            <Container style={{textAlign: 'center', marginTop: '35px'}} >
                <Typography variant="h4"  gutterBottom>
                    Admin View
                </Typography>
                <Button onClick={removeBus} variant="contained" style={{margin: '10px auto', border: '4px solid purple', backgroundColor: 'red'}}>Remove Bus Seats</Button>
                {busStatus}
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