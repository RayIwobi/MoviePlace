import React, {useEffect, useState} from 'react';
import './MovieApp.css';
import searchn from './searchn.png';
import MovieCard from './MovieCard';

import axios from 'axios'

function Movieapp() {
    //fbbceb8 : this key was gotten from https://www.omdbapi.com/apikey.aspx 
    //after filling the form, sent to my email


    const [movies, setMovies] = useState([]);
    const [SearchTerm, setSearchTerm] = useState();


    const API_URL = 'https://www.omdbapi.com?apikey=fbbceb8';

    // const movie1 = {   this static info was used before to get correct values
    //   'Title' : 'Amazing Spiderman Syndrome',
    //   'Year': '2012',
    //   'imdbID': 'tt2586634',
    //   'Type' : 'movie',
    //   'Poster': 'N/A'
    // }

  
    
    const searchMovies = async (title) => {
        //const response = await //fetch(`${API_URL}&s=${title}`)

        axios.get(`${API_URL}&s=${title}`).then((response) => {
          setMovies(response.data.Search)
        })
        .catch((err) => console.log(err));
        
        //const data = await response.json();

        //setMovies(data.Search)
    }

    useEffect(() => {
      searchMovies('') 
    },[setMovies])
  
    const handleChange = (e) => {
      setSearchTerm(e.target.value)
    }
    
    const handleSearch = () => {
      searchMovies(SearchTerm)
    }


    return (
    <div className='app'>
      <h1>MoviePlace</h1>
      <h4 style={{color:'white'}}>This is a movie app that demonstrates the use of a movie api to display content based on search</h4>

      <div className='search input'>
        <input type='text' placeholder='search for movies' value={SearchTerm} onChange={handleChange}/>
        <img src={searchn} alt='search' onClick={handleSearch}/>
      </div>

      <div className='search'>

        

      <div className='container2'>
        {
          movies?.length > 0 ?
          (<div className='container'>
            {movies.map((movie) => {
              return <MovieCard movie={movie} className='moviecard'/>
            })}
          </div>
          ):
          (
            <div className='empty'>
              <h3>No movie found</h3>
            </div>
          )
        }
        
      </div>
    </div>
    </div>
  )
}

export default Movieapp
