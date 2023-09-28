
import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import Form from './components/Form'

function App() {
  const [movies, setMovies] = useState([]);
  const [message, showMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const [retryInterval, setRetryInterval] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    setRetrying(false); // Reset retrying flag

    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('SOMETHING WENT WRONG! RETRYING...');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformedMovies);
    } catch (error) {
      // Handle errors here
      setError(error.message);

      // Start retrying if not already retrying
      if (!retrying) {
        setRetrying(true);
        const intervalId = setInterval(fetchMoviesHandler, 5000); // Retry every 5 seconds
        setRetryInterval(intervalId);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Function to stop retrying
  function cancelRetryHandler() {
    if (retryInterval) {
      clearInterval(retryInterval);
      setRetryInterval(null);
      setRetrying(false);
    }
  }

  useEffect(() => {
    // Cleanup the interval when the component unmounts
    return () => {
      cancelRetryHandler();
    };
  }, []);

  return (
    <React.Fragment>
      <Form/>
      <section>
        <button onClick={fetchMoviesHandler} >
          Fetch Movies
        </button>
        {retrying && (
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        )}
      </section>
      <section>
        {isLoading && <div>LOADING THE DETAILS...</div>}
        {!isLoading && movies.length === 0 && !error && (
          <div>NO MOVIES FOUND</div>
        )}

        {!isLoading && error && <p>{error}</p>}
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
