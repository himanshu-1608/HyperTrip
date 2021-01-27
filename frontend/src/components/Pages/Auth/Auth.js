import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './Auth.css';
import useAuth from '../../Logic/useAuth';

const Auth = () => {
    const {
        authError,
        adminEmail,
        adminPassword,
        submitAuthHandler,
        emailChangeHandler,
        passwordChangeHandler,
    } = useAuth();

    return (
        <div class="auth-page">
            <Container maxWidth="sm" >
                <Typography variant="h4" style={{textAlign:'center',fontSize:'50px'}}  gutterBottom>
                    Admin Login Here
                </Typography>
            </Container>

            <form style={{ marginTop: '50px'}} onSubmit={submitAuthHandler}>
                <div>
                    <TextField type="email" style={{width: '300px'}} label="Admin Email" value={adminEmail}
                    onChange={emailChangeHandler} helperText="Add Admin Email ID"
                    variant="filled"/>
                </div>
                <div>
                    <TextField type="password" style={{width: '300px', marginTop: '50px'}} label="Admin Password" value={adminPassword}
                    onChange={passwordChangeHandler} helperText="Add Admin Password"
                    variant="filled"/>
                </div>
                {authError && authError.length>0 && (
                <div style={{marginTop: '20px', backgroundColor: 'purple', color: 'white'}} id="auth-error">
                    {authError}
                </div> )
                }
                <div style={{width:'100%',display:'flex',justifyContent:'center',padding:'40px 0px'}}>
                    <button class="submit-auth-btn" type="submit">Admin Login</button>
                </div>
            </form>
        </div>
    );
};

export default Auth;