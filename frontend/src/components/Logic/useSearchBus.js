import httpReq from '../../utils/http-req';
import BusItem from '../Atoms/BusItem/BusItem';
import React, { useEffect, useState } from 'react';

const useSearchBus = () => {
    const [src, setSrc] = useState('');
    const [srcError, setSrcError] = useState(false);
    const [srcMessage, setSrcMessage] = useState('Please select your source/starting point');
    const [dest, setDest] = useState('');
    const [destError, setDestError] = useState(false);
    const [destMessage, setDestMessage] = useState('Please select your destination/ending point');
    const [progress, setProgress] = useState(false);
    const [buses, setBuses] = useState([]);
    const [querySent, setQuerySent] = useState(false);
    const [busList, setBusList] = useState();
    const locations = [
        {
            value: 'Haryana',
            label: 'Haryana',
        },
        {
            value: 'Punjab',
            label: 'Punjab',
        },
        {
            value: 'New Delhi',
            label: 'New Delhi',
        },
        {
            value: 'UP',
            label: 'UP',
        },
        {
            value: 'Kurukshetra',
            label: 'Kurukshetra',
        },
    ];
    useEffect(() => {
        if (buses && buses.length > 0) {
            setBusList(
                buses.map((object, index) => {
                    return (
                        <BusItem
                            key={index}
                            bus_no={object.bus_no}
                            bus_name={object.name}
                            bus_fare={object.fare}
                            src_time={new Date(Date.parse(object.src_time))}
                            bus_src={object.src}
                            dest_time={new Date(Date.parse(object.dest_time))}
                            bus_dest={object.dest}
                            id={object._id}
                            bus_tickets={object.tickets}
                        />
                    );
                })
            );
        }
    }, [buses]);

    const changeSrcHandler = (event) => setSrc(event.target.value);
    const changeDestHandler = (event) => setDest(event.target.value);
    const getBusesHandler = async (event) => {
        event.preventDefault();
        setProgress(true);
        if (src.trim() === '') {
            setSrcError(true);
            setSrcMessage('Please choose one of the source provided');
            setProgress(false);
            return;
        } else {
            setSrcError(false);
            setSrcMessage('Please select your source/starting point');
        }
        if (dest.trim() === '') {
            setDestError(true);
            setDestMessage('Please choose one of the destination provided');
            setProgress(false);
            return;
        } else {
            setDestError(false);
            setDestMessage('Please select your destination/ending point');
        }
        setQuerySent(true);
        const [isHttpError, responseData] = await httpReq(
            '/query/getBuses',
            'POST',
            {
                'Content-type': 'application/json',
            },
            JSON.stringify({
                src: src,
                dest: dest,
            })
        );

        if (isHttpError) {
            setBuses();
        } else {
            setBuses(responseData.buses);
        }
        setProgress(false);
    };
  return {
      src,
      dest,
      buses,
      busList,
      srcError,
      progress,
      destError,
      locations,
      querySent,
      srcMessage,
      destMessage,
      getBusesHandler,
      changeSrcHandler,
      changeDestHandler
  };
};
export default useSearchBus;
