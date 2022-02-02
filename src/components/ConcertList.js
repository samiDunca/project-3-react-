import React from 'react';

import Concert from './Concert';
import classes from './ConcertList.module.css';

const ConcertList = (props) => {
  // console.log(props.concerts[2]);
  return (
    <React.Fragment>
      <div className={classes.concerts_elements_row}>
        <div>City</div>
        <div>Date</div>
        <div>Location</div>
        <div>Capacity</div>
        <div>Sold Tickets</div>
      </div>
      <div className={classes.concerts_container}>
        {props.concerts.map((concert, i) => (
          <Concert
            key={i}
            id={concert.id}
            data={concert.data}
            city={concert.city}
            location={concert.location}
            capacity={concert.capacity}
            soldTickets={concert.soldTickets}
            onDeleteConcert={props.onDeleteConcert}
            onUpdateConcert={props.onUpdateConcert}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ConcertList;
