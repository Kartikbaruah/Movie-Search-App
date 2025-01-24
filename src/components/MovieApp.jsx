import React, { useEffect, useState } from 'react'
import './MovieApp.css'
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';

const MovieApp = () => {
  const [movies, setMovies] = useState ([]);

  const [searchQuery, setSearchQuery] = useState('');

  const [sortBy, setSortBy] =  useState('popularity.desc');

  const [genres, setGenres] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState('');
  
  const [expandedMovieId, setExpendedMovieId] = useState(null);


  useEffect (() => {
    const fetchGenres = async() => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list',
        {
          params: {
          api_key: '7f3f851cdfb50c5e2cc6d014a1e3a15d',
          }
        }
      );
      setGenres(response.data.genres);
    };
    fetchGenres();
  }, []);

  useEffect (() => {
    const fetchMovie = async() => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie',
        {
          params: {
            api_key: '7f3f851cdfb50c5e2cc6d014a1e3a15d',
            sort_by: sortBy,
            page: 1,
            with_genres: selectedGenre,
            query: searchQuery,
          }
        }
      );
      setMovies(response.data.results);
    };
    fetchMovie();
  }, [searchQuery, sortBy, selectedGenre]);

  const handleSearchChange = (event) => {
    setSearchQuery (event.target.value);
  }
  const handleSearchSubmit = async() => {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          api_key: '7f3f851cdfb50c5e2cc6d014a1e3a15d',
          query: searchQuery,
        }
      }
    );

    setMovies(response.data.results);
  }

    const handleSortChange = (event) => {
    setSortBy(event.target.value);
  }

    const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  }

   const toddleDescription = (movieId) => {
   setExpendedMovieId(expandedMovieId === movieId ? null : movieId);
  }

  return (
    <div>
        <h1>MovieMate</h1>
        <div className="search-bar">
          <input type="text" placeholder='Search Movies' value={searchQuery} onChange={handleSearchChange} className='search-input' />
          <button onClick={handleSearchSubmit} className='search-button'>
            <AiOutlineSearch />
          </button>
        </div>
        <div className="filter">
          <label htmlFor='sort-by'>Sort By:</label>
          <select id='sort-by' value={sortBy} onChange={handleSortChange}>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="popularity.desc">Rating Descending</option>
            <option value="popularity.asc">Rating Ascending</option>
            <option value="popularity.desc">Release Descending</option>
            <option value="popularity.asc">Release Ascending</option>
          </select>

          <label htmlFor='genre'>Genre:</label>
          <select id='genre' value={selectedGenre} onChange={handleGenreChange}>
            <option value=''>All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            )
            )};
          </select>
        </div>
        <div className="movie-wrapper">
          {movies.map((movie) => (
            <div key={movie.id} className="movie">
              <div className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
                <div className="movie-info">
                  <h2 className="movie-title">{movie.title}</h2>
                  <p className="rating">Rating: {movie.vote_average.toFixed(1)}</p>
                  <div className="movie-description">
                    {expandedMovieId === movie.id ? (
                      <p>{movie.overview}</p>
                    ) : (
                      <p>{movie.overview.substring(0, 100)}...</p>
                    )}
                  </div>
                  <button onClick={() =>
                    toddleDescription(movie.id)}
                    className='read-more'>
                      {expandedMovieId === movie.id ? 'Show Less' : 'Read More'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

    </div>
  )
}
  
export default MovieApp