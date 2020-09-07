// Step 2 - Set up MovieList components with ICE
// Step 3 - Get Films from Ghibli
// Step 4 - Use state to capture response from API GET request.
// Step 5 - Add dependency array to only call useEffect ONCE
// Step 7 - Use MovieCard in MovieList
// Step 9 - Fix key error with each MovieCard
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default function MovieList() {
  /*
  Convention: API requests should be captured in useEffect effect funtion and response
  should be stored in state. This state variable will be set to a default value - often
  times that's [] or "" or false, depending on the data being returned from the API. 
  
  Since JSX is rendered BEFORE the effect fn is called, the default state value will 
  render in the UI before the call to the API. If the call to the API takes awhile,
  then we have a default view already shown and painted to the browser as our data
  takes its time returning to our .then(). Once we update state with the values from
  the API, (A STATE CHANGE) our component rerenders with that value, updating the JSX.
  */

  // 1. starts reading component top to bottom
  // 6. state change causes MovieList component to rerender. films === array of films from API
  const [films, setFilms] = useState([]);

  const effectFn = () => {
    // 4. the effect fn is pulled from the waiting room and fired!
    axios
      .get("https://ghibliapi.herokuapp.com/films")
      .then(response => {
        console.log(response);
        // 5. STATE CHANGE! update films to Array of film objs
        setFilms(response.data); // response.data = Array[film objs]
      })
      .catch(error => console.log(error));
  };

  // 2. sees useEffect hook & queues like a waiting room the effect fn (first param)
  // 7. useEffect has dependency array of [], so effectFn IS NOT QUEUED.
  useEffect(effectFn, []);
  /*
  Dependency Arrays in useEffect:
  [] --> Means that we will only call the effect fn ONCE, directly after the initial render
  [stateVariable, propVariable] --> Include any number of state variables or prop variables in the dependency array. 
                    The effect fn will call after initial render and when one of these variable changes in value. (see dog project for example)
  empty --> run the effect fn after every rerender of the JSX. This caused an infinite loop before we added the dependency array in class.
  */

  // 3. initial render of content in return. films === []
  // 8. component renders with films === [film objs]. NO EFFECTFN is called b/c of dependency array []
  return (
    <div className="film">
      {films.map(film => (
        <MovieCard key={film.id} film={film} />
      ))}
    </div>
  );
}
