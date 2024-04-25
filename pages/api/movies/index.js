import React from 'react'

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}  

const MoviesFromDB = ({ movies }) => {

    // return (
    //     <div>
    //         <h1>Hello from DB</h1>
    //     </div>
    // )
}

export default MoviesFromDB


export const getServerSideProps = async () => {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const movies = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .limit(20)
            .toArray();
        console.log("typeof movies", typeof movies);
        console.log("movies 1", movies[0]);
        console.log("movies 2", Object.keys(movies));
        // res.status(200).json({ movies });
        // props: {JSON.parse(JSON.stringify(res.status(200).json({ movies })))};
        return {
            props: { movies: JSON.parse(JSON.stringify(movies)) },
        };
    } catch (e) {
        console.error(e);
        // res.status(500).json({ error: 'Error fetching movies' });
        // props: { movies: [] }
        return { props: { movies: [] } };
    }
};

// function fetchedMovies() {
//     return (
//         <div>
//             <h2>Movies from DB</h2>
//             {/* <ul>
//                 {
//                     movies.map((movie) => {
//                         <li key={movie._id}>
//                             <p>{ movie.title }</p>
//                             <p>{ movie.year }</p>
//                         </li>
//                     })
//                 }
//             </ul> */}
//         </div>
//     )
// }


// export default fetchedMovies