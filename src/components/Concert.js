import React, { useCallback, useState } from 'react';

import { createContext, useMemo, useContext } from 'react';

import classes from './Concert.module.css';

const Concert = (props) => {
  const [concerts, updateConcerts] = useState({});

  const ConcertContext = createContext({
    concerts,
    updateConcerts,
  });

  const value = useMemo(() => ({ concerts, updateConcerts }), [concerts]);

  // format the date
  function dateStrictFormat(date) {
    const now = new Date(date);
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const deleteButtonHandler = () => {
    const concertID = props.id;
    props.onDeleteConcert(concertID);
  };

  const updateButtonHandler = () => {
    const concertID = props.id;
    props.onUpdateConcert(concertID);
  };
  return (
    <div className={classes.concerts_row}>
      <div>{props.city}</div>
      <div>{dateStrictFormat(props.data)}</div>
      <div>{props.location}</div>
      <div>{props.capacity}</div>
      <div>{props.soldTickets}</div>
      <div>
        <button className={classes.btn_delete} onClick={deleteButtonHandler}>
          Delete <span>&rarr;</span>
        </button>
      </div>
      <div>
        <button className={classes.btn_update} onClick={updateButtonHandler}>
          Update <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default Concert;
