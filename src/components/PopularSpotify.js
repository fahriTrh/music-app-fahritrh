import { useEffect, useState } from "react"
import CardContainer from "./CardContainer"
import Card from "./Card"

const PopularSpotify = (props) => {
    const { token } = props
    const [poplularArtists, setPopularArtists] = useState('')

    useEffect(() => {
        const topSpotifyParams = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
    
        // fetch('https://api.spotify.com/v1/artists?ids=4q3ewBCX7sLwd24euuV69X,6eUKZXaKkcviH0Ku9w2n3V,66CXWjxzNUsdJxJ2JdwvnR,6M2wZ9GZgrQXHCFfjv46we,1Cs0zKBU1kc0i8ypK3B9ai,0du5cEVh5yTK9QJze8zA0C,4MCBfE4596Uoi2O4DtmEMz,3TVXtAsR1Inumwj472S9r4,1Xyo4u8uXC1ZmMpatF05PJ,1uNFoZAHBGtllmzznpCI3s', topSpotifyParams)
        fetch('https://api.spotify.com/v1/artists?ids=6eUKZXaKkcviH0Ku9w2n3V,66CXWjxzNUsdJxJ2JdwvnR,6M2wZ9GZgrQXHCFfjv46we,1Cs0zKBU1kc0i8ypK3B9ai,0du5cEVh5yTK9QJze8zA0C,64tJ2EAv1R6UaZqc4iOCyj', topSpotifyParams)
          .then(ress => ress.json())
          .then(data => {
            if (!data.error) {
              setPopularArtists(data.artists)
            }
          })
          .catch(err => {
            throw new Error(err)
          })
    },[token])

    return (
        <div className='original-and-exclusive'>
            <h1>Popular Spotify Artists</h1>
            <CardContainer>
                {
                poplularArtists && (
                    poplularArtists.map( artist => (
                    <Card key={artist.id} to={`/artist/${artist.id}`} img={artist.images[1].url} name={artist.name} artist={artist.type} isArtist='card-image-artist'/>
                    ))
                )
                }
            </CardContainer>
        </div>
    )
}

export default PopularSpotify