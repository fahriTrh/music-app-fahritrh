import { useEffect, useState } from "react"
import CardContainer from "./CardContainer"
import Card from "./Card"

const PopularIndonesian = (props) => {
    const { token } = props
    const [indoArtists, setIndoArtists] = useState('')
    
    useEffect(() => {
        const topIndonesianArtistParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
        }

        fetch('https://api.spotify.com/v1/artists?ids=2iDVt6mFbtbDEZG5ax0dTi,0kPb52ySN2k9P6wEZPTUzm,20zafXaLhm5IcXnSU93rNn,3wOsYKZM0zcKNasi3I7fP4,02Tq76MwpeoRu3BHIAiaio,31aMmlq8isIAgojvmIwiS4,7d86ERlvO5UG44j7Va0Y0C,2kxP07DLgs4xlWz8YHlvfh,06QVnTCdjs4jPKO0487EGV,1JvbNeV9zG9Sew1JyaWsyx', topIndonesianArtistParams)
        .then(ress => ress.json())
        .then(data => {
            if (!data.error) {
            setIndoArtists(data.artists)
            }
        })
    }, [token])

    return (
        <div className='original-and-exclusive'>
            <h1>Popular Indonesian Artists</h1>
            <CardContainer>
              {
                indoArtists && (
                  indoArtists.map( artist => (
                    <Card key={artist.id} to={`artist/${artist.id}`} img={artist.images[1].url} name={artist.name} artist={artist.type} isArtist='card-image-artist'/>
                  ))
                )
              }
            </CardContainer>
        </div>
    )
}

export default PopularIndonesian