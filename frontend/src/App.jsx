import React, { useEffect, useState } from 'react'
import {
  Button,
  Rating,
  Spinner,
  Carousel,
  Dropdown,
  Drawer,
} from 'flowbite-react'

import MovieListSettings from './components/MovieListSettings'

const customBlue500 = '#3086BD'
// 'custom-gray-900': '#1E2126',
// 'custom-gray-600': '#4F5052',

const App = (props) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [movieGenres, setMovieGenres] = useState([])
  const [genres, setGenres] = useState([])
  // This is the state of the movies that will appear on the website
  const [showMovies, setShowMovies] = useState([])

  const fetchMovies = () => {
    return fetch('http://localhost:8000/movies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data)
      })
  }

  const fetchMovieGenres = () => {
    return fetch('http://localhost:8000/movie-genres')
      .then((response) => response.json())
      .then((data) => {
        setMovieGenres(data)
      })
  }

  const fetchGenres = () => {
    return fetch('http://localhost:8000/genres')
      .then((response) => response.json())
      .then((data) => {
        setGenres(data)
      })
  }

  // Execute all fetch operations
  useEffect(() => {
    fetchMovies()
    fetchMovieGenres()
    fetchGenres()
  }, [])

  // On first website load, load the movies into showMovies State
  useEffect(() => {
    if (movies.length > 0 && movieGenres.length > 0 && genres.length > 0) {
      let copyMoviesState = JSON.parse(JSON.stringify(movies))
      setShowMovies(copyMoviesState)
    }
  }, [movies, movieGenres, genres])

  // Remove loading screen after all the data is loaded
  useEffect(() => {
    if (showMovies.length > 0) {
      setLoading(false)
    }
  }, [showMovies])

  return (
    <Layout>
      <Heading />
      <HeroBanner movies={movies} loading={loading} />
      <MovieListSettings
        loading={loading}
        genres={genres}
        movies={movies}
        movieGenres={movieGenres}
        setShowMovies={setShowMovies}
        showMovies={showMovies}
      />
      <MovieList loading={loading}>
        {showMovies.map((item, key) => (
          <MovieItem key={key} {...item} />
        ))}
      </MovieList>
    </Layout>
  )
}

const Layout = (props) => {
  return (
    <section className="bg-custom-gray-900 min-h-screen">
      <div className="">{props.children}</div>
    </section>
  )
}

const Heading = (props) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 bg-custom-gray-900 z-10 shadow-2xl col-start-2">
      <h1 className="flex gap-3 mb-1 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        <span className="text-white">Capri</span>
        <span className="text-custom-blue-500">Movies</span>
      </h1>
      <p className="font-light text-white text-lg">
        Explore the whole collection of movies
      </p>
    </div>
  )
}

const HeroBanner = (props) => {
  if (props.loading) {
    return <div className=""></div>
  }
  return (
    <div className="h-[500px] xl:h-[576px] 2xl:h-[700px]">
      <Carousel slideInterval={5000} pauseOnHover={true} indicators={false}>
        {props.movies.map((item, key) => {
          return (
            <div
              className={`relative flex text-white h-full`}
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              key={key}>
              <div className="w-full z-10 flex items-center px-20">
                <div className="mx-auto md:ml-[10%] max-w-[600px] flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 ">
                      <span>{item.duration ? item.duration : null}</span>
                      <span>
                        {item.rating ? (
                          <Rating>
                            <Rating.Star />
                            <span className="ml-0.5">{item.rating}</span>
                          </Rating>
                        ) : null}
                      </span>
                    </div>
                    <h2 className="text-4xl font-bold">{item.title}</h2>
                  </div>
                  <p className="text-lg overflow-hidden line-clamp-4">
                    {item.plot}
                  </p>
                  {item.wikipediaUrl ? (
                    <Button
                      className="bg-custom-blue-500 text-2xl font-semibold flex justify-center rounded py-2 max-w-72"
                      onClick={() => window.open(item.wikipediaUrl, '_blank')}>
                      More
                    </Button>
                  ) : null}
                </div>
              </div>
              {/* Add dark overlay */}
              <div className="before:absolute before:inset-0 before:bg-black before:opacity-50"></div>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

const MovieList = (props) => {
  if (props.loading) {
    return (
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 px-2">
      {props.children}
    </div>
  )
}



const MovieItem = (props) => {
  return (
    <div className="flex flex-col w-full h-full rounded-lg shadow-md lg:max-w-sm bg-custom-gray-600">
      <div className="grow">
        <img
          className="object-cover w-full h-60 md:h-80"
          src={props.imageUrl}
          alt={props.title}
          loading="lazy"
        />
      </div>

      <div className="grow flex flex-col h-full p-3">
        <div className="grow mb-3 last:mb-0">
          {props.year || props.rating ? (
            <div className="flex justify-between align-middle text-gray-300 text-xs font-medium mb-2">
              <span>{props.year}</span>

              {props.rating ? (
                <Rating>
                  <Rating.Star />

                  <span className="ml-0.5">{props.rating}</span>
                </Rating>
              ) : null}
            </div>
          ) : null}

          <h3 className="text-gray-300 text-lg leading-tight font-semibold mb-1">
            {props.title}
          </h3>

          <p className="text-gray-400 text-sm leading-normal mb-4 last:mb-0">
            {props.plot.substr(0, 80)}...
          </p>
        </div>

        {props.wikipediaUrl ? (
          <Button
            color="light"
            size="xs"
            className="w-full"
            onClick={() => window.open(props.wikipediaUrl, '_blank')}>
            More
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default App
