import httpReq from '../../utils/http-req';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import {useState, useContext} from 'react';

const useAuth = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [authError, setAuthError] = useState('');

    const emailChangeHandler = (e) => setAdminEmail(e.target.value);
    const passwordChangeHandler = (e) => setAdminPassword(e.target.value);

    const submitAuthHandler = async (e) => {
        e.preventDefault();
        const [isHttpError, responseData] = await httpReq(
            '/auth/login',
            'POST',
            {
                'Content-Type': 'application/json',
            },
            JSON.stringify({
                email: adminEmail,
                password: adminPassword,
            })
        );
        if (!isHttpError) {
            auth.login(responseData.token, responseData.adminEmail);
            history.push('/search');
        } else {
            setAuthError(responseData.message);
        }
  };


  return {
      adminEmail,
      adminPassword,
      authError,
      emailChangeHandler,
      passwordChangeHandler,
      submitAuthHandler
  };
};
export default useAuth;
