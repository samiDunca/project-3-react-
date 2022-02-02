import React, { useState, useContext, createContext, useMemo } from 'react';
import classes from './concert-page.module.css';
import ConcertList from './components/ConcertList';
import CreateConcert from './components/create-concert';
import DeleteConcert from './components/delete-concert';
import UpdateConcert from './components/update-concert';

export const ConcertContext = createContext({
  concerts: {},
  setConcerts: () => {},
});

const ConcertPage = () => {
  const [concerts, setConcerts] = useState([]);
  const [idForUpdate, setIdForUpdate] = useState('');

  const value = useMemo(() => ({ concerts, setConcerts }), [concerts]);

  function fetchConcertHandler() {
    fetch('http://127.0.0.1:3000/api/v1/concerts/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedConcerts = data.data.concerts.map((concertData) => {
          return {
            id: concertData._id,
            data: concertData.data,
            city: concertData.city,
            location: concertData.location,
            capacity: concertData.capacity,
            soldTickets: concertData.soldTickets,
          };
        });
        setConcerts(transformedConcerts);
      });
  }

  async function addConcertHandler(concert) {
    const response = await fetch('http://127.0.0.1:3000/api/v1/concerts/', {
      method: 'POST',
      body: JSON.stringify(concert),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    //rerendering the virtual DOM
    fetchConcertHandler();
  }

  function deleteConcertFunction(concertID) {
    const response = fetch(
      'http://127.0.0.1:3000/api/v1/concerts/' + concertID,
      {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return response;
  }

  //verify if is an object
  function isObject(val) {
    return val instanceof Object;
  }

  function deleteConcertHandler(concertData) {
    for (const concert of concerts) {
      if (isObject(concertData)) {
        if (
          concert.city === concertData.city &&
          concert.location === concertData.location &&
          window.confirm('Are you sure?')
        ) {
          deleteConcertFunction(concert.id);
        }
      } else {
        if (concert.id === concertData && window.confirm('Are you sure?')) {
          deleteConcertFunction(concert.id);
        }
      }
    }
    //rerendering the virtual DOM
    fetchConcertHandler();
  }

  function updateConcertHandler(concertID) {
    setIdForUpdate(concertID);
  }

  const modifyConcertHandler = (concert) => {
    if (idForUpdate === concert.id)
      fetch('http://127.0.0.1:3000/api/v1/concerts/' + idForUpdate, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(concert),
      }).then((result) => {
        result.json().then((resp) => {
          console.warn(resp);
        });
      });
    fetchConcertHandler();
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchConcertHandler}>Fetch Concerts</button>
      </section>
      <section className={classes.concert_page}>
        <ConcertContext.Provider value={value}>
          <ConcertList
            onDeleteConcert={deleteConcertHandler}
            onUpdateConcert={updateConcertHandler}
            concerts={concerts}
          />
          <CreateConcert onAddConcert={addConcertHandler} />
          <UpdateConcert
            sendID={idForUpdate}
            concerts={concerts}
            onModifyConcert={modifyConcertHandler}
          />
          <DeleteConcert onDeleteConcert={deleteConcertHandler} />
        </ConcertContext.Provider>
      </section>
    </React.Fragment>
  );
};

export default ConcertPage;
