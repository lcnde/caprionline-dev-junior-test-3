import { Button, Drawer, Sidebar, TextInput } from 'flowbite-react'
import { useState } from 'react'

const GenreSidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  function filterMoviesByGenre(movies, genreId, movieGenres) {
    // Reset movie filter if genreId is null
    if (genreId === null) {
      let copyMoviesState = JSON.parse(JSON.stringify(props.movies))
      props.setShowMovies(copyMoviesState)
      return
    }

    // Get all the ids of the movies with the specified genre_id
    const filteredMovieIdsByGenre = movieGenres
      .filter((obj) => obj.genre_id === genreId)
      .map((obj) => obj.movie_id)

    // Get all the movies by Id
    const filteredMovieList = movies.filter((obj) =>
      filteredMovieIdsByGenre.includes(obj.id),
    )

    props.setShowMovies(filteredMovieList)
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Genres</Button>
      </div>
      <Drawer
        className="bg-custom-gray-900"
        open={isOpen}
        onClose={handleClose}
        style={{ backgroundColor: 'transparent !important' }}>
        <Drawer.Header title="Genres" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar className="[&>div]:bg-transparent [&>div]:p-0 ">
            <div
              className="flex h-full flex-col justify-between py-2 text-gray-300 hover:bg-custom-gray-600"
              onClick={() => {
                filterMoviesByGenre(props.movies, null, props.movieGenres)
                setIsOpen(false)
              }}>
              <div className="cursor-pointer px-2">Tutti</div>
            </div>
            {props.genres.map((item, key) => {
              return (
                <div
                  className="flex h-full flex-col justify-between py-2 text-gray-300 hover:bg-custom-gray-600 cursor-pointer"
                  onClick={() => {
                    filterMoviesByGenre(
                      props.movies,
                      item.id,
                      props.movieGenres,
                    )
                    setIsOpen(false)
                  }}
                  key={key}>
                  <div className="cursor-pointer px-2">{item.name}</div>
                </div>
              )
            })}
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  )
}

export default GenreSidebar
