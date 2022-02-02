import React, { useRef } from 'react';
import useInput from '../hooks/use-input';

import classes from './create-concert.module.css';
const CreateConcert = (props) => {
  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim('') !== '');

  const {
    value: enteredLocation,
    isValid: enteredLocationIsValid,
    hasError: locationInputHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
    reset: resetLocationInput,
  } = useInput((value) => value.trim('') !== '');

  const { value: enteredCapacity, reset: resetCapacityInput } = useInput(
    (value) => value.trim('') !== ''
  );

  let formIsValid = false;

  if (enteredCityIsValid && enteredLocationIsValid) {
    formIsValid = true;
  }

  const cityRef = useRef('');
  const dateRef = useRef('');
  const locationRef = useRef('');
  const capacityRef = useRef('');
  const soldTicketsRef = useRef('');

  const submitHandler = (event) => {
    event.preventDefault();

    if (!enteredCityIsValid && !enteredLocationIsValid) {
      return;
    }

    // could add validation here...

    const concert = {
      city: cityRef.current.value,
      data: dateRef.current.value,
      location: locationRef.current.value,
      capacity: capacityRef.current.value,
      soldTickets: soldTicketsRef.current.value,
    };

    props.onAddConcert(concert);
    resetCityInput();
    resetLocationInput();
    resetCapacityInput();
  };

  const cityInputClasses = cityInputHasError ? 'invalid' : 0;
  const locationInputClasses = locationInputHasError ? 'invalid' : 0;
  return (
    <form onSubmit={submitHandler} className={classes.create_concert}>
      <h1>Create Concert</h1>
      <div className={classes.create_display}>
        <div className={cityInputClasses}>
          <input
            className={classes.input}
            type="text"
            placeholder="City"
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            value={enteredCity}
            ref={cityRef}
          />
          {cityInputHasError && (
            <p className={classes.small_error_text}>City must not be empty</p>
          )}
        </div>
        <div>
          <input className={classes.input} type="date" ref={dateRef} />
        </div>
        <div className={locationInputClasses}>
          <input
            className={classes.input}
            type="text"
            placeholder="Location"
            onChange={locationChangeHandler}
            onBlur={locationBlurHandler}
            value={enteredLocation}
            ref={locationRef}
          />
          {locationInputHasError && (
            <p className={classes.small_error_text}>
              Location must not be empty
            </p>
          )}
        </div>
        <div>
          <input
            className={classes.input}
            type="number"
            placeholder="Capacity"
            ref={capacityRef}
          />
        </div>
        <div>
          <input
            className={classes.input}
            type="number"
            placeholder="Sold Tickets"
            ref={soldTicketsRef}
          />
        </div>
        <div>
          <button className={classes.submit_btn}>
            Create <span>&rarr;</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateConcert;
