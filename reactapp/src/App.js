import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { 
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  Button, 
  Popover, 
  PopoverHeader, 
  PopoverBody,
 } from 'reactstrap';
 import { ListGroup, ListGroupItem } from 'reactstrap';
 

import Movie from './components/Movie'

function App() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  const [moviesCount, setMoviesCount] = useState(0);
  const [moviesWishList, setMoviesWishList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);



  useEffect(() => {
    async function loadData() {
      const rawMovies = await fetch('/new-movies');
      const movies = await rawMovies.json();
      setMoviesList(movies);
    }
    loadData();
  }, [])
  
  
  const handleClickAddMovie = (isLikeOrNot, name, image) =>{
    if(isLikeOrNot){
      setMoviesCount(moviesCount+1)
    }
    console.log('image film',image)
    console.log('name', name)
    setMoviesWishList([...moviesWishList, {name:name, image:image}]) 
    console.log(moviesWishList)
  }

  let whishList = [];
  for (let index = 0; index < moviesWishList.length; index++){
      whishList.push(<ListGroupItem>
        <img width="25%" src={moviesWishList[index].image}></img>{moviesWishList[index].name} 
      </ListGroupItem>)
  }

  const handleClickDeleteMovie = (deletedMovie) => {
    setMoviesWishList(moviesWishList.filter((movieToDelete)=>{return movieToDelete !== deletedMovie}))
    setMoviesCount(moviesCount-1)
    
  }

  var movieList = moviesList.map((movie,i) => {
    var movieDescription = movie.overview
    if (movie.overview.length>80){
      movieDescription = movie.overview.slice(0, 80) + "..."
    }
    return(<Movie key={i} movieName={movie.title} movieDesc={movieDescription} movieImg={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} globalRating={movie.vote_average} globalCountRating={movie.vote_count} handleClickParent={handleClickAddMovie} handleClickDeleteMovieParent={handleClickDeleteMovie} />)
  })


  return (
    <div style={{backgroundColor:"#232528"}}>
      <Container>
          <Nav>
              <span className="navbar-brand">
                <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" alt="logo" />
              </span>
              <NavItem>
                <NavLink style={{color:'white'}}>Last Releases</NavLink>
              </NavItem>
              <Button id="Popover1" type="button">
                {moviesCount} Film
              </Button>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                <PopoverHeader>Wish List</PopoverHeader>
                <PopoverBody>
                  <ListGroup>
                    {whishList} 
                  </ListGroup>
                </PopoverBody>
              </Popover>
          </Nav>
          <Row>
            {movieList} 
          </Row>
      </Container>
    </div>
  );
}

export default App;
