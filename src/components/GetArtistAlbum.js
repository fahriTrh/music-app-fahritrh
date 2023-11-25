import { useEffect, useState } from "react"
import CardContainer from "./CardContainer"
import Card from "./Card"
const GetArtistAlbum = (props) => {
    const {id, token, title} = props
    const [albums, setAlbums] = useState('')

    useEffect(() => {
        const newReleaseParams = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
    
        fetch(`https://api.spotify.com/v1/artists/${id}/albums?limit=7`, newReleaseParams)
          .then(ress => ress.json())
          .then(data => {
            if (!data.error) {
              setAlbums(data.items)
            }
          })
    
    }, [token])
    return (
        <div className='recently-played'>
            <h1>{title}</h1>
            <CardContainer>
              {
                albums && (
                    albums.map(album => (
                        <Card key={album.id} to={`/album/${album.id}`} img={album.images[0].url} name={album.name} artist={album.artists[0].name} />
                    ))
                )
              }
            </CardContainer>
          </div>
      )

}

export default GetArtistAlbum