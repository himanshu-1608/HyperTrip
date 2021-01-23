import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import './BusDetail.css';

const BusDetail = (props) => {
    return (
    <div className="bus-detail">
        <Container style={{textAlign: 'center'}} maxWidth="sm">
            <Typography variant="h5" style={{textAlign: 'center'}} gutterBottom>
                Bus 
            </Typography>
        </Container>
    </div>
    );
}

export default BusDetail;