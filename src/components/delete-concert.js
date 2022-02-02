import React, { useRef } from 'react';

import classes from './delete-concert.module.css';
const DeleteConcert = (props) => {
  const cityRef = useRef('');
  const locationRef = useRef('');

  const submitHandler = (event) => {
    event.preventDefault();

    const concertData = {
      city: cityRef.current.value,
      location: locationRef.current.value,
    };

    props.onDeleteConcert(concertData);
  };

  return (
    <form onSubmit={submitHandler} className={classes.delete_concert}>
      <h1>Delete Concert</h1>
      <div className={classes.delete_display}>
        <input
          className={classes.input}
          type="text"
          ref={cityRef}
          placeholder="City"
        />
        <input
          className={classes.input}
          type="text"
          ref={locationRef}
          placeholder="Location"
        />

        <div>
          <button className={classes.btn_form_delete}>
            Delete <span>&rarr;</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default DeleteConcert;
