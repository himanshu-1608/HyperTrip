import React from 'react';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';

import './BusItem.css';

const BusItem = (props) => {
    return (
    <div>
        <Link style={{textDecoration: 'none'}} to={`/buses/${props.id}`}>
            <div className="bus-item">
                <Container style={{textAlign: "center", padding: '10px'}} maxWidth="sm">
                    Name of Bus: {props.bus_name}<br/>
                    Bus Number: {props.bus_no} <br />
                    Departs from: {props.bus_src} <br />
                    Departure Date: {props.bus_time.getDate()}/
                    {''+props.bus_time.getMonth()+1}/
                    {props.bus_time.getFullYear()} <br />
                    Depareture Time: {props.bus_time.getHours()}:
                    {props.bus_time.getMinutes()}:
                    {props.bus_time.getSeconds()} <br />
                    Arrival to: {props.bus_dest} <br />
                    Tickets left: {40 - props.bus_tickets.length}
                </Container>
            </div>
            <Container style={{textAlign: "center", display: 'flex'}} maxWidth="sm">
                <div style={{height: '100px', width: '100px', borderRadius: '100px', backgroundColor: 'black'}}/>
                <div style={{marginLeft: '350px', height: '100px', width: '100px', borderRadius: '100px', backgroundColor: 'black'}}/>
            </Container>
        </Link>
    </div>
    );
};

export default BusItem;