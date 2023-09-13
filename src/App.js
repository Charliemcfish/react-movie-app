import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import waterBackground from './water.gif';
import buttonSound from './button.mp3';
import logo from './logo.png';
import TitleOverlay from './TitleOverlay';
import music from './music.mp3'; // Import the music audio

const API_URL = "http://www.omdbapi.com/?apikey=bc69cb7c";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOverlay, setShowOverlay] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audioRef = useRef(null);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleSearchClick = () => {
    searchMovies(searchTerm);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    searchMovies('Superman');
    // Hide the overlay after 3 seconds
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Event listener to play music on tap (or click)
    const handleTap = () => {
      if (!isMusicPlaying) {
        const musicAudio = new Audio(music);
        musicAudio.play();
        setIsMusicPlaying(true);
      }
    };

    document.body.addEventListener('click', handleTap);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', handleTap);
    };
  }, [isMusicPlaying]);

  // Update the state when music finishes playing
  useEffect(() => {
    const musicAudio = new Audio(music);
    musicAudio.addEventListener('ended', () => {
      setIsMusicPlaying(false);
    });
  }, []);

  return (
    <div className="app" style={{ backgroundImage: `url(${waterBackground})` }}>
      {showOverlay && !isMusicPlaying && <TitleOverlay />}

      <img src={logo} alt="Fishflix Logo" className="logo" />
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearchClick}>
          <img src={SearchIcon} alt="Search" />
        </button>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found! :c</h2>
        </div>
      )}
      <audio ref={audioRef} src={buttonSound}></audio>
    </div>
  );
};

export default App;
