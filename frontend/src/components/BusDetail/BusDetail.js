import React, { useCallback, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';

import httpReq from '../../utils/http-req';

import './BusDetail.css';

const BusDetail = (props) => {
    const [busData, setBusData] = useState();

    const busId = useParams().busId;
    const updateSeats = useCallback(async()=> {
        const [isHttpError, responseData] = await httpReq(`/query/bus/${busId}`);
        console.log(responseData.bus);
        if(!isHttpError) {
            const bus_time = new Date(Date.parse(responseData.bus.bus_time));
            setBusData({
                ...responseData.bus,
                bus_time: bus_time
            });
        } else {
            setBusData();
        }
    });

    useEffect(()=> {
        updateSeats();
    });
    return (
    <div className="bus-detail">
        <Container style={{textAlign: 'center', marginTop: '35px'}} maxWidth="sm">
            {!busData && (
                <Container style={{textAlign: 'center', marginTop: '35px'}} maxWidth="sm">
                    <Typography variant="h4" style={{textAlign: 'center'}} gutterBottom>
                        No bus found!!!
                    </Typography>
                </Container>
            )}
            {busData && (
            <React.Fragment>
            <Typography variant="h4" style={{textAlign: 'center'}} gutterBottom>
                Book Tickets for Bus here
            </Typography>
            <div>
                Name of Bus: {busData.name}<br/>
                Bus Number: {busData.bus_no} <br />
                Departs from: {busData.src} <br />
                Departure Date: {busData.bus_time.getDate()}/
                {''+busData.bus_time.getMonth()+1}/
                {busData.bus_time.getFullYear()} <br />
                Depareture Time: {busData.bus_time.getHours()}:
                {busData.bus_time.getMinutes()}:
                {busData.bus_time.getSeconds()} <br />
                Arrival to: {busData.dest} <br />
                Tickets left: {40 - busData.tickets.length}
            </div>
            
            </React.Fragment>
            )}
        </Container>
    </div>
    );
}

export default BusDetail;