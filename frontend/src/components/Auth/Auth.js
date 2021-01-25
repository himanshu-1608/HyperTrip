import React, {useState, useContext} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './Auth.css';
import AuthContext from '../../context/auth-context';
import httpReq from '../../utils/http-req';
import { useHistory } from 'react-router-dom';

const Auth = (props) => {
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const history = useHistory();

    const auth = useContext(AuthContext);
    
    const submitAuthHandler = async(e) => {
        e.preventDefault();
        const [isHttpError, responseData] = await httpReq('/auth/login',
            'POST', {
                'Content-Type': 'application/json'
            }, JSON.stringify({
                email: adminEmail,
                password: adminPassword
        }));
        if(!isHttpError) {
            auth.login(responseData.token, responseData.adminEmail);
            history.push('/search');
        } else {
            setAuthError(responseData.message);
        }       
    };

    const emailChangeHandler = (e) =>{
        setAdminEmail(e.target.value);
    };
    const passwordChangeHandler = (e) =>{
        setAdminPassword(e.target.value);
    };

    return (
        <div id="auth-page">
            <Container maxWidth="sm" style={{marginTop: '35px'}}>
                <Typography variant="h4" style={{textAlign: 'center'}} gutterBottom>
                    Admin Login Here
                </Typography>
            </Container>

            <form style={{textAlign: 'center', marginTop: '100px'}} onSubmit={submitAuthHandler}>
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
                <button id="submit-auth-btn" type="submit">Admin Login</button>
            </form>
        </div>
    );
};

export default Auth;