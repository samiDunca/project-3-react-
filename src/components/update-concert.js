import { React, useCallback, useEffect, useState } from 'react';

import classes from './update-concert.module.css';
import { ConcertContext } from '../concert-page';

const UpdateConcert = (props) => {
  const [newId, setNewId] = useState('');
  const [id, setId] = useState('');
  const [data, setData] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [soldTickets, setSoldTickets] = useState('');
  const { concerts, setConcerts } = ConcertContext;

  if (newId != props.sendID) {
    setNewId(props.sendID);
    props.concerts.map((concertData) => {
      if (concertData.id === props.sendID) {
        return (
          setId(concertData.id),
          setData(concertData.data),
          setCity(concertData.city),
          setLocation(concertData.location),
          setCapacity(concertData.capacity),
          setSoldTickets(concertData.soldTickets)
        );
      }
    });
  }

  // const getConcerts = useCallback(() => {
  //   props.concerts.map((concertData) => {
  //     if (concertData.id === props.sendID) {
  //       return (
  //         setId(concertData.id),
  //         setData(concertData.data),
  //         setCity(concertData.city),
  //         setLocation(concertData.location),
  //         setCapacity(concertData.capacity),
  //         setSoldTickets(concertData.soldTickets)
  //       );
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   getConcerts();
  // }, [getConcerts]);

  console.log(props.sendID);
  console.log(city);
  console.log(location);
  console.log(id);
  console.log('-----------');

  const submitHandler = (event) => {
    event.preventDefault();

    const concert = {
      city,
      data,
      location,
      capacity,
      soldTickets,
      id: props.sendID,
    };
    console.log(concert);
    props.onModifyConcert(concert);
  };

  return (
    <form onSubmit={submitHandler} className={classes.update_concert}>
      <h1>Update Concert</h1>
      <div className={classes.update_display}>
        <input
          className={classes.input}
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <input
          className={classes.input}
          type="date"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <input
          className={classes.input}
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <input
          className={classes.input}
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => {
            setCapacity(e.target.value);
          }}
        />
        <input
          className={classes.input}
          type="number"
          placeholder="Sold Tickets"
          value={soldTickets}
          onChange={(e) => {
            setSoldTickets(e.target.value);
          }}
        />
        <div>
          <button className={classes.submit_btn}>
            Update <span>&rarr;</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateConcert;
