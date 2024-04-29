"use client"

import React, { useState, useEffect, useMemo } from 'react';

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'

// import MoviesFromDB from '../../../pages/api/movies';

const MoviesPage = () => {
  // State to store movies data
  const [moviesData, setMoviesData] = useState([]);

  const data = [
    {
      title: 'First',
      year: '2011',
      plot: 'very small',
      rated: 'U'
    },
    {
      title: 'Seconf',
      year: '2012',
      plot: 'small',
      rated: 'U'
    },
    {
      title: 'Third',
      year: '2013',
      plot: 'big',
      rated: 'A'
    },
    {
      title: 'Fourth',
      year: '2014',
      plot: 'very big',
      rated: 'R'
    },
  ]

  const columns = useMemo(
    () => [
      {
        header: 'Title',
        accessorKey: 'title',
        enableHiding: false
      },
      {
        header: 'Year',
        accessorKey: 'year',
        enableHiding: false
      },
      {
        header: 'Plot',
        accessorKey: 'plot',
        enableHiding: false
      },
      {
        header: 'Rated',
        accessorKey: 'rated',
        enableHiding: false
      }
    ]
  )

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

  const table = useMaterialReactTable({
    enableStickyHeader: true,
    enableStickyFooter: true,
    columns,
    data,
    // mrtTheme.baseBackgroundColor: 'blue'
  });

  return (
    <div>
      <h1>Movies Page</h1>
      <ul>
        {/* Render movies data */}
        {moviesData.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
      <MaterialReactTable table={table} />;
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
