import React from 'react';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';

import './BusItem.css';

const BusItem = (props) => {
    return (
    <div>
        <Link style={{textDecoration: 'none'}} to={`/buses/${props.id}`}>
            <div className="bus-item" style={{display: 'flex'}}>
                <Container style={{textAlign: "center", padding: '10px'}} maxWidth="sm">
                    Name of Bus: {props.bus_name}<br/>
                    Bus Number: {props.bus_no} <br />
                    Bus Fare: {props.bus_fare} <br />
                    Departs from: {props.bus_src} <br />
                    Departure Date: {props.src_time.getDate()}/
                    {''+props.src_time.getMonth()+1}/
                    {props.src_time.getFullYear()} <br />
                    Departure Time: {props.src_time.getHours()}:
                    {props.src_time.getMinutes()} <br />
                    Arrives to: {props.bus_dest} <br />
                    Arrival Date: {props.dest_time.getDate()}/
                    {''+props.dest_time.getMonth()+1}/
                    {props.dest_time.getFullYear()} <br />
                    Arrival Time: {props.dest_time.getHours()}:
                    {props.dest_time.getMinutes()}<br />
                    Tickets left: {40 - props.bus_tickets.length}
                </Container>
                <img style={{position: 'relative', top: '0px', left: '00px', padding: '20px'}} src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wE4sZx8MTgOpbMKRj7oY4LG2tXhnZkW0Cg&usqp=CAU`} />
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