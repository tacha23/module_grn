// src/app/movies/page.js

"use client"

import React, { useState, useEffect } from 'react';

// import MoviesFromDB from '../../../pages/api/movies';

const MoviesPage = () => {
  // State to store movies data
  const [moviesData, setMoviesData] = useState([]);

  // Fetch movies data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/movies');
        console.log("response", response);
        if (!response.ok) {
          throw new Error('Failed to fetch movies data');
        }
        const { movies } = await response.json();
        console.log("fetched movies", movies);
        setMoviesData(movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Movies Page</h1>
      <ul>
        {/* Render movies data */}
        {moviesData.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

// Pass movies data fetched from API route as props
// export async function getServerSideProps() {
//   try {
//     const response = await fetch('http://localhost:3000/api/movies');
//     if (!response.ok) {
//       throw new Error('Failed to fetch movies data');
//     }
//     const { movies } = await response.json();

//     return {
//       props: {
//         movies,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         movies: [],
//       },
//     };
//   }
// }

export default MoviesPage;
