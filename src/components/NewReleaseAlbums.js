import { useEffect, useState } from "react"
import CardContainer from "./CardContainer"
import Card from "./Card"

const NewReleaseAlbums = (props) => {
    const { token } = props

    const [albums, setAlbums] = useState('')
    useEffect(() => {
        const newReleaseParams = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
    
        fetch('https://api.spotify.com/v1/browse/new-releases?country=US&limit=10', newReleaseParams)
          .then(ress => ress.json())
          .then(data => {
            if (!data.error) {
              setAlbums(data.albums.items)
            }
          })
    
    }, [token])

      return (
        <div className='recently-played'>
            <h1>New Release Album</h1>
            <CardContainer>
              {
                albums && (
                  albums.map( album => (
                    <Card key={album.id} to={`/album/${album.id}`} img={album.images[0].url} name={album.name} artist={album.artists[0].name} />
                  ))
                )
              }
            </CardContainer>
          </div>
      )


}

export default NewReleaseAlbums