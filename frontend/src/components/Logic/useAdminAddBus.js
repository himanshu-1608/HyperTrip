import AuthContext from '../../context/auth-context';
import React, { useContext, useState } from 'react';
import httpReq from '../../utils/http-req';

const useAdminAddBus = () => {
  const auth = useContext(AuthContext);
  const [name, setName] = useState('');
  const [busNo, setBusNo] = useState('');
  const [fare, setFare] = useState('');
  const [src, setSrc] = useState('');
  const [dest, setDest] = useState('');
  const [src_time, setSrcTime] = useState('');
  const [dest_time, setDestTime] = useState('');
  const [createStatus, setCreateStatus] = useState();

  const changeNameHandler = (e) => setName(e.target.value);
  const changeBusHandler = (e) => setBusNo(e.target.value);
  const changeFareHandler = (e) => setFare(e.target.value);
  const changeSrcHandler = (e) => setSrc(e.target.value);
  const changeDestHandler = (e) => setDest(e.target.value);
  const changeSrcTimeHandler = (e) => setSrcTime(e.target.value);
  const changeDestTimeHandler = (e) => setDestTime(e.target.value);

  const addBusHandler = async () => {
    const [isHttpError, responseData] = await httpReq(
      '/admin/addBus',
      'POST',
      {
        authorization: `Bearer ${auth.token}`,
        'Content-type': 'application/json',
      },
      JSON.stringify({
        name: name,
        bus_no: busNo,
        fare: fare,
        src: src,
        dest: dest,
        src_time: src_time,
        dest_time: dest_time,
      })
    );
    if (!isHttpError) {
      setCreateStatus(<div style={{ textAlign: 'center' }}>Bus Created!</div>);
    } else {
      setCreateStatus(
        <div style={{ textAlign: 'center' }}>Bus Creation Failed!</div>
      );
    }
  };
  return {
    name,
    busNo,
    fare,
    src,
    dest,
    src_time,
    dest_time,
    createStatus,
	 addBusHandler,
	 changeSrcHandler,
    changeBusHandler,
	 changeFareHandler,
	 changeNameHandler,
    changeDestHandler,
	 changeDestTimeHandler,
	 changeSrcTimeHandler,
  };
};
export default useAdminAddBus;
