import { Dropdown } from 'flowbite-react'
import GenreSidebar from './GenreSidebar'

const MovieListSettings = (props) => {
  const orderByReleaseDate = (movies) => {
    const orderedItems = [...movies].sort(
      (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
    )
    props.setShowMovies(orderedItems)
  }

  const orderByRating = (movies) => {
    const orderedItems = [...movies].sort((a, b) => b.rating - a.rating)
    props.setShowMovies(orderedItems)
  }

  if (props.loading) {
    return <div className=""></div>
  }
  return (
    <div className="flex my-4 mx-8 gap-4">
      <GenreSidebar
        genres={props.genres}
        movies={props.movies}
        movieGenres={props.movieGenres}
        setShowMovies={props.setShowMovies}
      />
      <Dropdown label="Order by">
        <Dropdown.Item onClick={() => orderByReleaseDate(props.showMovies)}>
          Newest
        </Dropdown.Item>
        <Dropdown.Item onClick={() => orderByRating(props.showMovies)}>
          Rating
        </Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default MovieListSettings
